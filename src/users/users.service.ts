import { Injectable } from '@nestjs/common';
import { User } from '@src/users/user.entity';
import Optional from 'optional-js';
import { UsersRepository } from '@src/users/users.repository';
import { EmailAlreadyExistsError } from '@src/users/errors/email-already-exists.error';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async create({ email, plainPassword }: { email: string; plainPassword: string }): Promise<User> {
        (await this.usersRepository.findOne({ where: { email } })).ifPresent(() => {
            throw new EmailAlreadyExistsError(email);
        });

        return User.fromModel(
            await this.usersRepository.create({
                email,
                password: await bcrypt.hash(plainPassword, SALT_ROUNDS),
            }),
        );
    }

    async findOneById(id: string): Promise<Optional<User>> {
        return (await this.usersRepository.findOneById(id))
            .map((um) => Optional.of(User.fromModel(um)))
            .orElse(Optional.empty());
    }
}
