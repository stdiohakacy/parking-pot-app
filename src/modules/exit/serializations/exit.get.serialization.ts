import { PickType } from '@nestjs/swagger';
import { ExitSerialization } from './exit.serialization';

export class ExitGetSerialization extends PickType(ExitSerialization, [
    'id',
    'parkingLotId',
]) {}
