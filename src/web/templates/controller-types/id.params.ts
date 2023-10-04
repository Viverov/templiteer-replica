import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IdParams {
    @IsNotEmpty()
    @IsNumberString()
    id?: string;
}
