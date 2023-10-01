import { BaseObject } from '@libs/types/base-object';
import { SoftwareModel } from '@src/software/software.model';
import { ConvertFromModelError } from '@libs/errors/convert-from-model.error';

export class Software extends BaseObject<Software> {
    id = '0';
    officialName = '';

    static fromModel(model: SoftwareModel): Software {
        if (typeof model.id === 'undefined' || typeof model.officialName === 'undefined') {
            throw new ConvertFromModelError();
        }
        return new Software({
            id: model.id,
            officialName: model.officialName,
        });
    }
}
