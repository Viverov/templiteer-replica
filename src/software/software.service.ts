import { Injectable } from '@nestjs/common';
import { SoftwareRepository } from '@src/software/software.repository';
import { Software } from '@src/software/software.entity';
import Optional from 'optional-js';
import { NotFoundError } from '@libs/errors/not-found.error';

@Injectable()
export class SoftwareService {
    constructor(private softwareRepository: SoftwareRepository) {}

    async create({ officialName }: { officialName: string }): Promise<Software> {
        return Software.fromModel(await this.softwareRepository.create({ officialName }));
    }

    async findAll(args: { search?: string; limit?: number; offset?: number }): Promise<Software[]> {
        const search = args.search || '';
        const limit = args.limit || 100;
        const offset = args.offset || 0;
        return (await this.softwareRepository.findBySearch({ search, limit, offset })).map((m) =>
            Software.fromModel(m),
        );
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
            .orElseThrow(() => new NotFoundError('software', { id }));
    }

    async remove(id: string): Promise<void> {
        await (
            await this.softwareRepository.findOneById(id)
        )
            .map(async () => {
                await this.softwareRepository.softRemove(id);
            })
            .orElseThrow(() => new NotFoundError('software', { id }));
    }
}
