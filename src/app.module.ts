import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AuthModule } from './auth/auth.module';
import { AuthJwtMiddleware } from '@src/auth/auth-jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '@src/auth/jwt.config';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { LoggerConfig } from '@libs/log/logger.config';
import { RequestIdMiddleware } from '@libs/request-id/request-id.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
            load: [configuration],
        }),
        WinstonModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                const loggerConfig = config.getOrThrow<LoggerConfig>(Subconfigs.Logger);
                return {
                    level: loggerConfig.level,
                    transports: [
                        new winston.transports.Console({
                            handleExceptions: true,
                            format: winston.format.combine(
                                winston.format.errors({ stack: true }),
                                winston.format.timestamp(),
                                nestWinstonModuleUtilities.format.nestLike(),
                            ),
                        }),
                    ],
                };
            },
            inject: [ConfigService],
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
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const jwtConfig = configService.getOrThrow<JwtConfig>(Subconfigs.Jwt);
                return {
                    secret: jwtConfig.secret,
                    signOptions: { expiresIn: jwtConfig.expireIn },
                };
            },
            global: true,
        }),
        SoftwareModule,
        TemplatesModule,
        UsersModule,
        AuthModule,
        WebModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(RequestIdMiddleware).forRoutes('*');
        consumer.apply(AuthJwtMiddleware).forRoutes('*');
    }
}
