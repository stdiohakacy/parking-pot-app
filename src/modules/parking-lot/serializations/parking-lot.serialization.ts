import { faker } from '@faker-js/faker';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ResponseIdSerialization } from '../../../common/response/serializations/response.id.serialization';

export class ParkingLotSerialization extends ResponseIdSerialization {
    @ApiProperty({
        required: true,
        nullable: false,
        example: 'Parking lot 01',
    })
    readonly name: string;

    @ApiProperty({
        required: true,
        nullable: false,
        example: '01 Nguyen Hue',
    })
    readonly address: string;

    @ApiProperty({
        description: 'Date created at',
        example: faker.date.recent(),
        required: true,
        nullable: false,
    })
    readonly createdAt: Date;

    @ApiProperty({
        description: 'Date updated at',
        example: faker.date.recent(),
        required: true,
        nullable: false,
    })
    readonly updatedAt: Date;

    @ApiHideProperty()
    @Exclude()
    readonly deletedAt?: Date;

    @ApiHideProperty()
    @Exclude()
    readonly createdBy: string;

    @ApiHideProperty()
    @Exclude()
    readonly updatedBy: string;

    @ApiHideProperty()
    @Exclude()
    readonly deletedBy: string;
}
