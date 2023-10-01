import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: '*',
    });
    app.setGlobalPrefix('api', {});
    app.enableVersioning({
        type: VersioningType.URI,
    });

    const swaggerConfig = new DocumentBuilder()
        .addServer(`http://127.0.0.1:3000`, 'localhost')
        .setTitle('Templiteer API')
        .setDescription('Templiteer API example')
        .setVersion('0.1')
        .addCookieAuth(
            'templiteer_login_session',
            {
                type: 'apiKey',
                description: "Don't work from ui",
            },
            'Templiteer user',
        )
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig, {});
    SwaggerModule.setup('api/docs', app, document, {});

    const config = app.get<ConfigService, ConfigService>(ConfigService);
    await app.listen(config.getOrThrow('port'));
}
void bootstrap();
