import { IsNotEmpty } from 'class-validator';

export class PostgresConfig {
    @IsNotEmpty()
    url?: string;

    constructor(data: { url?: string }) {
        this.url = data.url;
    }
}
