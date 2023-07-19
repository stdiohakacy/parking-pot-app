import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../../../common/doc/constants/doc.enum.constant';
import {
    Doc,
    DocAuth,
    DocGuard,
    DocRequest,
    DocResponse,
    DocResponsePaging,
} from '../../../common/doc/decorators/doc.decorator';
import { InsertResult } from 'typeorm';
import { EntranceListSerialization } from '../serializations/parking-lot.list.serialization';
import { EntranceGetSerialization } from '../serializations/entrance.get.serialization';
import { EntranceDocParamsId } from '../constants/entrance.doc.constant';

export function EntranceAdminCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.admin.entrance' }),
        DocAuth({ jwtAccessToken: true }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocGuard({ role: true, policy: true }),
        DocResponse<InsertResult>('entrance.create', {
            httpStatus: HttpStatus.CREATED,
            serialization: InsertResult,
        })
    );
}

export function EntranceAdminListDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.admin.entrance' }),
        DocRequest({ queries: [] }),
        DocAuth({ jwtAccessToken: true }),
        DocGuard({ role: true, policy: true }),
        DocResponsePaging<EntranceListSerialization>('entrance.list', {
            serialization: EntranceListSerialization,
        })
    );
}

export function EntranceAdminGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.admin.entrance' }),
        DocRequest({ params: EntranceDocParamsId }),
        DocAuth({ jwtAccessToken: true }),
        DocGuard({ role: true, policy: true }),
        DocResponse<EntranceGetSerialization>('entrance.get', {
            serialization: EntranceGetSerialization,
        })
    );
}
