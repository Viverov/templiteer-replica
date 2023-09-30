import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConfig } from '@src/../libs/core/src/typeorm/postgres.config';
import { typeormOptionsFactory } from '@src/../libs/core/src/typeorm/typeorm.options.factory';
import { configuration, Subconfigs } from '@src/config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TemplatesModule } from './templates/templates.module';
import { WebModule } from '@src/web/web.module';
import { UsersModule } from '@src/users/users.module';
import { SoftwareModule } from '@src/software/software.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync(<TypeOrmModuleAsyncOptions>{
            useFactory: (config: ConfigService) => {
                const postgresConfig = config.getOrThrow<PostgresConfig>(Subconfigs.Postgres);
                return typeormOptionsFactory(postgresConfig, {
                    entities: [__dirname + '/**/*.model{.ts,.js}', __dirname + '/../libs/**/*.model{.ts,.js}'],
                    migrations: [
                        __dirname + '/../migrations/*{.ts,.js}',
                        __dirname + '/../../libs/**/migrations/*{.ts,.js}',
                    ],
                });
            },
            inject: [ConfigService],
        }),
        SoftwareModule,
        TemplatesModule,
        UsersModule,
        WebModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
