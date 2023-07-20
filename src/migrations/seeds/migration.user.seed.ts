import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ParkingLotRepository } from 'src/modules/parking-lot/repositories/parking-lot.repository';
import { faker } from '@faker-js/faker';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { AuthService } from 'src/common/auth/services/auth.service';
import {
    ENUM_USER_STATUS,
    ENUM_USER_TYPE,
} from 'src/modules/user/constants/user.enum.constant';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class MigrationUserSeed {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly parkingLotRepo: ParkingLotRepository,
        private readonly authService: AuthService
    ) {}

    @Command({ command: 'seed:user', describe: 'seed users' })
    async seeds(): Promise<void> {
        const password = 'cdef3456@A';
        const passwordHash = await this.authService.createPassword(password);
        const parkingLot = await this.parkingLotRepo.findOneByName(
            'Parking lot 01'
        );

        const users = [
            {
                id: faker.string.uuid(),
                username: 'admin',
                password: passwordHash.passwordHash,
                status: ENUM_USER_STATUS.ACTIVE,
                type: ENUM_USER_TYPE.ADMIN,
                parkingLotId: parkingLot.id,
                profile: {
                    name: 'admin name',
                    email: 'admin@gmail.com',
                    address: 'admin address',
                    phone: '+92 28372837',
                },
            },
            {
                id: faker.string.uuid(),
                username: 'parking_agent',
                password: passwordHash.passwordHash,
                status: ENUM_USER_STATUS.ACTIVE,
                type: ENUM_USER_TYPE.PARKING_AGENT,
                parkingLotId: parkingLot.id,
                profile: {
                    name: 'parking agent name',
                    email: 'parking_agent@gmail.com',
                    address: 'parking agent address',
                    phone: '+92 28372838',
                },
            },
        ];

        await Promise.all(
            users.map(
                async (user) => await this.userRepo.create(new UserEntity(user))
            )
        );
    }

    @Command({ command: 'remove:user', describe: 'remove users' })
    async remove(): Promise<void> {
        try {
            return await this.userRepo.truncate();
        } catch (err: any) {
            console.error(err);
            throw new Error(err.message);
        }
    }
}
