import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehicleRepository } from './repositories/vehicle.repository';

const commandHandlers = [];
const queryHandlers = [];

@Module({
    imports: [TypeOrmModule.forFeature([VehicleEntity])],
    exports: [VehicleRepository],
    providers: [...commandHandlers, ...queryHandlers, VehicleRepository],
    controllers: [],
})
export class VehicleModule {}
