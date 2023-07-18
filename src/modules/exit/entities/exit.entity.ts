import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ExitDTO } from '../dtos/exit.dto';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';

export interface IExitEntity extends IBaseEntity<ExitDTO> {}
@Entity({ name: 'exits' })
@UseDTO(ExitDTO)
export class ExitEntity extends BaseEntity<ExitDTO> implements IExitEntity {
    @Column({ type: 'uuid', name: 'parkingLotId' })
    parkingLotId: string;

    @ManyToOne(() => ParkingLotEntity, (parkingLot) => parkingLot.exits)
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot?: ParkingLotEntity;
}
