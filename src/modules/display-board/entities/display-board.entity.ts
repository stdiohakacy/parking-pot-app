import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { DisplayBoardDTO } from '../dtos/display-board.dto';
import { HandicappedSpot } from '../../../modules/parking-spot/instances/handicapped.spot';
import { CompactSpot } from '../../../modules/parking-spot/instances/compact.spot';
import { LargeSpot } from '../../../modules/parking-spot/instances/large.spot';
import { MotorCycleSpot } from '../../../modules/parking-spot/instances/motor-cycle.spot';
import { Column, Entity } from 'typeorm';
import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';

export interface IDisplayBoardEntity extends IBaseEntity<DisplayBoardDTO> {
    handicappedSpot: HandicappedSpot[];
    compactSpot: CompactSpot[];
    largeSpot: LargeSpot[];
    motorcycleSpot: MotorCycleSpot[];
}

@Entity({ name: 'display_boards' })
@UseDTO(DisplayBoardDTO)
export class DisplayBoardEntity
    extends BaseEntity<DisplayBoardDTO>
    implements IDisplayBoardEntity
{
    @Column({ name: 'handicappedSpot', type: 'jsonb' })
    handicappedSpot: HandicappedSpot[];

    @Column({ name: 'compactSpot', type: 'jsonb' })
    compactSpot: CompactSpot[];

    @Column({ name: 'largeSpot', type: 'jsonb' })
    largeSpot: LargeSpot[];

    @Column({ name: 'motorcycleSpot', type: 'jsonb' })
    motorcycleSpot: MotorCycleSpot[];
}
