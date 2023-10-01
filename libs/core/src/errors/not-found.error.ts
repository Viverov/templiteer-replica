export class NotFoundError extends Error {
    constructor(element: string, fields: { [key: string]: string }) {
        let message = `Not found ${element}`;
        if (Object.keys(fields).length > 0) {
            message += 'with ';
            message += Object.keys(fields)
                .map((f) => `${f}: ${fields[f]}`)
                .join(' and ');
        }
        super(message);
    }
}
