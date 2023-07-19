import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { instanceToPlain } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { EntranceRepository } from '../repositories/entrance.repository';
import { ENUM_ENTRANCE_STATUS_CODE_ERROR } from '../constants/entrance.status-code.constant';

export class EntranceGetQuery implements IQuery {
    constructor(public readonly id: string) {}
}

@QueryHandler(EntranceGetQuery)
export class EntranceGetHandler implements IQueryHandler<EntranceGetQuery> {
    constructor(private readonly entranceRepository: EntranceRepository) {}

    async execute({ id }: EntranceGetQuery) {
        const entrance = await this.entranceRepository.findOneById(id);
        if (!entrance) {
            throw new NotFoundException({
                statusCode:
                    ENUM_ENTRANCE_STATUS_CODE_ERROR.ENTRANCE_NOT_FOUND_ERROR,
                message: 'entrance.error.notFound',
            });
        }

        return instanceToPlain({ data: entrance });
    }
}
