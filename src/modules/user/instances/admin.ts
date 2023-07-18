import { ENUM_USER_TYPE } from '../constants/user.enum.constant';
import { UserEntity } from '../entities/user.entity';

export class Admin extends UserEntity {
    constructor() {
        super();
        this.type = ENUM_USER_TYPE.ADMIN;
    }
}
