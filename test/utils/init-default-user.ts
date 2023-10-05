import { UsersService } from '@src/users/users.service';
import { faker } from '@faker-js/faker';
import { AuthService } from '@src/auth/auth.service';

export const initDefaultUser = async (
    usersService: UsersService,
    authService: AuthService,
): Promise<{ id: string; email: string; password: string; token: string }> => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await usersService.register({ email, plainPassword: password });
    const token = authService.generateJwtToken({ email, userId: user.id });
    return {
        id: user.id,
        email,
        password,
        token,
    };
};
