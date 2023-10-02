import { Injectable } from '@nestjs/common';
import { Template } from '@src/templates/template.entity';
import Optional from 'optional-js';
import { TemplatesRepository } from '@src/templates/templates.repository';
import { SoftwareService } from '@src/software/software.service';
import { UsersService } from '@src/users/users.service';
import { NotFoundError } from '@libs/errors/not-found.error';

@Injectable()
export class TemplatesService {
    constructor(
        private templatesRepository: TemplatesRepository,
        private softwareService: SoftwareService,
        private usersService: UsersService,
    ) {}

    async create({
        userId,
        softwareId,
        templateText,
    }: {
        userId: string;
        softwareId: string;
        templateText: string;
    }): Promise<Template> {
        (await this.usersService.findOneById(userId)).orElseThrow(() => new NotFoundError('user', { id: userId }));
        (await this.softwareService.findOneById(softwareId)).orElseThrow(
            () => new NotFoundError('software', { id: softwareId }),
        );

        return Template.fromModel(
            await this.templatesRepository.create({
                userId,
                softwareId,
                templateText,
            }),
        );
    }

    async findAll(args: { search?: string; limit?: number; offset?: number }): Promise<Template[]> {
        const search = args.search || '';
        const limit = args.limit || 100;
        const offset = args.offset || 0;
        return (await this.templatesRepository.findBySearch({ search, limit, offset })).map((m) =>
            Template.fromModel(m),
        );
    }

    async findOneById(id: string): Promise<Optional<Template>> {
        return (await this.templatesRepository.findOneById(id))
            .map((m) => Optional.of(Template.fromModel(m)))
            .orElse(Optional.empty());
    }

    async update(id: string, { templateText }: { templateText: string }): Promise<void> {
        await (
            await this.findOneById(id)
        )
            .map(async () => {
                await this.templatesRepository.update({ id, templateText });
            })
            .orElseThrow(() => new NotFoundError('template', { id }));
    }

    async remove(id: string): Promise<void> {
        await (
            await this.findOneById(id)
        )
            .map(async () => {
                await this.templatesRepository.softRemove(id);
            })
            .orElseThrow(() => new NotFoundError('software', { id }));
    }
}
