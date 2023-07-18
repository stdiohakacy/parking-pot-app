import { Module } from '@nestjs/common';
import { ParkingLotAdminController } from '../../modules/parking-lot/controllers/parking-lot.admin.controller';
import { ParkingLotModule } from '../../modules/parking-lot/parking-lot.module';

@Module({
    controllers: [ParkingLotAdminController],
    providers: [],
    exports: [],
    imports: [ParkingLotModule],
})
export class RoutesAdminModule {}
