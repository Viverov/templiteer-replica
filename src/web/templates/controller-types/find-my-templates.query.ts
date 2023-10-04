import { IsNumber, IsOptional, Max } from 'class-validator';

export class FindMyTemplatesQuery {
    @IsOptional()
    @IsNumber()
    @Max(100)
    limit?: number = 20;

    @IsOptional()
    @IsNumber()
    offset?: number;
}
