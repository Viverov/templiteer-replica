import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterBody {
    @IsNotEmpty()
    @IsString()
    email = '';
    @IsNotEmpty()
    @IsString()
    password = '';
}
