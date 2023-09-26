import { IsNotEmpty } from 'class-validator';
import { BaseObject } from '@libs/types/base-object';

export class PostgresConfig extends BaseObject<PostgresConfig> {
    @IsNotEmpty()
    url?: string;
}
