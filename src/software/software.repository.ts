import { GenericRepository } from '@libs/typeorm/generic.repository';
import { SoftwareModel } from './software.model';
import { Injectable } from '@nestjs/common';
import { DataSource, ILike } from 'typeorm';

@Injectable()
export class SoftwareRepository extends GenericRepository<SoftwareModel> {
    constructor(private readonly dataSource: DataSource) {
        super(dataSource.getRepository(SoftwareModel));
    }

    async findBySearch({
        search,
        limit,
        offset,
    }: {
        search: string;
        limit: number;
        offset: number;
    }): Promise<SoftwareModel[]> {
        return this.repository.find({
            where: {
                officialName: ILike(`%${search}%`),
            },
            take: limit,
            skip: offset,
            order: { id: 'ASC' },
        });
    }
}
