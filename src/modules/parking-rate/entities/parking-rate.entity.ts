import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ParkingRateDTO } from '../dtos/parking-rate.dto';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';

export interface IParkingRateEntity extends IBaseEntity<ParkingRateDTO> {
    hours: number;
    rate: number;
}

@Entity({ name: 'parking_rates' })
@UseDTO(ParkingRateDTO)
export class ParkingRateEntity
    extends BaseEntity<ParkingRateDTO>
    implements IParkingRateEntity
{
    @Column({ name: 'hours' })
    hours: number;

    @Column({ name: 'rate' })
    rate: number;

    @Column({ name: 'parkingLotId', type: 'uuid' })
    parkingLotId: string;

    @ManyToOne(() => ParkingLotEntity, (parkingLot) => parkingLot.parkingRates)
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot?: ParkingLotEntity;
}
