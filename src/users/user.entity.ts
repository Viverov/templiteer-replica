import { UserModel } from '@src/users/user.model';
import { ConvertFromModelError } from '@libs/errors/convert-from-model.error';

export class User {
    id: string;
    email: string;

    constructor(id: string, email: string) {
        this.id = id;
        this.email = email;
    }

    static fromModel(model: UserModel): User {
        if (typeof model.id === 'undefined' || typeof model.email === 'undefined') throw new ConvertFromModelError();

        return new User(model.id, model.email);
    }
}
