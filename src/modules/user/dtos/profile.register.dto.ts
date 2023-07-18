import { PickType } from '@nestjs/swagger';
import { ProfileDTO } from './profile.dto';

export class ProfileRegisterDTO extends PickType(ProfileDTO, [
    'name',
    'email',
    'address',
    'phone',
]) {}
