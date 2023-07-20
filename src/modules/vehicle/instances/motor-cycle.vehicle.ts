import { ENUM_VEHICLE_TYPE } from '../constants/vehicle.enum.constant';
import { VehicleEntity } from '../entities/vehicle.entity';

export class MotorCycle extends VehicleEntity {
    constructor({ parkingLotId, licenseNo }) {
        super({ parkingLotId, licenseNo });
        this.type = ENUM_VEHICLE_TYPE.MOTOR_CYCLE;
    }
}
