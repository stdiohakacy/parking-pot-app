import { Module } from '@nestjs/common';
import { ParkingLotAdminController } from '../../modules/parking-lot/controllers/parking-lot.admin.controller';
import { ParkingLotModule } from '../../modules/parking-lot/parking-lot.module';
import { EntranceModule } from 'src/modules/entrance/entrance.module';
import { EntranceAdminController } from 'src/modules/entrance/controllers/entrance.admin.controller';
import { ExitAdminController } from 'src/modules/exit/controllers/entrance.admin.controller';
import { ExitModule } from 'src/modules/exit/exit.module';

@Module({
    controllers: [
        ParkingLotAdminController,
        EntranceAdminController,
        ExitAdminController,
    ],
    providers: [],
    exports: [],
    imports: [ParkingLotModule, EntranceModule, ExitModule],
})
export class RoutesAdminModule {}
