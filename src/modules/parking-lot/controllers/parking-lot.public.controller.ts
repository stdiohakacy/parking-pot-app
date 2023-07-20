import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { ParkingTicketCreateCommand } from '../../../modules/parking-ticket/commands/parking-ticket.create.command';
import { ParkingTicketCreateDTO } from '../../../modules/parking-ticket/dtos/parking-ticket.create.dto';
import { ParkingLotPublicCreateTicketDoc } from '../docs/parking-lot.public.doc';
import { Response } from '../../../common/response/decorators/response.decorator';

@ApiTags('modules.public.parking-lot')
@Controller({ version: '1', path: '/parking-lots' })
export class ParkingLotPublicController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @ParkingLotPublicCreateTicketDoc()
    @Response('parkingLot.create')
    @Post('/parking-tickets')
    async createParkingTicket(@Body() payload: ParkingTicketCreateDTO) {
        return await this.commandBus.execute(
            new ParkingTicketCreateCommand(payload)
        );
    }
}
