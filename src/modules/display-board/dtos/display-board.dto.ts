import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../../../common/base/dto/base.dto';
import { Type } from 'class-transformer';
import { CompactSpot } from '../../../modules/parking-spot/instances/compact.spot';
import { LargeSpot } from '../../../modules/parking-spot/instances/large.spot';
import { MotorCycleSpot } from '../../../modules/parking-spot/instances/motor-cycle.spot';
import { HandicappedSpot } from '../../../modules/parking-spot/instances/handicapped.spot';

export class DisplayBoardDTO extends BaseDTO {
    @ApiProperty({
        name: 'handicappedSpot',
        required: true,
        nullable: false,
        example: '',
    })
    @IsNotEmpty()
    @Type(() => HandicappedSpot)
    handicappedSpot: HandicappedSpot[];

    @ApiProperty({
        name: 'compactSpot',
        required: true,
        nullable: false,
        example: '',
    })
    @IsNotEmpty()
    @Type(() => CompactSpot)
    compactSpot: CompactSpot[];

    @ApiProperty({
        name: 'largeSpot',
        required: true,
        nullable: false,
        example: '',
    })
    @IsNotEmpty()
    @Type(() => LargeSpot)
    largeSpot: LargeSpot[];

    @ApiProperty({
        name: 'handicappedSpot',
        required: true,
        nullable: false,
        example: '',
    })
    @IsNotEmpty()
    @Type(() => MotorCycleSpot)
    motorcycleSpot: MotorCycleSpot[];
}
