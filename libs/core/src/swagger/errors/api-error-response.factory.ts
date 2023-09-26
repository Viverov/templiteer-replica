import { errorSchema } from '@libs/swagger/errors/error-schema';
import { ExamplesObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ApiResponseOptions } from '@nestjs/swagger';

type ErrorDecoratorFactory = (args?: {
    examples?: ExamplesObject;
    message?: string;
    description?: string;
}) => MethodDecorator & ClassDecorator;

export const apiErrorResponseFactory =
    (
        errorDecorator: (options: ApiResponseOptions) => MethodDecorator & ClassDecorator,
        exampleFactory: (message?: string, description?: string) => ExamplesObject,
    ): ErrorDecoratorFactory =>
    ({ examples, message, description } = {}) =>
        errorDecorator({
            content: {
                'application/json': {
                    schema: errorSchema,
                    examples: examples || exampleFactory(message, description),
                },
            },
        });
