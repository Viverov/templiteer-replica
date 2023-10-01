import { Module } from '@nestjs/common';
import { UsersModule } from '@src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@src/auth/local.strategy';
import { AuthService } from '@src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Subconfigs } from '@src/config/configuration';
import { JwtConfig } from '@src/auth/jwt.config';
import { JwtStrategy } from '@src/auth/jwt.strategy';

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const jwtConfig = configService.getOrThrow<JwtConfig>(Subconfigs.Jwt);
                return {
                    secret: jwtConfig.secret,
                    signOptions: { expiresIn: jwtConfig.expireIn },
                };
            },
        }),
        UsersModule,
        PassportModule,
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
