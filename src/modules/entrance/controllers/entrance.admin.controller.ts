import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
    Response,
    ResponsePaging,
} from '../../../common/response/decorators/response.decorator';
import { EntranceCreateCommand } from '../commands/entrance.create.command';
import { EntranceCreateDTO } from '../dtos/entrance.create.dto';
import {
    EntranceAdminCreateDoc,
    EntranceAdminGetDoc,
    EntranceAdminListDoc,
} from '../docs/entrance.admin.doc';
import { EntranceListSerialization } from '../serializations/parking-lot.list.serialization';
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDTO } from 'src/common/pagination/dtos/pagination.list.dto';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import {
    ENTRANCE_DEFAULT_AVAILABLE_ORDER_BY,
    ENTRANCE_DEFAULT_AVAILABLE_SEARCH,
    ENTRANCE_DEFAULT_ORDER_BY,
    ENTRANCE_DEFAULT_ORDER_DIRECTION,
    ENTRANCE_DEFAULT_PER_PAGE,
} from '../constants/entrance.list.constant';
import { EntranceListQuery } from '../queries/entrance.list.query';
import { EntranceGetSerialization } from '../serializations/entrance.get.serialization';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import { EntranceRequestDTO } from '../dtos/entrance.request.dto';
import { EntranceGetQuery } from '../queries/entrance.get.query';

@ApiTags('modules.admin.entrance')
@Controller({ version: '1', path: '/entrances' })
export class EntranceAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @EntranceAdminCreateDoc()
    @Response('entrance.create')
    @Post('/')
    async create(@Body() payload: EntranceCreateDTO) {
        return await this.commandBus.execute(
            new EntranceCreateCommand(payload)
        );
    }

    @EntranceAdminListDoc()
    @ResponsePaging('Entrance.list', {
        serialization: EntranceListSerialization,
    })
    @Get('/')
    async list(
        @PaginationQuery(
            ENTRANCE_DEFAULT_PER_PAGE,
            ENTRANCE_DEFAULT_ORDER_BY,
            ENTRANCE_DEFAULT_ORDER_DIRECTION,
            ENTRANCE_DEFAULT_AVAILABLE_SEARCH,
            ENTRANCE_DEFAULT_AVAILABLE_ORDER_BY
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
            new EntranceListQuery(find, pagination)
        );
    }

    @EntranceAdminGetDoc()
    @Response('entrance.get', { serialization: EntranceGetSerialization })
    @RequestParamGuard(EntranceRequestDTO)
    @Get('/:id')
    async get(@Param() { id }: EntranceRequestDTO): Promise<IResponse> {
        return await this.queryBus.execute(new EntranceGetQuery(id));
    }
}
