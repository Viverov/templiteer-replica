import { TestsFactory } from '../types/tests.factory';
import { initDefaultUser } from '../utils/init-default-user';
import { UsersService } from '@src/users/users.service';
import { AuthService } from '@src/auth/auth.service';
import { TemplatesService } from '@src/templates/templates.service';
import { SoftwareService } from '@src/software/software.service';
import { Software } from '@src/software/software.entity';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { CreateTemplateBody } from '@src/web/templates/controller-types/create-template.body';
import { HttpStatus } from '@nestjs/common';
import { Template } from '@src/templates/template.entity';
import { TemplatesResponse } from '@src/web/templates/controller-types/templates.response';
import { FindMyTemplatesQuery } from '@src/web/templates/controller-types/find-my-templates.query';
import { FindTemplatesQuery } from '@src/web/templates/controller-types/find-templates.query';
import { UpdateTemplateBody } from '@src/web/templates/controller-types/update-template.body';

export const templatesControllerV1TestsFactory: TestsFactory = (getApp) => {
    describe('TemplatesControllerV1 (/api/v1/templates)', () => {
        let templatesService: TemplatesService;
        let softwareService: SoftwareService;

        let usersService: UsersService;
        let authService: AuthService;

        let userId: string;
        let token: string;

        let software: Software;

        beforeAll(() => {
            templatesService = getApp().get(TemplatesService);
            softwareService = getApp().get(SoftwareService);

            usersService = getApp().get(UsersService);
            authService = getApp().get(AuthService);
        });

        beforeEach(async () => {
            const userInfo = await initDefaultUser(usersService, authService);
            userId = userInfo.id;
            token = userInfo.token;

            software = await softwareService.create({
                officialName: faker.word.words(3),
            });
        });

        describe('create (Post /)', () => {
            it('should create template', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer())
                    .post('/api/v1/templates')
                    .send(<CreateTemplateBody>{
                        software_id: software.id,
                        template_text: faker.word.words(3),
                    })
                    .auth(token, { type: 'bearer' });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.CREATED);

                const id: string = result.body.id;
                const templateFromDb = await templatesService.findOneById(id);
                expect(templateFromDb.isPresent()).toBeTruthy();
            });

            it('should throw error for undefined software', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer())
                    .post('/api/v1/templates')
                    .send(<CreateTemplateBody>{
                        software_id: '' + faker.number.int({ min: 10000, max: 100000 }),
                        template_text: faker.word.words(3),
                    })
                    .auth(token, { type: 'bearer' });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.NOT_FOUND);
            });
        });

        describe('Find my templates (GET /my)', () => {
            let myTemplates: Template[];

            beforeEach(async () => {
                const createdTemplates = [];
                for (let i = 0; i < 3; i++) {
                    createdTemplates.push(
                        await templatesService.create({
                            userId,
                            templateText: faker.word.words(3),
                            softwareId: software.id,
                        }),
                    );
                }
                myTemplates = createdTemplates;

                const anotherUser = await initDefaultUser(usersService, authService);
                await templatesService.create({
                    userId: anotherUser.id,
                    templateText: faker.word.words(3),
                    softwareId: software.id,
                });
            });

            it('should return my templates', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer())
                    .get('/api/v1/templates/my')
                    .auth(token, { type: 'bearer' });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.OK);
                expect(result.body).toHaveProperty('templates');
                expect((<TemplatesResponse>result.body).templates.length).toEqual(myTemplates.length);
                expect(
                    (<TemplatesResponse>result.body).templates.every((t) =>
                        myTemplates.map((mt) => mt.id).includes(t.id),
                    ),
                ).toBeTruthy();
            });

            it('should limit my templates', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer())
                    .get('/api/v1/templates/my')
                    .query(<FindMyTemplatesQuery>{
                        limit: 2,
                    })
                    .auth(token, { type: 'bearer' });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.OK);
                expect(result.body).toHaveProperty('templates');
                expect((<TemplatesResponse>result.body).templates.length).toEqual(2);
            });
        });

        describe('Find templates (Get /)', () => {
            let templates: Template[];

            beforeEach(async () => {
                const createdTemplates = [];
                for (let i = 0; i < 3; i++) {
                    createdTemplates.push(
                        await templatesService.create({
                            userId,
                            templateText: faker.word.words(3),
                            softwareId: software.id,
                        }),
                    );
                }
                templates = createdTemplates;
            });

            it('should return templates', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer())
                    .get('/api/v1/templates')
                    .auth(token, { type: 'bearer' });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.OK);
                expect(result.body).toHaveProperty('templates');
                expect((<TemplatesResponse>result.body).templates.length).toEqual(templates.length);
                expect(
                    (<TemplatesResponse>result.body).templates.every((t) =>
                        templates.map((mt) => mt.id).includes(t.id),
                    ),
                ).toBeTruthy();
            });

            it('should limit templates', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer())
                    .get('/api/v1/templates')
                    .query(<FindTemplatesQuery>{
                        limit: 2,
                    });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.OK);
                expect(result.body).toHaveProperty('templates');
                expect((<TemplatesResponse>result.body).templates.length).toEqual(2);
            });

            it('should search templates', async () => {
                // Prepare data
                const search = templates[0].templateText.substring(0, templates[0].templateText.length - 2);

                // Call method
                const result = await request(await getApp().getHttpServer())
                    .get('/api/v1/templates')
                    .query(<FindTemplatesQuery>{
                        search,
                    });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.OK);
                expect(result.body).toHaveProperty('templates');
                expect((<TemplatesResponse>result.body).templates.length).toEqual(1);
                expect((<TemplatesResponse>result.body).templates[0].id).toEqual(templates[0].id);
            });
        });

        describe('Update templates (PATCH /:id)', () => {
            let template: Template;

            beforeEach(async () => {
                template = await templatesService.create({
                    userId,
                    templateText: faker.word.words(3),
                    softwareId: software.id,
                });
            });

            it('should update existing template', async () => {
                // Prepare data
                const newText = faker.word.words({ count: 5 });

                // Call method
                const result = await request(await getApp().getHttpServer())
                    .patch(`/api/v1/templates/${template.id}`)
                    .send(<UpdateTemplateBody>{
                        template_text: newText,
                    })
                    .auth(token, { type: 'bearer' });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.OK);
                const newTemplate = await templatesService.findOneById(template.id);
                expect(newTemplate.isPresent()).toBeTruthy();
                expect(newTemplate.get().templateText).toEqual(newText);
            });

            it('should throw not found for unexsisting template', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer())
                    .patch(`/api/v1/templates/${template.id + 1}`)
                    .send(<UpdateTemplateBody>{
                        template_text: faker.word.words({ count: 5 }),
                    })
                    .auth(token, { type: 'bearer' });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.NOT_FOUND);
            });

            it('should throw forbidden for invalid user', async () => {
                // Prepare data
                const anotherUser = await initDefaultUser(usersService, authService);

                // Call method
                const result = await request(await getApp().getHttpServer())
                    .patch(`/api/v1/templates/${template.id}`)
                    .send(<UpdateTemplateBody>{
                        template_text: faker.word.words({ count: 5 }),
                    })
                    .auth(anotherUser.token, { type: 'bearer' });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.FORBIDDEN);
            });
        });

        describe('Delete template (DELETE /:id)', () => {
            let template: Template;

            beforeEach(async () => {
                template = await templatesService.create({
                    userId,
                    templateText: faker.word.words(3),
                    softwareId: software.id,
                });
            });

            it('should delete existing template', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer())
                    .delete(`/api/v1/templates/${template.id}`)
                    .auth(token, { type: 'bearer' });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.OK);
                const newTemplate = await templatesService.findOneById(template.id);
                expect(newTemplate.isPresent()).toBeFalsy();
            });

            it('should throw not found for unexsisting template', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer())
                    .delete(`/api/v1/templates/${template.id + 1}`)
                    .auth(token, { type: 'bearer' });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.NOT_FOUND);
            });

            it('should throw forbidden for invalid user', async () => {
                // Prepare data
                const anotherUser = await initDefaultUser(usersService, authService);

                // Call method
                const result = await request(await getApp().getHttpServer())
                    .delete(`/api/v1/templates/${template.id}`)
                    .auth(anotherUser.token, { type: 'bearer' });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.FORBIDDEN);
            });
        });
    });
};
