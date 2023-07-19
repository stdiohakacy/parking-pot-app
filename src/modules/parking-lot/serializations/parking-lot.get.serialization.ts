import { PickType } from '@nestjs/swagger';
import { ParkingLotSerialization } from './parking-lot.serialization';

export class ParkingLotGetSerialization extends PickType(
    ParkingLotSerialization,
    ['id', 'name', 'address']
) {}
