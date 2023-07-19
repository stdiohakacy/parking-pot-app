import { InsertResult } from 'typeorm';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { UserRepository } from '../repositories/user.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { AuthService } from '../../../common/auth/services/auth.service';
import { ENUM_USER_TYPE } from '../constants/user.enum.constant';
import { Admin } from '../instances/admin';
import { ParkingAgent } from '../instances/parking-agent';
import { ParkingLotRepository } from '../../../modules/parking-lot/repositories/parking-lot.repository';
import { ENUM_PARKING_LOT_STATUS_CODE_ERROR } from '../../../modules/parking-lot/constants/parking-lot.status-code.constant';
import { UserEntity } from '../entities/user.entity';

export class UserRegisterCommand implements ICommand {
    constructor(public readonly payload: UserRegisterDTO) {}
}

@CommandHandler(UserRegisterCommand)
export class UserRegisterHandler
    implements ICommandHandler<UserRegisterCommand, InsertResult>
{
    constructor(
        private readonly userRepo: UserRepository,
        private readonly parkingLotRepository: ParkingLotRepository,
        private readonly authService: AuthService
    ) {}
    async execute({ payload }: UserRegisterCommand) {
        const usernameExist = await this.userRepo.findOneByUsername(
            payload.username
        );

        const parkingLotExist = await this.parkingLotRepository.findOneById(
            payload.parkingLotId
        );

        if (!parkingLotExist) {
            throw new NotFoundException({
                statusCode:
                    ENUM_PARKING_LOT_STATUS_CODE_ERROR.PARKING_LOT_NOT_FOUND_ERROR,
                message: 'parkingLot.error.notFound',
            });
        }

        if (usernameExist) {
            throw new ConflictException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_USERNAME_EXISTS_ERROR,
                message: 'user.error.usernameExist',
            });
        }
        const passwordAuth = await this.authService.createPassword(
            payload.password
        );
        payload.password = passwordAuth.passwordHash;
        let user: UserEntity = null;
        if (payload.type === ENUM_USER_TYPE.ADMIN) {
            user = new Admin();
        } else if (payload.type === ENUM_USER_TYPE.PARKING_AGENT) {
            user = new ParkingAgent();
        }
        user.register(payload);
        return await this.userRepo.create(user);
    }
}
