import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ENUM_VEHICLE_TYPE } from 'src/modules/vehicle/constants/vehicle.enum.constant';

export class ParkingTicketCreateDTO {
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

    @ApiProperty({
        name: 'parkingLotId',
        description: 'id of parking lot',
        example: faker.string.uuid(),
        required: false,
        nullable: true,
    })
    @IsUUID()
    @Type(() => String)
    parkingLotId: string;

    @ApiProperty({
        name: 'vehicleType',
        description: 'type of vehicle',
        example: ENUM_VEHICLE_TYPE.CAR,
    })
    @IsEnum(ENUM_VEHICLE_TYPE)
    @IsString()
    @IsNotEmpty()
    vehicleType: ENUM_VEHICLE_TYPE;
}
