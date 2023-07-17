import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { Column, Entity } from 'typeorm';
import { ParkingSpotDTO } from '../dtos/parking-spot.dto';

export interface IParkingSpotEntity extends IBaseEntity<ParkingSpotDTO> {
    isFree: boolean;
}

@Entity({ name: 'parking_spots' })
@UseDTO(ParkingSpotDTO)
export class ParkingSpotEntity
    extends BaseEntity<ParkingSpotDTO>
    implements IParkingSpotEntity
{
    @Column({ name: 'isFree', default: true })
    isFree: boolean;
}
