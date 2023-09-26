import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { RequestMethod, VersioningType } from '@nestjs/common';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());

    app.enableCors({
        origin: '*',
    });
    app.setGlobalPrefix('api', {
        exclude: [{ path: '/', method: RequestMethod.GET }],
    });
    app.enableVersioning({
        type: VersioningType.URI,
    });

    await app.listen(3000);
}
void bootstrap();
