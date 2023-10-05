import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTemplateBody {
    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ required: true })
    software_id?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    template_text?: string;
}
