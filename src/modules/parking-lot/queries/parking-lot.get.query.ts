import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ParkingLotRepository } from '../repositories/parking-lot.repository';
import { instanceToPlain } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { ENUM_PARKING_LOT_STATUS_CODE_ERROR } from '../constants/parking-lot.status-code.constant';

export class ParkingLotGetQuery implements IQuery {
    constructor(public readonly id: string) {}
}

@QueryHandler(ParkingLotGetQuery)
export class ParkingLotGetHandler implements IQueryHandler<ParkingLotGetQuery> {
    constructor(private readonly parkingLotRepository: ParkingLotRepository) {}

    async execute({ id }: ParkingLotGetQuery) {
        const parkingLot = await this.parkingLotRepository.findOneById(id);
        if (!parkingLot) {
            throw new NotFoundException({
                statusCode:
                    ENUM_PARKING_LOT_STATUS_CODE_ERROR.PARKING_LOT_FOUND_ERROR,
                message: 'parkingLot.error.notFound',
            });
        }

        return instanceToPlain({ data: parkingLot });
    }
}
