import { ENUM_USER_TYPE } from '../constants/user.enum.constant';
import { UserEntity } from '../entities/user.entity';

export class Admin extends UserEntity {
    constructor({ username, password, type, status, profile, parkingLotId }) {
        super({ username, password, type, status, profile, parkingLotId });
        this.type = ENUM_USER_TYPE.ADMIN;
    }
}
