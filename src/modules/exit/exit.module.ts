import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotModule } from '../parking-lot/parking-lot.module';
import { ExitEntity } from './entities/exit.entity';
import { ExitCreateHandler } from './commands/exit.create.command';
import { ExitListHandler } from './queries/exit.list.query';
import { ExitGetHandler } from './queries/exit.get.query';
import { ExitRepository } from './repositories/exit.repository';

const commandHandlers = [ExitCreateHandler];
const queryHandlers = [ExitListHandler, ExitGetHandler];

@Module({
    imports: [TypeOrmModule.forFeature([ExitEntity]), ParkingLotModule],
    exports: [],
    providers: [...commandHandlers, ...queryHandlers, ExitRepository],
    controllers: [],
})
export class ExitModule {}
