import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserDTO } from '../dtos/user.dto';
import {
    ENUM_USER_STATUS,
    ENUM_USER_TYPE,
} from '../constants/user.enum.constant';
import { ProfileDTO } from '../dtos/profile.dto';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';

export interface IUserEntity extends IBaseEntity<UserDTO> {
    username: string;
    password: string;
    status: ENUM_USER_STATUS;
    profile: ProfileDTO;
}
@Entity({ name: 'users' })
@UseDTO(UserDTO)
export class UserEntity extends BaseEntity<UserDTO> implements IUserEntity {
    @Column({ name: 'username' })
    username: string;

    @Column({ name: 'password' })
    password: string;

    @Column({
        name: 'status',
        enum: ENUM_USER_STATUS,
        default: ENUM_USER_STATUS.ACTIVE,
    })
    status: ENUM_USER_STATUS;

    @Column({
        name: 'type',
        enum: ENUM_USER_TYPE,
        default: ENUM_USER_TYPE.ADMIN,
    })
    type: ENUM_USER_TYPE;

    @Column({ name: 'profile', type: 'jsonb' })
    profile: ProfileDTO;

    @Column({ name: 'parkingLotId', type: 'uuid' })
    parkingLotId: string;

    @ManyToOne(() => ParkingLotEntity, (parkingLot) => parkingLot.users)
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot?: ParkingLotEntity;
}
