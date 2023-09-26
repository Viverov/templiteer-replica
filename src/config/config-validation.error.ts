import { ValidationError } from 'class-validator';

export class ConfigValidationError extends Error {
    constructor(errors: ValidationError[]) {
        super();
        this.name = 'ConfigValidationError';
        this.message = `Config validation failed, reason: ${ConfigValidationError.processErrors(errors)}`;
    }

    private static processErrors(errors: ValidationError[]): string {
        return errors.map((err) => JSON.stringify(err.toString().replace(/\n/gi, '').trim())).join(',');
    }
}
