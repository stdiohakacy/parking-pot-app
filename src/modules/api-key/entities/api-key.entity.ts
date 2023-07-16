import { ENUM_API_KEY_TYPE } from 'src/common/api-key/constants/api-key.enum.constant';
import { ApiKeyDTO } from 'src/common/api-key/dtos/api-key.dto';
import { UseDTO } from 'src/common/base/decorators/use-dto.decorator';
import { BaseEntity, IBaseEntity } from 'src/common/base/entity/base.entity';
import { Column, Entity } from 'typeorm';

export interface IApiKeyEntity extends IBaseEntity<ApiKeyDTO> {
    type: ENUM_API_KEY_TYPE;
    name: string;
    key: string;
    hash: string;
    isActive: boolean;
    startDate?: Date;
    endDate?: Date;
}
@Entity({ name: 'api_keys' })
@UseDTO(ApiKeyDTO)
export class ApiKeyEntity
    extends BaseEntity<ApiKeyDTO>
    implements IApiKeyEntity
{
    @Column({
        name: 'type',
        enum: ENUM_API_KEY_TYPE,
        default: ENUM_API_KEY_TYPE.PUBLIC,
    })
    type: ENUM_API_KEY_TYPE;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'key', unique: true })
    key: string;

    @Column({ name: 'hash' })
    hash: string;

    @Column({ name: 'isActive', default: true })
    isActive: boolean;

    @Column({ name: 'startDate', type: 'timestamptz', nullable: true })
    startDate?: Date;

    @Column({ name: 'endDate', type: 'timestamptz', nullable: true })
    endDate?: Date;
}
