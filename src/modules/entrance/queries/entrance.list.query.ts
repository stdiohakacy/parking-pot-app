import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationListDTO } from '../../../common/pagination/dtos/pagination.list.dto';
import { PaginationService } from '../../../common/pagination/services/pagination.service';
import { EntranceRepository } from '../repositories/entrance.repository';

export class EntranceListQuery implements IQuery {
    constructor(
        public readonly find: Record<string, any>,
        public readonly pagination: PaginationListDTO
    ) {}
}

@QueryHandler(EntranceListQuery)
export class EntranceListHandler implements IQueryHandler<EntranceListQuery> {
    constructor(
        private readonly entranceRepository: EntranceRepository,
        private readonly paginationService: PaginationService
    ) {}

    async execute({ find, pagination }: EntranceListQuery) {
        const { _limit } = pagination;
        const [entrances, total] =
            await this.entranceRepository.findAllAndCount(find, pagination, {
                select: ['id'],
            });

        const totalPage = this.paginationService.totalPage(total, _limit);

        return {
            _pagination: { total, totalPage },
            data: entrances,
        };
    }
}
