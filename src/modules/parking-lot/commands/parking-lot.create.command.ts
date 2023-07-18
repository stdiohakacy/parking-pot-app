import { InsertResult } from 'typeorm';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException } from '@nestjs/common';
import { ParkingLotCreateDTO } from '../dtos/parking-lot.create.dto';
import { ParkingLotRepository } from '../repositories/parking-lot.repository';
import { ENUM_PARKING_LOT_STATUS_CODE_ERROR } from '../constants/parking-lot.status-code.constant';

export class ParkingLotCreateCommand implements ICommand {
    constructor(public readonly payload: ParkingLotCreateDTO) {}
}

@CommandHandler(ParkingLotCreateCommand)
export class ParkingLotCreateHandler
    implements ICommandHandler<ParkingLotCreateCommand, InsertResult>
{
    constructor(private readonly parkingLotRepo: ParkingLotRepository) {}
    async execute({ payload }: ParkingLotCreateCommand) {
        const nameExist = await this.parkingLotRepo.findOneByName(payload.name);
        if (nameExist) {
            throw new ConflictException({
                statusCode:
                    ENUM_PARKING_LOT_STATUS_CODE_ERROR.PARKING_LOT_NAME_EXIST_ERROR,
                message: 'parkingLot.error.nameExist',
            });
        }
        return await this.parkingLotRepo.create(payload);
    }
}
