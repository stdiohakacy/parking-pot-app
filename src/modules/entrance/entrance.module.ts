import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntranceEntity } from './entities/entrance.entity';
import { EntranceCreateHandler } from './commands/entrance.create.command';
import { EntranceRepository } from './repositories/entrance.repository';
import { ParkingLotModule } from '../parking-lot/parking-lot.module';
import { EntranceListHandler } from './queries/entrance.list.query';

const commandHandlers = [EntranceCreateHandler];
const queryHandlers = [EntranceListHandler];

@Module({
    imports: [TypeOrmModule.forFeature([EntranceEntity]), ParkingLotModule],
    exports: [],
    providers: [...commandHandlers, ...queryHandlers, EntranceRepository],
    controllers: [],
})
export class EntranceModule {}
