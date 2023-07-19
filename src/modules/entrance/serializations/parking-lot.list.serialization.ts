import { PickType } from '@nestjs/swagger';
import { EntranceGetSerialization } from './entrance.get.serialization';

export class EntranceListSerialization extends PickType(
    EntranceGetSerialization,
    ['id', 'parkingLotId']
) {}
