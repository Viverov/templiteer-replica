export class BaseObject<T> {
    constructor(data: { [P in keyof T]: T[P] }) {
        Object.assign(this, data);
    }
}
