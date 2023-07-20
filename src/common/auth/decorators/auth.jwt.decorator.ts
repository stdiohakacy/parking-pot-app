import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthJwtAccessGuard } from '../../../common/auth/guards/jwt-access/auth.jwt-access.guard';
import { AuthJwtRefreshGuard } from '../../../common/auth/guards/jwt-refresh/auth.jwt-refresh.guard';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';
import { ROLE_TYPE_META_KEY } from '../../../modules/role/constants/role.constant';
import { ENUM_ROLE_TYPE } from '../../../modules/role/constants/role.enum.constant';
import { UserPayloadSerialization } from '../../../modules/user/serializations/user.payload.serialization';

export const AuthJwtPayload = createParamDecorator(
    (data: string, ctx: ExecutionContext): Record<string, any> => {
        const { user } = ctx
            .switchToHttp()
            .getRequest<IRequestApp & { user: UserPayloadSerialization }>();
        return data ? user[data] : user;
    }
);

export const AuthJwtToken = createParamDecorator(
    (data: string, ctx: ExecutionContext): string => {
        const { headers } = ctx.switchToHttp().getRequest<IRequestApp>();
        const { authorization } = headers;
        const authorizations: string[] = authorization.split(' ');

        return authorizations.length >= 2 ? authorizations[1] : undefined;
    }
);

export function AuthJwtAccessProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthJwtAccessGuard));
}

export function AuthJwtUserAccessProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(AuthJwtAccessGuard),
        // RolePayloadTypeGuard
        SetMetadata(ROLE_TYPE_META_KEY, [ENUM_ROLE_TYPE.USER])
    );
}

export function AuthJwtAdminAccessProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(AuthJwtAccessGuard),
        // RolePayloadTypeGuard
        SetMetadata(ROLE_TYPE_META_KEY, [
            ENUM_ROLE_TYPE.SUPER_ADMIN,
            ENUM_ROLE_TYPE.ADMIN,
        ])
    );
}

export function AuthJwtRefreshProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthJwtRefreshGuard));
}
