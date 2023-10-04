// eslint-disable-next-line @typescript-eslint/no-extraneous-class
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTemplateBody {
    @IsNotEmpty()
    @IsString()
    template_text?: string;
}
