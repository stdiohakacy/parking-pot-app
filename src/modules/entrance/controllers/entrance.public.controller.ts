import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Response } from '../../../common/response/decorators/response.decorator';
import { EntranceAdminCreateDoc } from '../docs/entrance.admin.doc';
import { ParkingTicketCreateDTO } from 'src/modules/parking-ticket/dtos/parking-ticket.create.dto';
import { ParkingTicketCreateCommand } from 'src/modules/parking-ticket/commands/parking-ticket.create.command';

@ApiTags('modules.admin.entrance')
@Controller({ version: '1', path: '/entrances' })
export class EntrancePublicController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @EntranceAdminCreateDoc()
    @Response('entrance.createParkingTicket')
    @Post('/parking-ticket')
    async create(@Body() payload: ParkingTicketCreateDTO) {
        return await this.commandBus.execute(
            new ParkingTicketCreateCommand(payload)
        );
    }
}
