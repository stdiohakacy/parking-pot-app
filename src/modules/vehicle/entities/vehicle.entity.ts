import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { VehicleDTO } from '../dtos/vehicle.dto';
import { ENUM_VEHICLE_TYPE } from '../constants/vehicle.enum.constant';
import { ParkingSpotEntity } from '../../../modules/parking-spot/entities/parking-spot.entity';

export interface IVehicleEntity extends IBaseEntity<VehicleDTO> {
    licenseNo: string;
}

@Entity({ name: 'vehicles' })
@UseDTO(VehicleDTO)
export abstract class VehicleEntity
    extends BaseEntity<VehicleDTO>
    implements IVehicleEntity
{
    @Column({ name: 'licenseNo' })
    licenseNo: string;

    @Column({ name: 'type', enum: ENUM_VEHICLE_TYPE })
    type: ENUM_VEHICLE_TYPE;

    @Column({ name: 'parkingSpotId', type: 'uuid' })
    parkingSpotId: string;

    @ManyToOne(() => ParkingSpotEntity, (parkingSpot) => parkingSpot.vehicles)
    @JoinColumn({ name: 'parkingSpotId' })
    parkingSpot?: ParkingSpotEntity;
}
