import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ParkingTicketCreateDTO } from '../dtos/parking-ticket.create.dto';
import { InsertResult } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ENUM_EXIT_STATUS_CODE_ERROR } from '../../../modules/exit/constants/entrance.status-code.constant';
import { ParkingLotRepository } from '../../../modules/parking-lot/repositories/parking-lot.repository';
import { ParkingSpotRepository } from '../../../modules/parking-spot/repositories/parking-spot.repository';
import { ENUM_VEHICLE_TYPE } from '../../../modules/vehicle/constants/vehicle.enum.constant';
import { ENUM_PARKING_SPOT_TYPE } from '../../../modules/parking-spot/constants/parking-spot.enum.constant';
import { ENUM_PARKING_SPOT_STATUS_CODE_ERROR } from '../../../modules/parking-spot/constants/parking-spot.status-code.constant';
import { Car } from '../../../modules/vehicle/instances/car.vehicle';
import { MotorCycle } from '../../../modules/vehicle/instances/motor-cycle.vehicle';
import { Truck } from '../../../modules/vehicle/instances/truck.vehicle';
import { Van } from '../../../modules/vehicle/instances/van.vehicle';
import { VehicleRepository } from '../../../modules/vehicle/repositories/vehicle.repository';
import { VehicleEntity } from '../../../modules/vehicle/entities/vehicle.entity';
import { generateLicenseNo } from '../../../modules/vehicle/helpers/vehicle.helper';
import { ENUM_PARKING_LOT_STATUS_CODE_ERROR } from '../../../modules/parking-lot/constants/parking-lot.status-code.constant';
import { ParkingTicketRepository } from '../repositories/parking-ticket.repository';
import { ParkingTicketEntity } from '../entities/parking-ticket.entity';
import { HelperDateService } from '../../../common/helper/services/helper.date.service';
import { generateParkingTicketNo } from '../helpers/parking-ticket.helper';

export class ParkingTicketCreateCommand implements ICommand {
    constructor(public readonly payload: ParkingTicketCreateDTO) {}
}

@CommandHandler(ParkingTicketCreateCommand)
export class ParkingTicketCreateHandler
    implements ICommandHandler<ParkingTicketCreateCommand, InsertResult>
{
    constructor(
        private readonly parkingSpotRepo: ParkingSpotRepository,
        private readonly vehicleRepo: VehicleRepository,
        private readonly parkingLotRepo: ParkingLotRepository,
        private readonly parkingTicketRepo: ParkingTicketRepository,
        private readonly helperDateService: HelperDateService
    ) {}
    async execute({ payload }: ParkingTicketCreateCommand) {
        let { vehicleType, licenseNo, parkingLotId } = payload;
        let parkingSpotType = null;
        let vehicle: VehicleEntity = null;

        if (!licenseNo) {
            licenseNo = generateLicenseNo(10);
        }

        switch (vehicleType) {
            case ENUM_VEHICLE_TYPE.CAR:
                parkingSpotType = ENUM_PARKING_SPOT_TYPE.COMPACT;
                vehicle = new Car({ parkingLotId, licenseNo });
                break;
            case ENUM_VEHICLE_TYPE.MOTOR_CYCLE:
                parkingSpotType = ENUM_PARKING_SPOT_TYPE.MOTORCYCLE;
                vehicle = new MotorCycle({ parkingLotId, licenseNo });
                break;
            case ENUM_VEHICLE_TYPE.TRUCK:
                parkingSpotType = ENUM_PARKING_SPOT_TYPE.LARGE;
                vehicle = new Truck({ parkingLotId, licenseNo });
                break;

            case ENUM_VEHICLE_TYPE.VAN:
                parkingSpotType = ENUM_PARKING_SPOT_TYPE.HANDICAPPED;
                vehicle = new Van({ parkingLotId, licenseNo });
                break;
        }

        const parkingLot = await this.parkingLotRepo.findOneById(parkingLotId);
        if (!parkingLot) {
            throw new BadRequestException({
                statusCode:
                    ENUM_PARKING_LOT_STATUS_CODE_ERROR.PARKING_LOT_NOT_FOUND_ERROR,
                message: 'parkingLot.error.notFound',
            });
        }

        const parkingSpot = await this.parkingSpotRepo.findAll({
            where: { type: parkingSpotType, isFree: true, parkingLotId },
        });

        if (!parkingSpot) {
            throw new BadRequestException({
                statusCode:
                    ENUM_PARKING_SPOT_STATUS_CODE_ERROR.PARKING_SPOT_FREE_ERROR,
                message: 'parkingSpot.error.isFree',
            });
        }

        // await this.vehicleRepo.create(vehicle);

        const parkingTicketCreated = await this.parkingTicketRepo.create(
            new ParkingTicketEntity({
                ticketNo: generateParkingTicketNo(5),
                timestamp: this.helperDateService.create(),
                parkingLotId,
            })
        );
        console.log(parkingTicketCreated.raw[0]);

        return null;

        // const parkingSpot = await this.parkingSpotRepo.findAll({
        //     where: { isFree: true, type: vehicleType },
        // });
        // check parking spot for this vehicle is free or not

        // const { timestamp, licenseNo, parkingLotId } = payload;
        // const parkingLotExist = await this.parkingLotRepo.findOneById(
        //     parkingLotId
        // );
        // if (!parkingLotExist) {
        //     throw new NotFoundException({
        //         statusCode: ENUM_EXIT_STATUS_CODE_ERROR.EXIT_NOT_FOUND_ERROR,
        //         message: 'parkingLot.error.notFound',
        //     });
        // }
        // return await this.exitRepo.create(payload);
    }
}
