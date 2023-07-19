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
import { ExitListSerialization } from '../serializations/exit.list.serialization';
import { ExitDocParamsId } from '../constants/entrance.doc.constant';
import { ExitGetSerialization } from '../serializations/exit.get.serialization';

export function ExitAdminCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.admin.exit' }),
        DocAuth({ jwtAccessToken: true }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocGuard({ role: true, policy: true }),
        DocResponse<InsertResult>('exit.create', {
            httpStatus: HttpStatus.CREATED,
            serialization: InsertResult,
        })
    );
}

export function ExitAdminListDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.admin.exit' }),
        DocRequest({ queries: [] }),
        DocAuth({ jwtAccessToken: true }),
        DocGuard({ role: true, policy: true }),
        DocResponsePaging<ExitListSerialization>('exit.list', {
            serialization: ExitListSerialization,
        })
    );
}

export function ExitAdminGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.admin.exit' }),
        DocRequest({ params: ExitDocParamsId }),
        DocAuth({ jwtAccessToken: true }),
        DocGuard({ role: true, policy: true }),
        DocResponse<ExitGetSerialization>('exit.get', {
            serialization: ExitGetSerialization,
        })
    );
}
