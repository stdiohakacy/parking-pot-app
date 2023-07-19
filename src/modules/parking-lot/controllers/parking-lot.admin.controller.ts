import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
    Response,
    ResponsePaging,
} from '../../../common/response/decorators/response.decorator';
import { ParkingLotCreateDTO } from '../dtos/parking-lot.create.dto';
import { ParkingLotCreateCommand } from '../commands/parking-lot.create.command';
import {
    ParkingLotAdminCreateDoc,
    ParkingLotAdminGetDoc,
    ParkingLotAdminListDoc,
} from '../docs/parking-lot.admin.doc';
import { PaginationQuery } from '../../../common/pagination/decorators/pagination.decorator';
import { PaginationListDTO } from '../../../common/pagination/dtos/pagination.list.dto';
import {
    PARKING_LOT_DEFAULT_AVAILABLE_ORDER_BY,
    PARKING_LOT_DEFAULT_AVAILABLE_SEARCH,
    PARKING_LOT_DEFAULT_ORDER_BY,
    PARKING_LOT_DEFAULT_ORDER_DIRECTION,
    PARKING_LOT_DEFAULT_PER_PAGE,
} from '../constants/parking-lot.list.constant';
import {
    IResponse,
    IResponsePaging,
} from '../../../common/response/interfaces/response.interface';
import { ParkingLotListQuery } from '../queries/parking-lot.list.query';
import { ParkingLotListSerialization } from '../serializations/parking-lot.list.serialization';
import { ParkingLotGetSerialization } from '../serializations/parking-lot.get.serialization';
import { RequestParamGuard } from '../../../common/request/decorators/request.decorator';
import { ParkingLotRequestDTO } from '../dtos/parking-lot.request.dto';
import { ParkingLotGetQuery } from '../queries/parking-lot.get.query';

@ApiTags('modules.admin.parking-lot')
@Controller({ version: '1', path: '/parking-lots' })
export class ParkingLotAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @ParkingLotAdminCreateDoc()
    @Response('parkingLot.create')
    @Post('/')
    async create(@Body() payload: ParkingLotCreateDTO) {
        return await this.commandBus.execute(
            new ParkingLotCreateCommand(payload)
        );
    }

    @ParkingLotAdminListDoc()
    @ResponsePaging('parkingLot.list', {
        serialization: ParkingLotListSerialization,
    })
    @Get('/')
    async list(
        @PaginationQuery(
            PARKING_LOT_DEFAULT_PER_PAGE,
            PARKING_LOT_DEFAULT_ORDER_BY,
            PARKING_LOT_DEFAULT_ORDER_DIRECTION,
            PARKING_LOT_DEFAULT_AVAILABLE_SEARCH,
            PARKING_LOT_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDTO
    ): Promise<IResponsePaging> {
        const find = { ..._search };
        const pagination = {
            _limit,
            _offset,
            _order,
        } as PaginationListDTO;
        return await this.queryBus.execute(
            new ParkingLotListQuery(find, pagination)
        );
    }

    @ParkingLotAdminGetDoc()
    @Response('parkingLot.get', { serialization: ParkingLotGetSerialization })
    @RequestParamGuard(ParkingLotRequestDTO)
    @Get('/:id')
    async get(@Param() { id }: ParkingLotRequestDTO): Promise<IResponse> {
        return await this.queryBus.execute(new ParkingLotGetQuery(id));
    }
}
