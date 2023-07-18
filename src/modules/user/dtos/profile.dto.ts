import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
    ValidateIf,
} from 'class-validator';
import { BaseDTO } from '../../../common/base/dto/base.dto';
import { MobileNumberAllowed } from '../../../common/request/validations/request.mobile-number-allowed.validation';

export class ProfileDTO extends BaseDTO {
    @ApiProperty({ example: faker.name.fullName(), required: true })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    @Type(() => String)
    name: string;

    @ApiProperty({
        example:
            faker.address.streetAddress() +
            ', ' +
            faker.address.city() +
            ', ' +
            faker.address.state() +
            ', ' +
            faker.address.country() +
            ', ' +
            faker.address.zipCode(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    address: string;

    @ApiProperty({ example: faker.internet.email(), required: true })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    email: string;

    @ApiProperty({
        example: faker.phone.number('62812#########'),
        required: true,
    })
    @IsString()
    @MinLength(10)
    @MaxLength(14)
    @IsNotEmpty()
    @ValidateIf((e) => e.mobileNumber !== '')
    @Type(() => String)
    @MobileNumberAllowed()
    phone: string;
}
