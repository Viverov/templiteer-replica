import { GenericRepository } from '@libs/typeorm/generic.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserModel } from '@src/users/user.model';

@Injectable()
export class UsersRepository extends GenericRepository<UserModel> {
    constructor(private readonly dataSource: DataSource) {
        super(dataSource.getRepository(UserModel));
    }
}
