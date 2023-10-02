import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { INestApplication, VersioningType } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { cleanDB } from './utils/clean-db';

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
