import { Module } from '@nestjs/common';
import { UsersService } from '@src/users/users.service';
import { UsersRepository } from '@src/users/users.repository';

@Module({
    controllers: [],
    providers: [UsersService, UsersRepository],
    exports: [UsersService],
})
export class UsersModule {}
