import { TemplateModel } from '@src/templates/template.model';
import { ConvertFromModelError } from '@libs/errors/convert-from-model.error';

export class Template {
    constructor(public id: string, public userId: string, public softwareId: string, public templateText: string) {}

    static fromModel(model: TemplateModel): Template {
        if (
            typeof model.id === 'undefined' ||
            typeof model.userId === 'undefined' ||
            typeof model.softwareId === 'undefined' ||
            typeof model.templateText === 'undefined'
        ) {
            throw new ConvertFromModelError();
        }

        return new Template(model.id, model.userId, model.softwareId, model.templateText);
    }
}
