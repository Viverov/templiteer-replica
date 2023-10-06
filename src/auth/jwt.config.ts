import { IsNotEmpty } from 'class-validator';

export class JwtConfig {
    @IsNotEmpty()
    secret?: string;
    @IsNotEmpty()
    expireIn?: string;

    constructor(data: { secret?: string; expireIn?: string }) {
        this.secret = data.secret;
        this.expireIn = data.expireIn;
    }
}
