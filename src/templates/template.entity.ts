import { BaseObject } from '@libs/types/base-object';
import { TemplateModel } from '@src/templates/template.model';
import { ConvertFromModelError } from '@libs/errors/convert-from-model.error';

export class Template extends BaseObject<Template> {
    id = '0';
    userId = '0';
    softwareId = '0';
    templateText = '';

    static fromModel(model: TemplateModel): Template {
        if (
            typeof model.id === 'undefined' ||
            typeof model.userId === 'undefined' ||
            typeof model.softwareId === 'undefined' ||
            typeof model.templateText === 'undefined'
        ) {
            throw new ConvertFromModelError();
        }

        return new Template({
            id: model.id,
            userId: model.userId,
            softwareId: model.softwareId,
            templateText: model.templateText,
        });
    }
}
