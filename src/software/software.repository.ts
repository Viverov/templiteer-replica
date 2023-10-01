import { GenericRepository } from '@libs/typeorm/generic.repository';
import { SoftwareModel } from './software.model';
import { Injectable } from '@nestjs/common';
import { DataSource, ILike } from 'typeorm';

@Injectable()
export class SoftwareRepository extends GenericRepository<SoftwareModel> {
    constructor(private readonly dataSource: DataSource) {
        super(dataSource.getRepository(SoftwareModel));
    }

    async findBySearch({ search }: { search: string }): Promise<SoftwareModel[]> {
        return this.repository.find({
            where: {
                officialName: ILike(`%${search}%`),
            },
        });
    }
}
