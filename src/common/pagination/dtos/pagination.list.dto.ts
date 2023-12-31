import { ApiHideProperty } from '@nestjs/swagger';
import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from '../../../common/pagination/constants/pagination.enum.constant';
import { IPaginationOrder } from '../../../common/pagination/interfaces/pagination.interface';

export class PaginationListDTO {
    @ApiHideProperty()
    _search: Record<string, any>;

    @ApiHideProperty()
    _limit: number;

    @ApiHideProperty()
    _offset: number;

    @ApiHideProperty()
    _order: IPaginationOrder;

    @ApiHideProperty()
    _availableOrderBy: string[];

    @ApiHideProperty()
    _availableOrderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE[];
}
