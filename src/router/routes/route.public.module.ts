import { UserModule } from '../../modules/user/user.module';
import { UserPublicController } from '../../modules/user/controllers/user.public.controller';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ParkingLotPublicController } from 'src/modules/parking-lot/controllers/parking-lot.public.controller';
import { ParkingLotModule } from 'src/modules/parking-lot/parking-lot.module';

@Module({
    controllers: [UserPublicController, ParkingLotPublicController],
    providers: [],
    exports: [],
    imports: [UserModule, CqrsModule, ParkingLotModule],
})
export class RoutesPublicModule {}
