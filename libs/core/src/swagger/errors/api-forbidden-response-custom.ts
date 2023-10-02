import { ApiForbiddenResponse } from '@nestjs/swagger';
import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { apiErrorResponseFactory } from '@libs/swagger/errors/api-error-response.factory';

export const ApiForbiddenResponseCustom = apiErrorResponseFactory(ApiForbiddenResponse, (message, description) => ({
    Forbidden: {
        value: {
            statusCode: HttpStatus.FORBIDDEN,
            description,
            message: message || new ForbiddenException().message,
        },
    },
}));
