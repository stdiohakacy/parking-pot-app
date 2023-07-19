import { Module } from '@nestjs/common';
import { ParkingLotAdminController } from '../../modules/parking-lot/controllers/parking-lot.admin.controller';
import { ParkingLotModule } from '../../modules/parking-lot/parking-lot.module';
import { EntranceModule } from 'src/modules/entrance/entrance.module';
import { EntranceAdminController } from 'src/modules/entrance/controllers/entrance.admin.controller';

@Module({
    controllers: [ParkingLotAdminController, EntranceAdminController],
    providers: [],
    exports: [],
    imports: [ParkingLotModule, EntranceModule],
})
export class RoutesAdminModule {}
