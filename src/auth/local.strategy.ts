import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@src/users/users.service';
import { User } from '@src/users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, plainPassword: string): Promise<User> {
        const isUserValid = await this.usersService.validateUser(email, plainPassword);
        if (!isUserValid) {
            throw new UnauthorizedException();
        }
        return (await this.usersService.findOneByEmail(email)).get();
    }
}
