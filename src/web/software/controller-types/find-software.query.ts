import {IsNumber, IsOptional, IsString, Max} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class FindSoftwareQuery {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    search?: string;

    @IsOptional()
    @IsNumber()
    @Max(100)
    @ApiProperty({ required: false })
    limit?: number = 20;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false })
    offset?: number;
}
