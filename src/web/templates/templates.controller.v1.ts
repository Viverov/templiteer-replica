import { ExtendedController } from '@libs/nest/ExtendedController';
import {
    Body,
    Delete,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Request,
} from '@nestjs/common';
import { CreateTemplateBody } from '@src/web/templates/controller-types/create-template.body';
import { TemplatesService } from '@src/templates/templates.service';
import { Roles } from '@src/auth/roles.decorator';
import { RoleTypes } from '@src/auth/role-types';
import { Request as RequestExpress } from 'express';
import { TemplateResponse } from '@src/web/templates/controller-types/template.response';
import { FindTemplatesQuery } from '@src/web/templates/controller-types/find-templates.query';
import { IdParams } from '@src/web/templates/controller-types/id.params';
import { UpdateTemplateBody } from '@src/web/templates/controller-types/update-template.body';
import { SuccessResponse } from '@libs/types/success.response';
import { FindMyTemplatesQuery } from '@src/web/templates/controller-types/find-my-templates.query';

@ExtendedController({
    path: 'templates',
    version: '1',
})
export class TemplatesControllerV1 {
    constructor(private readonly templatesService: TemplatesService) {}

    @Post()
    @Roles([RoleTypes.User])
    async create(@Request() req: RequestExpress, @Body() body: CreateTemplateBody): Promise<TemplateResponse> {
        return TemplateResponse.fromTemplate(
            await this.templatesService.create({
                userId: <string>req.user?.id,
                templateText: <string>body.template_text,
                softwareId: <string>body.software_id,
            }),
        );
    }

    @Get()
    async findAll(@Query() query: FindTemplatesQuery): Promise<TemplateResponse[]> {
        return (
            await this.templatesService.findAll({
                search: query.search,
                limit: query.limit,
                offset: query.offset,
            })
        ).map((t) => TemplateResponse.fromTemplate(t));
    }

    @Get('my')
    @Roles([RoleTypes.User])
    async findMy(@Request() req: RequestExpress, @Query() query: FindMyTemplatesQuery): Promise<TemplateResponse[]> {
        return (
            await this.templatesService.findMy({
                userId: <string>req.user?.id,
                limit: query.limit,
                offset: query.offset,
            })
        ).map((t) => TemplateResponse.fromTemplate(t));
    }

    @Get(':id')
    async findOne(@Param() params: IdParams): Promise<TemplateResponse> {
        return (await this.templatesService.findOneById(<string>params.id))
            .map((t) => TemplateResponse.fromTemplate(t))
            .orElseThrow(() => new NotFoundException());
    }

    @Patch(':id')
    @Roles([RoleTypes.User])
    async update(
        @Request() req: RequestExpress,
        @Param() params: IdParams,
        @Body() body: UpdateTemplateBody,
    ): Promise<SuccessResponse> {
        const templateOpt = await this.templatesService.findOneById(<string>params.id);
        templateOpt.ifPresentOrElse(
            (t) => {
                if (t.userId !== <string>req.user?.id) throw new ForbiddenException();
            },
            () => {
                throw new NotFoundException();
            },
        );
        await this.templatesService.update(<string>params.id, {
            templateText: <string>body.template_text,
        });
        return { success: true };
    }

    @Delete(':id')
    @Roles([RoleTypes.User])
    async remove(@Request() req: RequestExpress, @Param() params: IdParams): Promise<SuccessResponse> {
        const templateOpt = await this.templatesService.findOneById(<string>params.id);
        templateOpt.ifPresentOrElse(
            (t) => {
                if (t.userId !== <string>req.user?.id) throw new ForbiddenException();
            },
            () => {
                throw new NotFoundException();
            },
        );
        await this.templatesService.remove(<string>params.id);
        return { success: true };
    }
}
