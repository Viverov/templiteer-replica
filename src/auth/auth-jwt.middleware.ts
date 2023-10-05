import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Subconfigs } from '@src/config/configuration';
import { JwtConfig } from '@src/auth/jwt.config';
import { UserAuthInfo } from '@src/auth/user-auth-info';
import { JwtPayload } from '@src/auth/jwt.payload';

@Injectable()
export class AuthJwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

    async use(req: Request, res: Response, next: any): Promise<void> {
        const authorizationHeader: string | undefined = req.headers.authorization;
        if (!authorizationHeader) return next();

        const token = this.extractTokenFromHeader(authorizationHeader);

        const jwtConfig = this.configService.getOrThrow<JwtConfig>(Subconfigs.Jwt);

        try {
            const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
                secret: jwtConfig.secret,
            });
            req.user = <UserAuthInfo>{ id: payload.sub, email: payload.email };
        } catch {}

        return next();
    }

    private extractTokenFromHeader(header: string): string {
        const [type, token] = header.split(' ') ?? [];
        return type === 'Bearer' ? token : '';
    }
}
