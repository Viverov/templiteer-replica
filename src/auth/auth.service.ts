import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    generateJwtToken({ email, userId }: { email: string; userId: string }): string {
        const payload = { email, sub: userId };
        return this.jwtService.sign(payload);
    }
}
