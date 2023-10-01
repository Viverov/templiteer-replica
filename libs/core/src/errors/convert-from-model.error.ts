export class ConvertFromModelError extends Error {
    constructor() {
        super(`Can't convert entity from model, not enough fields`);
    }
}
