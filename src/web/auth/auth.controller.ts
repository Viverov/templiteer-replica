import { ExtendedController } from '@libs/nest/ExtendedController';
import { Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { LocalAuthGuard } from '@src/auth/local-auth.guard';
import { LoginResponse } from '@src/web/auth/controller-types/login.response';
import { AuthService } from '@src/auth/auth.service';
import { Request as RequestExpress } from 'express';
import { User } from '@src/users/user.entity';
import { RegisterBody } from '@src/web/auth/controller-types/register.body';
import { UsersService } from '@src/users/users.service';
import { SuccessResponse } from '@libs/types/success.response';
import { JwtAuthGuard } from '@src/auth/jwt-auith.guard';

@ExtendedController({
    path: 'auth',
    version: '1',
})
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: RequestExpress): Promise<LoginResponse> {
        return {
            access_token: this.authService.login(<User>req.user).accessToken,
        };
    }

    @Post('register')
    async register(@Body() body: RegisterBody): Promise<SuccessResponse> {
        await this.usersService.create({ email: body.email, plainPassword: body.password });
        return { success: true };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req: RequestExpress): any {
        return req.user;
    }
}
