import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../../../common/base/dto/base.dto';

export class ParkingSpotDTO extends BaseDTO {
    @ApiProperty({ name: 'isFree', required: true, nullable: false })
    @IsBoolean()
    @IsNotEmpty()
    isFree: boolean;
}
