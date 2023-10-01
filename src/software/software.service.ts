import { Injectable } from '@nestjs/common';
import { SoftwareRepository } from '@src/software/software.repository';
import { Software } from '@src/software/software.entity';
import Optional from 'optional-js';
import { NotFoundByIdError } from '@libs/errors/not-found-by-id.error';

@Injectable()
export class SoftwareService {
    constructor(private softwareRepository: SoftwareRepository) {}

    async create({ officialName }: { officialName: string }): Promise<Software> {
        return Software.fromModel(await this.softwareRepository.create({ officialName }));
    }

    async findAll({ search }: { search: string }): Promise<Software[]> {
        return (await this.softwareRepository.findBySearch({ search })).map((m) => Software.fromModel(m));
    }

    async findOneById(id: string): Promise<Optional<Software>> {
        return (await this.softwareRepository.findOneById(id))
            .map((sm) => Optional.of(Software.fromModel(sm)))
            .orElse(Optional.empty());
    }

    async update(id: string, { officialName }: { officialName: string }): Promise<void> {
        await (
            await this.findOneById(id)
        )
            .map(async () => {
                await this.softwareRepository.update({ id, officialName });
            })
            .orElseThrow(() => new NotFoundByIdError('software', id));
    }

    async remove(id: string): Promise<void> {
        await (
            await this.softwareRepository.findOneById(id)
        )
            .map(async () => {
                await this.softwareRepository.softRemove(id);
            })
            .orElseThrow(() => new NotFoundByIdError('software', id));
    }
}
