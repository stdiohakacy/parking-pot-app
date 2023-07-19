import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ExitCreateDTO } from '../dtos/exit.create.dto';
import { InsertResult } from 'typeorm';
import { ExitRepository } from '../repositories/exit.repository';
import { ENUM_EXIT_STATUS_CODE_ERROR } from '../constants/entrance.status-code.constant';
import { ParkingLotRepository } from 'src/modules/parking-lot/repositories/parking-lot.repository';
import { NotFoundException } from '@nestjs/common';

export class ExitCreateCommand implements ICommand {
    constructor(public readonly payload: ExitCreateDTO) {}
}

@CommandHandler(ExitCreateCommand)
export class ExitCreateHandler
    implements ICommandHandler<ExitCreateCommand, InsertResult>
{
    constructor(
        private readonly exitRepo: ExitRepository,
        private readonly parkingLotRepository: ParkingLotRepository
    ) {}
    async execute({ payload }: ExitCreateCommand) {
        const { parkingLotId } = payload;
        const parkingLotExist = await this.parkingLotRepository.findOneById(
            parkingLotId
        );
        if (!parkingLotExist) {
            throw new NotFoundException({
                statusCode: ENUM_EXIT_STATUS_CODE_ERROR.EXIT_NOT_FOUND_ERROR,
                message: 'parkingLot.error.notFound',
            });
        }
        return await this.exitRepo.create(payload);
    }
}
