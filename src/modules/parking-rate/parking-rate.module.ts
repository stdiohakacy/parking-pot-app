import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingRateEntity } from './entities/parking-rate.entity';
import { ParkingRateRepository } from './repositories/parking-rate.repository';

const commandHandlers = [];

@Module({
    imports: [TypeOrmModule.forFeature([ParkingRateEntity])],
    exports: [ParkingRateRepository],
    providers: [...commandHandlers, ParkingRateRepository],
    controllers: [],
})
export class ParkingRateModule {}
