import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
    path: './.env',
});

export const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: false,
    entities: ['src/**/*.model{.ts,.js}', 'libs/**/*.model{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}', 'libs/**/migrations/*{.ts,.js}'],
});
