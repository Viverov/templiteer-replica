import { BaseObject } from '@libs/types/base-object';
import { IsNotEmpty } from 'class-validator';

export class JwtConfig extends BaseObject<JwtConfig> {
    @IsNotEmpty()
    secret?: string;
    @IsNotEmpty()
    expireIn?: string;
}
