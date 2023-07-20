import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRegisterHandler } from './commands/user.register.command';
import { UserRepository } from './repositories/user.repository';
import { AuthModule } from '../../common/auth/auth.module';
import { ParkingLotModule } from '../parking-lot/parking-lot.module';
import { UserLoginHandler } from './commands/user.login.command';

const commandHandlers = [UserRegisterHandler, UserLoginHandler];
const queryHandlers = [];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule,
        ParkingLotModule,
    ],
    exports: [],
    providers: [...commandHandlers, UserRepository],
    controllers: [],
})
export class UserModule {}
