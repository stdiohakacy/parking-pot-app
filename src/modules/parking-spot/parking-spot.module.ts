import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpotRepository } from './repositories/parking-spot.repository';
import { ParkingSpotEntity } from './entities/parking-spot.entity';

const commandHandlers = [];
const queryHandlers = [];

@Module({
    imports: [TypeOrmModule.forFeature([ParkingSpotEntity])],
    exports: [ParkingSpotRepository],
    providers: [...commandHandlers, ...queryHandlers, ParkingSpotRepository],
    controllers: [],
})
export class ParkingSpotModule {}
