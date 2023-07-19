import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '../../../common/base/dto/base.dto';
import { faker } from '@faker-js/faker';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class ExitDTO extends BaseDTO {
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
