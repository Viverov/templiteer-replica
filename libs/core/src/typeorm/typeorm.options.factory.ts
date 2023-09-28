import { PostgresConfig } from 'libs/core/src/typeorm/postgres.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

type PathsConfig = {
    entities: string[];
    migrations: string[];
};

export const typeormOptionsFactory: (postgresConfig: PostgresConfig, paths: PathsConfig) => TypeOrmModuleOptions = (
    config,
    paths,
) => ({
    type: 'postgres',
    url: config.url,
    entities: paths.entities,
    migrations: paths.migrations,
    migrationsRun: false,
    synchronize: false,
});
