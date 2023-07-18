import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from '../../../common/base/dto/base.dto';
import { ENUM_PARKING_SPOT_TYPE } from '../constants/parking-spot.enum.constant';

export class ParkingSpotDTO extends BaseDTO {
    @ApiProperty({ name: 'isFree', required: true, nullable: false })
    @IsBoolean()
    @IsNotEmpty()
    isFree: boolean;

    @IsEnum(ENUM_PARKING_SPOT_TYPE)
    @IsString()
    @IsNotEmpty()
    type: ENUM_PARKING_SPOT_TYPE;
}
