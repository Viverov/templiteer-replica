import { ExtendedController } from '@libs/nest/ExtendedController';
import { Body, Get, NotFoundException, Param, Post, Query, Request } from '@nestjs/common';
import { Roles } from '@src/auth/roles.decorator';
import { RoleTypes } from '@src/auth/role-types';
import { Request as RequestExpress } from 'express';
import { IdParams } from '@src/web/templates/controller-types/id.params';
import { SoftwareService } from '@src/software/software.service';
import { CreateSoftwareBody } from '@src/web/software/controller-types/create-software.body';
import { SoftwareResponse } from '@src/web/software/controller-types/software.response';
import { SoftwareListResponse } from '@src/web/software/controller-types/software-list.response';
import { FindSoftwareQuery } from '@src/web/software/controller-types/find-software.query';

@ExtendedController({
    path: 'software',
    version: '1',
})
export class SoftwareControllerV1 {
    constructor(private readonly softwareService: SoftwareService) {}

    @Post()
    @Roles([RoleTypes.User])
    async create(@Request() req: RequestExpress, @Body() body: CreateSoftwareBody): Promise<SoftwareResponse> {
        return SoftwareResponse.fromSoftware(
            await this.softwareService.create({
                officialName: <string>body.official_name,
            }),
        );
    }

    @Get()
    async findAll(@Query() query: FindSoftwareQuery): Promise<SoftwareListResponse> {
        return SoftwareListResponse.fromSoftwareList(
            await this.softwareService.findAll({
                search: query.search,
                limit: query.limit,
                offset: query.offset,
            }),
        );
    }

    @Get(':id')
    async findOne(@Param() params: IdParams): Promise<SoftwareResponse> {
        return (await this.softwareService.findOneById(<string>params.id))
            .map((s) => SoftwareResponse.fromSoftware(s))
            .orElseThrow(() => new NotFoundException());
    }
}
