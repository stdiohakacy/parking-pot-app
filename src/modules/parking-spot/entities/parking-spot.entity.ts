import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ParkingSpotDTO } from '../dtos/parking-spot.dto';
import { ENUM_PARKING_SPOT_TYPE } from '../constants/parking-spot.enum.constant';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';
import { VehicleEntity } from '../../../modules/vehicle/entities/vehicle.entity';

export interface IParkingSpotEntity extends IBaseEntity<ParkingSpotDTO> {
    isFree: boolean;
}

@Entity({ name: 'parking_spots' })
@UseDTO(ParkingSpotDTO)
export abstract class ParkingSpotEntity
    extends BaseEntity<ParkingSpotDTO>
    implements IParkingSpotEntity
{
    constructor(data: any) {
        super();
        this.id = data?.id;
        this.parkingLotId = data?.parkingLotId;
        this.isFree = data?.isFree;
    }

    @Column({ name: 'isFree', default: true })
    isFree: boolean;

    @Column({ name: 'type', enum: ENUM_PARKING_SPOT_TYPE })
    type: ENUM_PARKING_SPOT_TYPE;

    @Column({ name: 'parkingLotId', type: 'uuid' })
    parkingLotId: string;

    @ManyToOne(() => ParkingLotEntity, (parkingLot) => parkingLot.parkingSpots)
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot?: ParkingLotEntity;

    @OneToMany(() => VehicleEntity, (vehicles) => vehicles.parkingSpot)
    vehicles: VehicleEntity[];
}
