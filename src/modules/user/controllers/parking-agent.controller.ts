import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('modules.parking-agent')
@Controller({ version: '1', path: '/parking-agents' })
export class ParkingAgentController {
    constructor(private readonly commandBus: CommandBus) {}

    // @UserPublicRegisterDoc()
    // @Response('user.register')
    @Post('/process-ticket')
    async processTicket(@Body() payload: ProcessTicketDTO) {
        return await this.commandBus.execute(new ProcessTicketCommand(payload));
    }
}
