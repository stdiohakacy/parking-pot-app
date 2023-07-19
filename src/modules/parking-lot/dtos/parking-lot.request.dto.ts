import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ParkingLotRequestDTO {
    @IsNotEmpty()
    @IsUUID('4')
    @Type(() => String)
    id: string;
}
