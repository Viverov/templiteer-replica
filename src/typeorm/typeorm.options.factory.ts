import { PostgresConfig } from './postgres.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormOptionsFactory: (postgresConfig: PostgresConfig) => TypeOrmModuleOptions = (config) => ({
    type: 'postgres',
    url: config.url,
    entities: [__dirname + '/../**/*.entity{.ts,.js}', __dirname + '/../../libs/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}', __dirname + '/../../libs/**/migrations/*{.ts,.js}'],
    migrationsRun: false,
    synchronize: false,
});
