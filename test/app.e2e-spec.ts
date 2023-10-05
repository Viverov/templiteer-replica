import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { cleanDB } from './utils/clean-db';
import { authControllerV1TestsFactory } from './auth/auth.controller.v1.tests.factory';
import { RolesGuard } from '@src/auth/roles.guard';
import { Reflector } from '@nestjs/core';
import { softwareControllerV1TestsFactory } from './software/software.controller.v1.tests.factory';

let app: INestApplication;

beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
        providers: [],
    }).compile();

    app = moduleRef.createNestApplication();

    app.setGlobalPrefix('api', {});
    app.enableVersioning({
        type: VersioningType.URI,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    app.useGlobalGuards(new RolesGuard(new Reflector()));

    await app.init();
});

beforeEach(async () => {
    await cleanDB(app.get<DataSource>(DataSource));
});

afterAll(async () => {
    await app.close();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getApp = (): INestApplication => {
    if (!app) {
        throw new Error(`App exist only in 'it' or hooks ('beforeEach', 'afterEach', etc) context!`);
    }
    return app;
};

describe('demo', () => {
    it('should demo', async () => {
        expect(1 + 1).toBe(2);
    });
});

authControllerV1TestsFactory(getApp);
softwareControllerV1TestsFactory(getApp);
