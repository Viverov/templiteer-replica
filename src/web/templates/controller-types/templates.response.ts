import { TemplateResponse } from '@src/web/templates/controller-types/template.response';
import { Template } from '@src/templates/template.entity';

export class TemplatesResponse {
    templates: TemplateResponse[] = [];

    static fromTemplates(templates: Template[]): TemplatesResponse {
        return {
            templates: templates.map((t) => TemplateResponse.fromTemplate(t)),
        };
    }
}
