import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotEntity } from './entities/parking-lot.entity';
import { ParkingLotRepository } from './repositories/parking-lot.repository';
import { ParkingLotCreateHandler } from './commands/parking-lot.create.command';
import { CqrsModule } from '@nestjs/cqrs';
import { ParkingLotListHandler } from './queries/parking-lot.list.query';
import { ParkingLotGetHandler } from './queries/parking-lot.get.query';
import { ParkingTicketModule } from '../parking-ticket/parking-ticket.module';

const commandHandlers = [ParkingLotCreateHandler];
const queryHandlers = [ParkingLotListHandler, ParkingLotGetHandler];

@Module({
    imports: [
        forwardRef(() => ParkingTicketModule),
        TypeOrmModule.forFeature([ParkingLotEntity]),
        CqrsModule,
    ],
    exports: [CqrsModule, ParkingLotRepository],
    providers: [...commandHandlers, ...queryHandlers, ParkingLotRepository],
    controllers: [],
})
export class ParkingLotModule {}
