import { ExtendedController } from '@libs/nest/ExtendedController';
import {
    BadRequestException,
    Body,
    Get,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    Post,
    Request,
    UnauthorizedException,
} from '@nestjs/common';
import { LoginResponse } from '@src/web/auth/controller-types/login.response';
import { AuthService } from '@src/auth/auth.service';
import { Request as RequestExpress } from 'express';
import { RegisterBody } from '@src/web/auth/controller-types/register.body';
import { UsersService } from '@src/users/users.service';
import { SuccessResponse } from '@libs/types/success.response';
import { UserAuthInfo } from '@src/auth/user-auth-info';
import { MeResponse } from '@src/web/auth/controller-types/me.response';
import { Roles } from '@src/auth/roles.decorator';
import { RoleTypes } from '@src/auth/role-types';
import { LoginBody } from '@src/web/auth/controller-types/login.body';
import { EmailAlreadyExistsError } from '@src/users/errors/email-already-exists.error';

@ExtendedController({
    path: 'auth',
    version: '1',
})
export class AuthControllerV1 {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: RequestExpress, @Body() body: LoginBody): Promise<LoginResponse> {
        const isValidUser = await this.usersService.validateUser(<string>body.email, <string>body.password);
        if (!isValidUser) throw new UnauthorizedException();
        const user = (await this.usersService.findOneByEmail(<string>body.email)).get();
        return {
            access_token: this.authService.generateJwtToken({ email: user.email, userId: user.id }),
        };
    }

    @Post('register')
    async register(@Body() body: RegisterBody): Promise<SuccessResponse> {
        try {
            await this.usersService.register({ email: <string>body.email, plainPassword: <string>body.password });
        } catch (err) {
            if (err instanceof EmailAlreadyExistsError) {
                throw new BadRequestException('Email already exists');
            }
            throw new InternalServerErrorException();
        }
        return { success: true };
    }

    @Get('me')
    @Roles([RoleTypes.User])
    getMe(@Request() req: RequestExpress): MeResponse {
        const user = <UserAuthInfo>req.user;
        return {
            id: user.id,
            email: user.email,
        };
    }
}
