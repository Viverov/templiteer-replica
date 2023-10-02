import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@src/users/users.service';
import { UserAuthInfo } from '@src/auth/user-auth-info';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, plainPassword: string): Promise<UserAuthInfo> {
        const isUserValid = await this.usersService.validateUser(email, plainPassword);
        if (!isUserValid) {
            throw new UnauthorizedException();
        }
        const user = (await this.usersService.findOneByEmail(email)).get();
        return {
            id: user.id,
            email: user.email,
        };
    }
}
