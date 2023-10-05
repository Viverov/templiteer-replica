import { TestsFactory } from 'test/types/tests.factory';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UsersService } from '@src/users/users.service';
import request from 'supertest';
import { RegisterBody } from '@src/web/auth/controller-types/register.body';
import { SuccessResponse } from '@libs/types/success.response';
import { faker } from '@faker-js/faker';
import { LoginBody } from '@src/web/auth/controller-types/login.body';

export const authControllerV1TestsFactory: TestsFactory = (getApp: () => INestApplication): void => {
    describe('AuthControllerV1 (e2e, /api/v1/auth)', () => {
        let usersService: UsersService;

        beforeAll(() => {
            usersService = getApp().get<UsersService>(UsersService);
        });

        describe('Register (POST /register)', () => {
            it('should register new user', async () => {
                // Prepare data
                const email = faker.internet.email();

                // Call method
                const result = await request(await getApp().getHttpServer())
                    .post('/api/v1/auth/register')
                    .send(<RegisterBody>{
                        email,
                        password: faker.internet.password(),
                    });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.CREATED);
                expect(result.body).toEqual(<SuccessResponse>{ success: true });

                const createdUser = await usersService.findOneByEmail(email);
                expect(createdUser.isPresent()).toBeTruthy();
            });

            it('should throw error if email already exists in system', async () => {
                // Prepare data
                const email = faker.internet.email();
                await usersService.register({ email, plainPassword: faker.internet.password() });

                // Call method
                const result = await request(await getApp().getHttpServer())
                    .post('/api/v1/auth/register')
                    .send(<RegisterBody>{
                        email,
                        password: faker.internet.password(),
                    });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.BAD_REQUEST);
                expect(result.body.message).toEqual('Email already exists');
            });
        });

        describe('Login (Post /login)', () => {
            it('should login existing user', async () => {
                // Prepare data
                const email = faker.internet.email();
                const password = faker.internet.password();
                await usersService.register({ email, plainPassword: password });

                // Call method
                const result = await request(await getApp().getHttpServer())
                    .post('/api/v1/auth/login')
                    .send(<LoginBody>{
                        email,
                        password,
                    });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.OK);
                expect(result.body).toHaveProperty('access_token');
            });

            it('should throw error on invalid password', async () => {
                // Prepare data
                const email = faker.internet.email();
                await usersService.register({ email, plainPassword: faker.internet.password() });

                // Call method
                const result = await request(await getApp().getHttpServer())
                    .post('/api/v1/auth/login')
                    .send(<LoginBody>{
                        email,
                        password: faker.internet.password(),
                    });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
            });

            it('should throw error on unexistring user', async () => {
                // Call method
                const result = await request(await getApp().getHttpServer())
                    .post('/api/v1/auth/login')
                    .send(<LoginBody>{
                        email: faker.internet.email(),
                        password: faker.internet.password(),
                    });

                // Check result
                expect(result.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
            });
        });
    });
};
