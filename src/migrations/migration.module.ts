import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CommonModule } from '../common/common.module';
import { MigrationParkingLotSeed } from './seeds/migration.parking-lot.seed';
import { ParkingLotModule } from '../modules/parking-lot/parking-lot.module';
import { MigrationParkingSpotSeed } from './seeds/migration.parking-spot.seed';
import { ParkingSpotModule } from '../modules/parking-spot/parking-spot.module';
import { MigrationUserSeed } from './seeds/migration.user.seed';
import { UserModule } from '../modules/user/user.module';
import { AuthModule } from '../common/auth/auth.module';

@Module({
    imports: [
        CommandModule,
        CommonModule,
        ParkingLotModule,
        ParkingSpotModule,
        UserModule,
        AuthModule,
    ],
    providers: [
        MigrationParkingLotSeed,
        MigrationParkingSpotSeed,
        MigrationUserSeed,
    ],
    exports: [],
})
export class MigrationModule {}
