import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationListDTO } from '../../../common/pagination/dtos/pagination.list.dto';
import { PaginationService } from '../../../common/pagination/services/pagination.service';
import { ExitRepository } from '../repositories/exit.repository';

export class ExitListQuery implements IQuery {
    constructor(
        public readonly find: Record<string, any>,
        public readonly pagination: PaginationListDTO
    ) {}
}

@QueryHandler(ExitListQuery)
export class ExitListHandler implements IQueryHandler<ExitListQuery> {
    constructor(
        private readonly exitRepository: ExitRepository,
        private readonly paginationService: PaginationService
    ) {}

    async execute({ find, pagination }: ExitListQuery) {
        const { _limit } = pagination;
        const [exits, total] = await this.exitRepository.findAllAndCount(
            find,
            pagination,
            { select: ['id'] }
        );

        const totalPage = this.paginationService.totalPage(total, _limit);

        return {
            _pagination: { total, totalPage },
            data: exits,
        };
    }
}
