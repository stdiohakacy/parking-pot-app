import { PickType } from '@nestjs/swagger';
import { ExitGetSerialization } from './exit.get.serialization';

export class ExitListSerialization extends PickType(ExitGetSerialization, [
    'id',
    'parkingLotId',
]) {}
