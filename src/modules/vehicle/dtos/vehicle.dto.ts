import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from '../../../common/base/dto/base.dto';
import { Type } from 'class-transformer';
import { ENUM_VEHICLE_TYPE } from '../constants/vehicle.enum.constant';

export class VehicleDTO extends BaseDTO {
    @ApiProperty({
        name: 'licenseNo',
        required: true,
        nullable: false,
        example: '29-Z1 158.99',
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    licenseNo: string;

    @IsEnum(ENUM_VEHICLE_TYPE)
    @IsString()
    @IsNotEmpty()
    type: ENUM_VEHICLE_TYPE;
}
