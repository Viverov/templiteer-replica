import {
    DeepPartial,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    FindOptionsWhere as TypeormFindCondition,
    ObjectLiteral,
    Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { FindConditions, ICountOptions, IFindManyOptions, IFindOneOptions } from '@libs/typeorm/find-options';
import Optional from 'optional-js';

export interface IGenericRepository<Model extends ObjectLiteral> {
    create: (entity: DeepPartial<Model>) => Promise<Model>;
    find: (options: IFindManyOptions<Model>) => Promise<Model[]>;
    findOne: (options: IFindOneOptions<Model>) => Promise<Optional<Model>>;
    findOneById: (id: string) => Promise<Optional<Model>>;
    count: (options: ICountOptions<Model>) => Promise<number>;
    update: (entity: DeepPartial<Model>) => Promise<Model>;
    updateMany: (entity: Model[]) => Promise<Model[]>;
    softRemove: (id: string | string[] | FindConditions<Model>) => Promise<void>;
    remove: (criteria: FindConditions<Model>) => Promise<number>;
    partialUpdate: (criteria: FindConditions<Model>, entity: QueryDeepPartialEntity<Model>) => Promise<number>;
}

export class GenericRepository<Model extends ObjectLiteral> implements IGenericRepository<Model> {
    protected repository: Repository<Model>;

    constructor(private repo: Repository<Model>) {
        this.repository = repo;
    }

    async create(entity: DeepPartial<Model>): Promise<Model> {
        const createdEntity = this.repository.create(entity);
        await this.repository.save(createdEntity);
        return createdEntity;
    }

    async find(options: IFindManyOptions<Model>): Promise<Model[]> {
        return this.repository.find(<FindOptionsWhere<Model>>options);
    }

    async findOne(options: IFindOneOptions<Model>): Promise<Optional<Model>> {
        return Optional.ofNullable(await this.repository.findOne(<FindOneOptions>options));
    }

    async findOneById(id: string): Promise<Optional<Model>> {
        return Optional.ofNullable(
            await this.repository.findOne(<FindOneOptions>{
                where: { id },
            }),
        );
    }

    async count(options: ICountOptions<Model>): Promise<number> {
        return this.repository.count(<FindManyOptions<Model>>options);
    }

    async softRemove(id: string | string[] | FindConditions<Model>): Promise<void> {
        await this.repository.softDelete(<TypeormFindCondition<Model>>id);
    }

    async remove(criteria: FindConditions<Model>): Promise<number> {
        const res = await this.repository.delete(<TypeormFindCondition<Model>>criteria);
        return res?.affected || 0;
    }

    async update(entity: DeepPartial<Model>): Promise<Model> {
        return this.repository.save(entity);
    }

    async updateMany(entity: Model[]): Promise<Model[]> {
        return this.repository.save(entity);
    }

    async partialUpdate(criteria: FindConditions<Model>, entity: QueryDeepPartialEntity<Model>): Promise<number> {
        const res = await this.repository.update(<FindOptionsWhere<Model>>criteria, entity);

        return res?.affected || 0;
    }
}
