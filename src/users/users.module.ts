import { Module } from '@nestjs/common';
import { UsersService } from '@src/users/users.service';

@Module({
    controllers: [],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
