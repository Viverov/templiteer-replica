import { IsNotEmpty, IsString } from 'class-validator';

export class LoginBody {
    @IsNotEmpty()
    @IsString()
    email = '';
    @IsNotEmpty()
    @IsString()
    password = '';
}
