import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsEnum,
    IsNotEmpty,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';
import { BaseDTO } from '../../../common/base/dto/base.dto';
import { IsPasswordStrong } from '../../../common/request/validations/request.is-password-strong.validation';
import {
    ENUM_USER_STATUS,
    ENUM_USER_TYPE,
} from '../constants/user.enum.constant';
import { ProfileRegisterDTO } from './profile.register.dto';

export class UserDTO extends BaseDTO {
    @ApiProperty({
        example: faker.internet.userName(
            faker.name.firstName(),
            faker.name.lastName()
        ),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    @Type(() => String)
    username: string;

    @ApiProperty({
        description: 'string password',
        example: `${faker.random.alphaNumeric(5).toLowerCase()}${faker.random
            .alphaNumeric(5)
            .toUpperCase()}@@!123`,
        required: true,
    })
    @IsNotEmpty()
    @IsPasswordStrong()
    @MaxLength(50)
    password: string;

    @ApiProperty({
        description: '',
        example: ENUM_USER_STATUS.ACTIVE,
        required: true,
    })
    @IsEnum(ENUM_USER_STATUS)
    @IsString()
    @IsNotEmpty()
    status: ENUM_USER_STATUS;

    @ApiProperty({
        description: '',
        example: ENUM_USER_TYPE.ADMIN,
        required: true,
    })
    @IsEnum(ENUM_USER_TYPE)
    @IsString()
    @IsNotEmpty()
    type: ENUM_USER_TYPE;

    profile: ProfileRegisterDTO;

    @ApiProperty({
        name: 'parkingLotId',
        example: faker.string.uuid(),
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    parkingLotId: string;
}
