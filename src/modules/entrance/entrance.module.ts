import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntranceEntity } from './entities/entrance.entity';
import { EntranceCreateHandler } from './commands/entrance.create.command';
import { EntranceRepository } from './repositories/entrance.repository';
import { ParkingLotModule } from '../parking-lot/parking-lot.module';

const commandHandlers = [EntranceCreateHandler];

@Module({
    imports: [TypeOrmModule.forFeature([EntranceEntity]), ParkingLotModule],
    exports: [],
    providers: [...commandHandlers, EntranceRepository],
    controllers: [],
})
export class EntranceModule {}
