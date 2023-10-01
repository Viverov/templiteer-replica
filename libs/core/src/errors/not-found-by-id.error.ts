export class NotFoundByIdError extends Error {
    constructor(element: string, id: string) {
        super(`Not found ${element} with id ${id}`);
    }
}
