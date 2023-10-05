import { TestsFactory } from '../types/tests.factory';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { SoftwareService } from '@src/software/software.service';
import request from 'supertest';
import { initDefaultUser } from '../utils/init-default-user';
import { UsersService } from '@src/users/users.service';
import { AuthService } from '@src/auth/auth.service';
import { CreateSoftwareBody } from '@src/web/software/controller-types/create-software.body';
import { faker } from '@faker-js/faker';
import { Software } from '@src/software/software.entity';
import { FindSoftwareQuery } from '@src/web/software/controller-types/find-software.query';
import { SoftwareResponse } from '@src/web/software/controller-types/software.response';

export const softwareControllerV1TestsFactory: TestsFactory = (getApp: () => INestApplication) => {
    describe('SoftwareControllerV1TestsFactory (/api/v1/software)', () => {
        let softwareService: SoftwareService;
        let token: string;

        beforeAll(() => {
            softwareService = getApp().get<SoftwareService>(SoftwareService);
        });

        beforeEach(async () => {
            token = (await initDefaultUser(getApp().get(UsersService), getApp().get(AuthService))).token;
        });

        describe('create (Post /)', () => {
            it('should create new software', async () => {
                // Prepare data
                const name = faker.word.words({ count: 3 });

                // Call method
                const result = await request(await getApp().getHttpServer())
                    .post('/api/v1/software')
                    .send(<CreateSoftwareBody>{
                        official_name: name,
                    })
                    .auth(token, { type: 'bearer' });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.CREATED);
                expect(result.body).toMatchObject({
                    official_name: name,
                });
            });
        });

        describe('Find all (Get /)', () => {
            let softwareList: Software[];

            beforeEach(async () => {
                const createdSoftware = [];
                for (let i = 0; i < 3; i++) {
                    createdSoftware.push(
                        await softwareService.create({
                            officialName: faker.word.words({ count: 5 }),
                        }),
                    );
                }

                softwareList = createdSoftware;
            });

            it('should return all software', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer()).get('/api/v1/software');

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.OK);
                expect(result.body).toHaveProperty('software');
                expect(result.body.software.length).toEqual(3);
            });

            it('should return software by search', async () => {
                // Prepare data
                const search = softwareList[0].officialName.substring(0, softwareList[0].officialName.length - 2);

                // Call method
                const result = await request(await getApp().getHttpServer())
                    .get('/api/v1/software')
                    .query(<FindSoftwareQuery>{
                        search,
                    });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.OK);
                expect(result.body).toHaveProperty('software');
                expect(result.body.software.length).toEqual(1);
                expect(result.body.software[0].id).toEqual(softwareList[0].id);
            });

            it('should limit result', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer())
                    .get('/api/v1/software')
                    .query(<FindSoftwareQuery>{
                        limit: 2,
                    });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.OK);
                expect(result.body).toHaveProperty('software');
                expect(result.body.software.length).toEqual(2);
            });
        });

        describe('Find by id (Get /:id)', () => {
            it('should return existing software', async () => {
                // Prepare data
                const software = await softwareService.create({
                    officialName: faker.word.words(5),
                });

                // Call method
                const result = await request(await getApp().getHttpServer()).get(`/api/v1/software/${software.id}`);

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.OK);
                expect(result.body).toEqual(<SoftwareResponse>{
                    id: software.id,
                    official_name: software.officialName,
                });
            });

            it('should throw error for unexisting software', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer()).get(
                    `/api/v1/software/${faker.number.int()}`,
                );

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.NOT_FOUND);
            });
        });
    });
};
