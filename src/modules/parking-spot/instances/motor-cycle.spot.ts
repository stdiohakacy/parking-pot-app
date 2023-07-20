import { ENUM_PARKING_SPOT_TYPE } from '../constants/parking-spot.enum.constant';
import { ParkingSpotEntity } from '../entities/parking-spot.entity';

export class MotorCycleSpot extends ParkingSpotEntity {
    constructor({ parkingLotId, isFree, id }) {
        super({ parkingLotId, isFree, id });
        this.type = ENUM_PARKING_SPOT_TYPE.MOTORCYCLE;
    }
}
