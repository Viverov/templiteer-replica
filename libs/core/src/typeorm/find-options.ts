type OnlyFields<Entity = any> = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [P in keyof Entity]: Entity[P] extends Function ? never : P;
}[keyof Entity];

export declare type FindConditions<Entity> = {
    [P in OnlyFields<Entity>]?: Entity[P];
};

export interface IFindOneOptions<Entity> {
    select?: OnlyFields<Entity>[];
    where?: FindConditions<Entity> | FindConditions<Entity>[];
    relations?: string[];
}

export interface IFindManyOptions<Entity> extends IFindOneOptions<Entity> {
    skip?: number;
    take?: number;
    order?: {
        [P in OnlyFields<Entity>]?: 'ASC' | 'DESC' | 'asc' | 'desc' | 1 | -1;
    };
}

export interface ICountOptions<Entity> {
    where?: FindConditions<Entity> | FindConditions<Entity>[];
}
