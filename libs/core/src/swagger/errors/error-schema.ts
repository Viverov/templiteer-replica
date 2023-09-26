import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const errorSchema: SchemaObject = {
    type: 'object',
    required: ['statusCode', 'message'],
    properties: {
        statusCode: {
            type: 'number',
        },
        message: {
            type: 'string',
        },
    },
};
