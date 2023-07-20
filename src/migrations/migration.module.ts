import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CommonModule } from '../common/common.module';
import { MigrationParkingLotSeed } from './seeds/migration.parking-lot.seed';
import { ParkingLotModule } from '../modules/parking-lot/parking-lot.module';
import { MigrationParkingSpotSeed } from './seeds/migration.parking-spot.seed';
import { ParkingSpotModule } from 'src/modules/parking-spot/parking-spot.module';

@Module({
    imports: [CommandModule, CommonModule, ParkingLotModule, ParkingSpotModule],
    providers: [MigrationParkingLotSeed, MigrationParkingSpotSeed],
    exports: [],
})
export class MigrationModule {}
