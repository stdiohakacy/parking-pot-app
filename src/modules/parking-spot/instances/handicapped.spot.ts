import { ENUM_PARKING_SPOT_TYPE } from '../constants/parking-spot.enum.constant';
import { ParkingSpotEntity } from '../entities/parking-spot.entity';

export class HandicappedSpot extends ParkingSpotEntity {
    getIsFree(): boolean {
        return this.isFree;
    }

    getType(): ENUM_PARKING_SPOT_TYPE {
        return ENUM_PARKING_SPOT_TYPE.HANDICAPPED;
    }
}
