import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotEntity } from './entities/parking-lot.entity';
import { ParkingLotRepository } from './repositories/parking-lot.repository';
import { ParkingLotCreateHandler } from './commands/parking-lot.create.command';
import { CqrsModule } from '@nestjs/cqrs';

const commandHandlers = [ParkingLotCreateHandler];
const queryHandlers = [];

@Module({
    imports: [TypeOrmModule.forFeature([ParkingLotEntity]), CqrsModule],
    exports: [CqrsModule],
    providers: [...commandHandlers, ParkingLotRepository],
    controllers: [],
})
export class ParkingLotModule {}
