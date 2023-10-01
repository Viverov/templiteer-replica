import { Module } from '@nestjs/common';
import { AuthModule } from '@src/auth/auth.module';
import { AuthController } from '@src/web/auth/auth.controller';
import { UsersModule } from '@src/users/users.module';

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [AuthController],
})
export class AuthWebModule {}
