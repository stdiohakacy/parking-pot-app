import { applyDecorators } from '@nestjs/common';
import {
    Doc,
    DocAuth,
    DocGuard,
    DocRequest,
    DocResponse,
    DocResponsePaging,
} from 'src/common/doc/decorators/doc.decorator';
import { ParkingLotListSerialization } from '../serializations/parking-lot.list.serialization';

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
