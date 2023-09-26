import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { apiErrorResponseFactory } from '@libs/swagger/errors/api-error-response.factory';

export const ApiInternalServerErrorResponseCustom = apiErrorResponseFactory(
    ApiInternalServerErrorResponse,
    (message, description) => ({
        'Internal error': {
            value: {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                description,
                message: message || new InternalServerErrorException().message,
            },
        },
    }),
);
