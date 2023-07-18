import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntranceDTO } from '../dtos/entrance.dto';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';

export interface IEntranceEntity extends IBaseEntity<EntranceDTO> {}
@Entity({ name: 'entrances' })
@UseDTO(EntranceDTO)
export class EntranceEntity
    extends BaseEntity<EntranceDTO>
    implements IEntranceEntity
{
    @Column({ type: 'uuid', name: 'parkingLotId' })
    parkingLotId: string;

    @ManyToOne(() => ParkingLotEntity, (parkingLot) => parkingLot.entrances)
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot?: ParkingLotEntity;
}
