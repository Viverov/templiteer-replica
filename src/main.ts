import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { RolesGuard } from '@src/auth/roles.guard';
import { RoleTypes } from '@src/auth/role-types';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: '*',
    });
    app.setGlobalPrefix('api', {});
    app.enableVersioning({
        type: VersioningType.URI,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );
    app.useGlobalGuards(new RolesGuard(new Reflector()));

    const swaggerConfig = new DocumentBuilder()
        .addServer(`http://127.0.0.1:3000`, 'localhost')
        .setTitle('Templiteer API')
        .setDescription('Templiteer API example')
        .setVersion('0.1')
        .addBearerAuth(
            {
                type: 'apiKey',
                description: "Don't work from ui",
            },
            RoleTypes.User,
        )
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig, {});
    SwaggerModule.setup('api/docs', app, document, {});

    const config = app.get<ConfigService, ConfigService>(ConfigService);
    await app.listen(config.getOrThrow('port'));
}
void bootstrap();
