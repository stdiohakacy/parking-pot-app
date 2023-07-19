import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { InsertResult } from 'typeorm';
import { EntranceCreateDTO } from '../dtos/entrance.create.dto';
import { EntranceRepository } from '../repositories/entrance.repository';
import { ParkingLotRepository } from 'src/modules/parking-lot/repositories/parking-lot.repository';
import { NotFoundException } from '@nestjs/common';
import { ENUM_PARKING_LOT_STATUS_CODE_ERROR } from 'src/modules/parking-lot/constants/parking-lot.status-code.constant';

export class EntranceCreateCommand implements ICommand {
    constructor(public readonly payload: EntranceCreateDTO) {}
}

@CommandHandler(EntranceCreateCommand)
export class EntranceCreateHandler
    implements ICommandHandler<EntranceCreateCommand, InsertResult>
{
    constructor(
        private readonly entranceRepo: EntranceRepository,
        private readonly parkingLotRepository: ParkingLotRepository
    ) {}
    async execute({ payload }: EntranceCreateCommand) {
        const { parkingLotId } = payload;
        const parkingLotExist = await this.parkingLotRepository.findOneById(
            parkingLotId
        );
        if (!parkingLotExist) {
            throw new NotFoundException({
                statusCode:
                    ENUM_PARKING_LOT_STATUS_CODE_ERROR.PARKING_LOT_FOUND_ERROR,
                message: 'parkingLot.error.notFound',
            });
        }
        return await this.entranceRepo.create(payload);
    }
}
