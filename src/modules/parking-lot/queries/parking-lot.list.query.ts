import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationListDTO } from 'src/common/pagination/dtos/pagination.list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { ParkingLotRepository } from '../repositories/parking-lot.repository';

export class ParkingLotListQuery implements IQuery {
    constructor(
        public readonly find: Record<string, any>,
        public readonly pagination: PaginationListDTO
    ) {}
}

@QueryHandler(ParkingLotListQuery)
export class ParkingLotListHandler
    implements IQueryHandler<ParkingLotListQuery>
{
    constructor(
        private readonly parkingLotRepository: ParkingLotRepository,
        private readonly paginationService: PaginationService
    ) {}

    async execute({ find, pagination }: ParkingLotListQuery) {
        const { _limit } = pagination;
        const [parkingLots, total] =
            await this.parkingLotRepository.findAllAndCount(find, pagination, {
                select: ['id', 'name', 'address'],
            });

        const totalPage = this.paginationService.totalPage(total, _limit);

        return {
            _pagination: { total, totalPage },
            data: parkingLots,
        };
    }
}
