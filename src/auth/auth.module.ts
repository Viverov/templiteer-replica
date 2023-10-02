import { Module } from '@nestjs/common';
import { UsersModule } from '@src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@src/auth/local.strategy';
import { AuthService } from '@src/auth/auth.service';

@Module({
    imports: [UsersModule, PassportModule],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule {}
