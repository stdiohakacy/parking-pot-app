import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID,
} from 'class-validator';
import { BaseDTO } from '../../../common/base/dto/base.dto';
import { faker } from '@faker-js/faker';

export class ParkingTicketDTO extends BaseDTO {
    @ApiProperty({
        example: '0001',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    ticketNo: string;

    @ApiProperty({ name: 'timestamps', example: '2020-02-24T07:01:31.229Z' })
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    timestamp: Date;

    @ApiProperty({ name: 'timestamps', example: '2020-02-24T07:01:31.229Z' })
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    exit: Date;

    @ApiProperty({ name: 'amount', example: 3 })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({
        name: 'parkingLotId',
        example: faker.string.uuid(),
        required: true,
        description: 'id of parking lot',
    })
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    parkingLotId: string;
}
