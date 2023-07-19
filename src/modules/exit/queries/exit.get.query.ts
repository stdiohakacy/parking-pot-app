import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { instanceToPlain } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { ExitRepository } from '../repositories/exit.repository';
import { ENUM_EXIT_STATUS_CODE_ERROR } from '../constants/entrance.status-code.constant';

export class ExitGetQuery implements IQuery {
    constructor(public readonly id: string) {}
}

@QueryHandler(ExitGetQuery)
export class ExitGetHandler implements IQueryHandler<ExitGetQuery> {
    constructor(private readonly exitRepository: ExitRepository) {}

    async execute({ id }: ExitGetQuery) {
        const exit = await this.exitRepository.findOneById(id);
        if (!exit) {
            throw new NotFoundException({
                statusCode: ENUM_EXIT_STATUS_CODE_ERROR.EXIT_NOT_FOUND_ERROR,
                message: 'exit.error.notFound',
            });
        }

        return instanceToPlain({ data: exit });
    }
}
