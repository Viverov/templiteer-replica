import { IsEnum, IsNotEmpty } from 'class-validator';

export enum LoggerLevels {
    log = 'log',
    error = 'error',
    warn = 'warn',
    debug = 'debug',
    verbose = 'verbose',
}

export class LoggerConfig {
    @IsNotEmpty()
    @IsEnum(LoggerLevels)
    level?: LoggerLevels;

    constructor(data: { level?: LoggerLevels }) {
        this.level = data.level;
    }
}
