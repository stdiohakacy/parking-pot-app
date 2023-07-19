import { PickType } from '@nestjs/swagger';
import { EntranceSerialization } from './entrance.serialization';

export class EntranceGetSerialization extends PickType(EntranceSerialization, [
    'id',
    'parkingLotId',
]) {}
