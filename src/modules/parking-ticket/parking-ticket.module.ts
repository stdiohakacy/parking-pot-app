import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingTicketCreateHandler } from './commands/parking-ticket.create.command';
import { ParkingTicketRepository } from './repositories/parking-ticket.repository';
import { ParkingTicketEntity } from './entities/parking-ticket.entity';

const commandHandlers = [ParkingTicketCreateHandler];
const queryHandlers = [];

@Module({
    imports: [TypeOrmModule.forFeature([ParkingTicketEntity])],
    exports: [],
    providers: [...commandHandlers, ...queryHandlers, ParkingTicketRepository],
    controllers: [],
})
export class ParkingTicketModule {}
