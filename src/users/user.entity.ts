import { UserModel } from '@src/users/user.model';
import { ConvertFromModelError } from '@libs/errors/convert-from-model.error';
import { BaseObject } from '@libs/types/base-object';

export class User extends BaseObject<User> {
    id = '';
    email = '';

    static fromModel(model: UserModel): User {
        if (typeof model.id === 'undefined' || typeof model.email === 'undefined') throw new ConvertFromModelError();

        return new User({
            id: model.id,
            email: model.email,
        });
    }
}
