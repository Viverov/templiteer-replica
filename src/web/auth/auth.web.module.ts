import { Module } from '@nestjs/common';
import { AuthModule } from '@src/auth/auth.module';
import { AuthControllerV1 } from '@src/web/auth/auth.controller.v1';
import { UsersModule } from '@src/users/users.module';

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [AuthControllerV1],
})
export class AuthWebModule {}
