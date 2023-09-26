import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConfig } from '@src/typeorm/postgres.config';
import { typeormOptionsFactory } from '@src/typeorm/typeorm.options.factory';
import { configuration, ExtendedConfigModule } from '@src/config/configuration';

@Module({
    imports: [
        ExtendedConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync(<TypeOrmModuleAsyncOptions>{
            useFactory: (config: PostgresConfig) => typeormOptionsFactory(config),
            inject: [PostgresConfig],
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
