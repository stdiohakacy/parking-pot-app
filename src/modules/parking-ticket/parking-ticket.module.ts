import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingTicketCreateHandler } from './commands/parking-ticket.create.command';
import { ParkingTicketRepository } from './repositories/parking-ticket.repository';
import { ParkingTicketEntity } from './entities/parking-ticket.entity';
import { ParkingSpotModule } from '../parking-spot/parking-spot.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { ParkingLotModule } from '../parking-lot/parking-lot.module';

const commandHandlers = [ParkingTicketCreateHandler];
const queryHandlers = [];

@Module({
    imports: [
        TypeOrmModule.forFeature([ParkingTicketEntity]),
        ParkingSpotModule,
        VehicleModule,
        forwardRef(() => ParkingLotModule),
    ],
    exports: [...commandHandlers],
    providers: [...commandHandlers, ...queryHandlers, ParkingTicketRepository],
    controllers: [],
})
export class ParkingTicketModule {}
