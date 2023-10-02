import { SetMetadata } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { RoleTypes } from '@src/auth/role-types';
import { ApiForbiddenResponseCustom } from '@libs/swagger/errors/api-forbidden-response-custom';

export const Roles = (roles: RoleTypes[]): ((...params: any) => void) => {
    const handlers: any[] = [];
    handlers.push(SetMetadata('roles', roles));
    handlers.push(ApiForbiddenResponseCustom());
    if (roles.includes(RoleTypes.User)) {
        handlers.push(ApiCookieAuth(RoleTypes.User));
        handlers.push(ApiTags(`Access: ${RoleTypes.User}`));
    }

    if (roles.length === 0) {
        handlers.push(ApiTags(`Access: without restrictions`, `Access: ${RoleTypes.User}`));
    }

    return (...params: any) => {
        handlers.forEach((h) => h(...params));
    };
};
