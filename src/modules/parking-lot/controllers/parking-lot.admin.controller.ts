import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'src/common/response/decorators/response.decorator';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ParkingLotCreateDTO } from '../dtos/parking-lot.create.dto';
import { ParkingLotCreateCommand } from '../commands/parking-lot.create.command';
import { ParkingLotAdminCreateDoc } from '../docs/parking-lot.admin.doc';

@ApiTags('modules.admin.parking-lot')
@Controller({ version: '1', path: '/parking-lot' })
export class ParkingLotAdminController {
    constructor(private readonly commandBus: CommandBus) {}
    @ParkingLotAdminCreateDoc()
    @Response('parkingLot.create')
    // @UserAdminUpdateInactiveGuard()
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.USER,
    //     action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
    // })
    // @AuthJwtAdminAccessProtected()
    // @RequestParamGuard(UserRequestDto)
    @Post('/')
    async create(
        @Body() payload: ParkingLotCreateDTO
        // @GetUser() userAuth: UserEntity
    ) {
        return await this.commandBus.execute(
            new ParkingLotCreateCommand(payload)
        );
    }
}
