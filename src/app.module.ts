import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConfig } from '@src/../libs/core/src/typeorm/postgres.config';
import { typeormOptionsFactory } from '@src/../libs/core/src/typeorm/typeorm.options.factory';
import { configuration, Subconfigs } from '@src/config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync(<TypeOrmModuleAsyncOptions>{
            useFactory: (config: ConfigService) => {
                const postgresConfig = config.get<PostgresConfig>(Subconfigs.Postgres);
                if (!postgresConfig) throw new Error('Postgres subconfig not defined');
                return typeormOptionsFactory(postgresConfig, {
                    entities: [__dirname + '/../**/*.entity{.ts,.js}', __dirname + '/../../libs/**/*.entity{.ts,.js}'],
                    migrations: [
                        __dirname + '/../migrations/*{.ts,.js}',
                        __dirname + '/../../libs/**/migrations/*{.ts,.js}',
                    ],
                });
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
