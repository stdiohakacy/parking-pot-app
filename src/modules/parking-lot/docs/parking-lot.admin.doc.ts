import { applyDecorators } from '@nestjs/common';
import {
    Doc,
    DocAuth,
    DocGuard,
    DocRequest,
    DocResponse,
    DocResponsePaging,
} from '../../../common/doc/decorators/doc.decorator';
import { ParkingLotListSerialization } from '../serializations/parking-lot.list.serialization';
import { ParkingLotGetSerialization } from '../serializations/parking-lot.get.serialization';
import { ParkingLotDocParamsId } from '../constants/parking-lot.doc.constant';

export function ParkingLotAdminCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.admin.parking-lot' }),
        DocAuth({ jwtAccessToken: true }),
        DocGuard({ role: true, policy: true }),
        DocResponse('parkingLot.create')
    );
}

export function ParkingLotAdminListDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.admin.parking-lot' }),
        DocRequest({ queries: [] }),
        DocAuth({ jwtAccessToken: true }),
        DocGuard({ role: true, policy: true }),
        DocResponsePaging<ParkingLotListSerialization>('parking-lot.list', {
            serialization: ParkingLotListSerialization,
        })
    );
}

export function ParkingLotAdminGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.admin.parking-lot' }),
        DocRequest({ params: ParkingLotDocParamsId }),
        DocAuth({ jwtAccessToken: true }),
        DocGuard({ role: true, policy: true }),
        DocResponse<ParkingLotGetSerialization>('parking-lot.get', {
            serialization: ParkingLotGetSerialization,
        })
    );
}
