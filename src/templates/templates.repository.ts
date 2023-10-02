import { GenericRepository } from '@libs/typeorm/generic.repository';
import { Injectable } from '@nestjs/common';
import { DataSource, ILike } from 'typeorm';
import { TemplateModel } from '@src/templates/template.model';

@Injectable()
export class TemplatesRepository extends GenericRepository<TemplateModel> {
    constructor(private readonly dataSource: DataSource) {
        super(dataSource.getRepository(TemplateModel));
    }

    async findBySearch({
        search,
        limit,
        offset,
    }: {
        search: string;
        limit: number;
        offset: number;
    }): Promise<TemplateModel[]> {
        return this.repository.find({
            where: {
                templateText: ILike(`%${search}%`),
            },
            take: limit,
            skip: offset,
            order: { id: 'ASC' },
        });
    }
}
