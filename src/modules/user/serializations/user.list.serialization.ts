import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.s3.serialization';
import { UserProfileSerialization } from 'src/modules/user/serializations/user.profile.serialization';

export class UserListSerialization extends OmitType(UserProfileSerialization, [
    'photo',
    'signUpDate',
    'signUpFrom',
] as const) {
    @ApiHideProperty()
    @Exclude()
    readonly photo?: AwsS3Serialization;

    @ApiHideProperty()
    @Exclude()
    readonly signUpDate: Date;
}
