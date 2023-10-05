import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdParams {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    id?: string;
}
