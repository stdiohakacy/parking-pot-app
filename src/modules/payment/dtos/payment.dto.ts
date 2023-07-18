import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDTO } from '../../../common/base/dto/base.dto';
import {
    ENUM_PAYMENT_STATUS,
    ENUM_PAYMENT_TYPE,
} from '../constants/payment.enum.constant';

export class PaymentDTO extends BaseDTO {
    @ApiProperty({ name: 'amount', example: 1000 })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ name: 'status', example: ENUM_PAYMENT_STATUS.PENDING })
    @IsEnum(ENUM_PAYMENT_STATUS)
    @IsString()
    @IsNotEmpty()
    status: ENUM_PAYMENT_STATUS;

    @ApiProperty({ name: 'type', example: ENUM_PAYMENT_TYPE.CASH })
    @IsEnum(ENUM_PAYMENT_TYPE)
    @IsString()
    @IsNotEmpty()
    type: ENUM_PAYMENT_TYPE;
}
