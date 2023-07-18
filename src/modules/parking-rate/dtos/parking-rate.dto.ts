import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BaseDTO } from '../../../common/base/dto/base.dto';

export class ParkingRateDTO extends BaseDTO {
    @ApiProperty({
        name: 'hours',
        required: true,
        nullable: false,
        example: 8,
    })
    @IsNumber()
    @IsNotEmpty()
    hours: number;

    @ApiProperty({
        name: 'rate',
        required: true,
        nullable: false,
        example: 8,
    })
    @IsNumber()
    @IsNotEmpty()
    rate: number;
}
