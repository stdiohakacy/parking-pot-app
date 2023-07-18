import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from '../../../common/base/dto/base.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ParkingLotDTO extends BaseDTO {
    @ApiProperty({
        name: 'name',
        required: true,
        nullable: false,
        example: 'Parking lot 01',
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    name: string;

    @ApiProperty({
        name: 'address',
        required: true,
        nullable: false,
        example: '01 Nam Ky Khoi Nghia',
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    address: string;
}
