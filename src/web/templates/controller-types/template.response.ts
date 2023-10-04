import { Template } from '@src/templates/template.entity';

export class TemplateResponse {
    id: string;
    user_id: string;
    software_id: string;
    template_text: string;

    constructor(id: string, userId: string, softwareId: string, templateText: string) {
        this.id = id;
        this.user_id = userId;
        this.software_id = softwareId;
        this.template_text = templateText;
    }

    static fromTemplate(template: Template): TemplateResponse {
        return new TemplateResponse(template.id, template.userId, template.softwareId, template.templateText);
    }
}
