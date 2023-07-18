import { InsertResult } from 'typeorm';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { UserRepository } from '../repositories/user.repository';
import { ConflictException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { AuthService } from '../../../common/auth/services/auth.service';
import { ENUM_USER_TYPE } from '../constants/user.enum.constant';
import { Admin } from '../instances/admin';
import { ParkingAgent } from '../instances/parking-agent';

export class UserRegisterCommand implements ICommand {
    constructor(public readonly payload: UserRegisterDTO) {}
}

@CommandHandler(UserRegisterCommand)
export class UserRegisterHandler
    implements ICommandHandler<UserRegisterCommand, InsertResult>
{
    constructor(
        private readonly userRepo: UserRepository,
        private readonly authService: AuthService
    ) {}
    async execute({ payload }: UserRegisterCommand) {
        const usernameExist = await this.userRepo.findOneByUsername(
            payload.username
        );

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
        let user = null;
        if (payload.type === ENUM_USER_TYPE.ADMIN) {
            user = new Admin();
        } else if (payload.type === ENUM_USER_TYPE.PARKING_AGENT) {
            user = new ParkingAgent();
        }
        user.register(payload);
        return await this.userRepo.create(user);
    }
}
