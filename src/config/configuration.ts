import { IsNotEmpty, validate, ValidateNested } from 'class-validator';
import { ConfigModule, ConfigModuleOptions, ConfigService } from '@nestjs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigValidationError } from '@src/config/config-validation.error';
import { PostgresConfig } from '@src/typeorm/postgres.config';

export class Config {
    @IsNotEmpty()
    env?: string;
    @IsNotEmpty()
    isDevelopment?: boolean;
    @IsNotEmpty()
    isTest?: boolean;
    @ValidateNested()
    postgres?: PostgresConfig;
}

export enum Subconfigs {
    Postgres = 'postgres',
}

export const configuration = async (): Promise<Config> => {
    const config: Config = new Config();

    config.env = process.env.NODE_ENV;
    config.isDevelopment = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development';
    config.isTest = process.env.NODE_ENV === 'test';

    config[Subconfigs.Postgres] = new PostgresConfig({
        url: process.env.DATABASE_URL,
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

@Module({})
export class ExtendedConfigModule extends ConfigModule {
    static forRoot(options: ConfigModuleOptions): DynamicModule {
        let module = ConfigModule.forRoot(options);

        module = addSubconfig({
            module,
            providerClass: PostgresConfig,
            subconfigName: Subconfigs.Postgres,
        });

        return module;
    }
}

type AddSubconfigArgs<T> = {
    module: DynamicModule;
    providerClass: { new (...any: any[]): T };
    subconfigName: string;
};
const addSubconfig = <T>({ module, providerClass, subconfigName }: AddSubconfigArgs<T>): DynamicModule => ({
    ...module,
    providers: [
        ...(module.providers || []),
        {
            provide: providerClass,
            useFactory: (configService: ConfigService) => configService.get<T>(subconfigName),
            inject: [ConfigService],
        },
    ],
    exports: [...(module.exports || []), providerClass],
});
