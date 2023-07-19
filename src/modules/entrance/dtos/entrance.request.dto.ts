import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class EntranceRequestDTO {
    @IsNotEmpty()
    @IsUUID('4')
    @Type(() => String)
    id: string;
}
