import { IsNotEmpty, validate, ValidateNested } from 'class-validator';
import { ConfigValidationError } from '@src/config/config-validation.error';
import { PostgresConfig } from '@libs/typeorm/postgres.config';
import { JwtConfig } from '@src/auth/jwt.config';
import { LoggerConfig, LoggerLevels } from '@libs/log/logger.config';

export class Config {
    @IsNotEmpty()
    env?: string;
    @IsNotEmpty()
    isDevelopment?: boolean;
    @IsNotEmpty()
    isTest?: boolean;
    @IsNotEmpty()
    port?: number;
    @ValidateNested()
    postgres?: PostgresConfig;
    @ValidateNested()
    jwt?: JwtConfig;
    @ValidateNested()
    logger?: LoggerConfig;
}

export enum Subconfigs {
    Postgres = 'postgres',
    Jwt = 'jwt',
    Logger = 'logger',
}

export const configuration = async (): Promise<Config> => {
    const config: Config = new Config();

    config.env = process.env.NODE_ENV;
    config.isDevelopment = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development';
    config.isTest = process.env.NODE_ENV === 'test';

    config.port = parseConfigInt(process.env.SERVER_PORT);

    config[Subconfigs.Postgres] = new PostgresConfig({
        url: process.env.DATABASE_URL,
    });

    config[Subconfigs.Jwt] = new JwtConfig({
        secret: process.env.JWT_SECRET,
        expireIn: process.env.JWT_EXPIRE_IN,
    });

    config[Subconfigs.Logger] = new LoggerConfig({
        level: <LoggerLevels>(<unknown>process.env.LOG_LEVEL),
    });

    const errors = await validate(config, {
        dismissDefaultMessages: false,
        skipMissingProperties: false,
        skipNullProperties: false,
        skipUndefinedProperties: false,
        validationError: {
            target: false,
            value: false,
        },
    });

    if (errors.length > 0) throw new ConfigValidationError(errors);
    return config;
};

const parseConfigInt = (val?: string): number | undefined => (typeof val === 'undefined' ? val : parseInt(val));
