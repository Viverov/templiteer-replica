import { Controller, ControllerOptions } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiInternalServerErrorResponseCustom } from '@libs/swagger/errors/api-internal-server-error-response-custom';

class ExtendedControllerOptions {
    additionsTags?: string[];
    suppressInvalidServerErrorNotation?: boolean;
}

export const ExtendedController = (
    options: ControllerOptions & ExtendedControllerOptions,
): ((...params: any) => void) => {
    const handlers: ClassDecorator[] = [];
    // eslint-disable-next-line ban/ban
    handlers.push(Controller(options));

    const tags = [];
    if (options.version) tags.push(`Version: ${String(options.version)}`);
    if (options.path) tags.push(`Basepath: ${options.path}`);
    if (Array.isArray(options.additionsTags)) tags.push(...options.additionsTags);
    if (tags.length > 0) handlers.push(ApiTags(...tags));

    if (!options.suppressInvalidServerErrorNotation) {
        handlers.push(ApiInternalServerErrorResponseCustom());
    }

    return (...params: any): any => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handlers.forEach((h): any => h(...params));
    };
};
