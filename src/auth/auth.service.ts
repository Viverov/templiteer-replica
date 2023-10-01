import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/users/user.entity';
import { JwtToken } from '@src/auth/jwt-token';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    login(user: User): JwtToken {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
