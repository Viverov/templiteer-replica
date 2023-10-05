import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSoftwareBody {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    official_name?: string;
}
