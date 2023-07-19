import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Response } from '../../../common/response/decorators/response.decorator';
import { EntranceCreateCommand } from '../commands/entrance.create.command';
import { EntranceCreateDTO } from '../dtos/entrance.create.dto';
import { EntranceAdminCreateDoc } from '../docs/entrance.admin.doc';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import { EntranceRequestDTO } from '../dtos/entrance.request.dto';

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

    // @EntranceAdminListDoc()
    // @ResponsePaging('Entrance.list', {
    //     serialization: EntranceListSerialization,
    // })
    // @Get('/')
    // async list(
    //     @PaginationQuery(
    //         PARKING_LOT_DEFAULT_PER_PAGE,
    //         PARKING_LOT_DEFAULT_ORDER_BY,
    //         PARKING_LOT_DEFAULT_ORDER_DIRECTION,
    //         PARKING_LOT_DEFAULT_AVAILABLE_SEARCH,
    //         PARKING_LOT_DEFAULT_AVAILABLE_ORDER_BY
    //     )
    //     { _search, _limit, _offset, _order }: PaginationListDTO
    // ): Promise<IResponsePaging> {
    //     const find = { ..._search };
    //     const pagination = {
    //         _limit,
    //         _offset,
    //         _order,
    //     } as PaginationListDTO;
    //     return await this.queryBus.execute(
    //         new EntranceListQuery(find, pagination)
    //     );
    // }

    // @EntranceAdminGetDoc()
    // @Response('Entrance.get', { serialization: EntranceGetSerialization })
    // @RequestParamGuard(EntranceRequestDTO)
    // @Get('/:id')
    // async get(@Param() { id }: EntranceRequestDTO): Promise<IResponse> {
    //     return await this.queryBus.execute(new EntranceGetQuery(id));
    // }
}
