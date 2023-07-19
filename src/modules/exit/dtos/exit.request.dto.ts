import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ExitRequestDTO {
    @IsNotEmpty()
    @IsUUID('4')
    @Type(() => String)
    id: string;
}
