import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
    ExitAdminCreateDoc,
    ExitAdminGetDoc,
    ExitAdminListDoc,
} from '../docs/exit.admin.doc';
import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import { ExitCreateDTO } from '../dtos/exit.create.dto';
import { ExitCreateCommand } from '../commands/exit.create.command';
import { EntranceListSerialization } from 'src/modules/entrance/serializations/parking-lot.list.serialization';
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator';
import {
    EXIT_DEFAULT_AVAILABLE_ORDER_BY,
    EXIT_DEFAULT_AVAILABLE_SEARCH,
    EXIT_DEFAULT_ORDER_BY,
    EXIT_DEFAULT_ORDER_DIRECTION,
    EXIT_DEFAULT_PER_PAGE,
} from '../constants/entrance.list.constant';
import { PaginationListDTO } from 'src/common/pagination/dtos/pagination.list.dto';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { ExitListQuery } from '../queries/exit.list.query';
import { ExitGetSerialization } from '../serializations/exit.get.serialization';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import { ExitRequestDTO } from '../dtos/exit.request.dto';
import { ExitGetQuery } from '../queries/exit.get.query';

@ApiTags('modules.admin.exit')
@Controller({ version: '1', path: '/exits' })
export class ExitAdminController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @ExitAdminCreateDoc()
    @Response('exit.create')
    @Post('/')
    async create(@Body() payload: ExitCreateDTO) {
        return await this.commandBus.execute(new ExitCreateCommand(payload));
    }

    @ExitAdminListDoc()
    @ResponsePaging('exit.list', {
        serialization: EntranceListSerialization,
    })
    @Get('/')
    async list(
        @PaginationQuery(
            EXIT_DEFAULT_PER_PAGE,
            EXIT_DEFAULT_ORDER_BY,
            EXIT_DEFAULT_ORDER_DIRECTION,
            EXIT_DEFAULT_AVAILABLE_SEARCH,
            EXIT_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDTO
    ): Promise<IResponsePaging> {
        const find = { ..._search };
        const pagination = {
            _limit,
            _offset,
            _order,
        } as PaginationListDTO;
        return await this.queryBus.execute(new ExitListQuery(find, pagination));
    }

    @ExitAdminGetDoc()
    @Response('exit.get', { serialization: ExitGetSerialization })
    @RequestParamGuard(ExitRequestDTO)
    @Get('/:id')
    async get(@Param() { id }: ExitRequestDTO): Promise<IResponse> {
        return await this.queryBus.execute(new ExitGetQuery(id));
    }
}
