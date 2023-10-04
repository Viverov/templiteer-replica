import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IdParam {
    @IsNotEmpty()
    @IsNumberString()
    id?: string;
}
