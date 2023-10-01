import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Subconfigs } from '@src/config/configuration';
import { JwtConfig } from '@src/auth/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        const jwtConfig = configService.getOrThrow<JwtConfig>(Subconfigs.Jwt);
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.secret,
        });
    }

    validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
