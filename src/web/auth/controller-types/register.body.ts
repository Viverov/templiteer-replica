import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterBody {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    email?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    password?: string;
}
