import { PickType } from '@nestjs/swagger';
import { ParkingLotGetSerialization } from './parking-lot.get.serialization';

export class ParkingLotListSerialization extends PickType(
    ParkingLotGetSerialization,
    [] as const
) {}
