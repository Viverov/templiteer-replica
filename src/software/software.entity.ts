import { SoftwareModel } from '@src/software/software.model';
import { ConvertFromModelError } from '@libs/errors/convert-from-model.error';

export class Software {
    constructor(public id: string, public officialName: string) {}

    static fromModel(model: SoftwareModel): Software {
        if (typeof model.id === 'undefined' || typeof model.officialName === 'undefined') {
            throw new ConvertFromModelError();
        }
        return new Software(model.id, model.officialName);
    }
}
