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

    async register({ email, plainPassword }: { email: string; plainPassword: string }): Promise<User> {
        (await this.usersRepository.findOne({ where: { email: email.toLowerCase() } })).ifPresent(() => {
            throw new EmailAlreadyExistsError(email);
        });

        return User.fromModel(
            await this.usersRepository.create({
                email: email.toLowerCase(),
                password: await bcrypt.hash(plainPassword, SALT_ROUNDS),
            }),
        );
    }

    async validateUser(email: string, plainPassword: string): Promise<boolean> {
        const userOpt = await this.usersRepository.findOne({ where: { email: email.toLowerCase() } });
        if (!userOpt.isPresent()) return false;
        const userModel = userOpt.get();
        return (
            userModel && typeof userModel.password !== 'undefined' && bcrypt.compare(plainPassword, userModel.password)
        );
    }

    async findOneByEmail(email: string): Promise<Optional<User>> {
        return (await this.usersRepository.findOne({ where: { email: email.toLowerCase() } }))
            .map((um) => Optional.of(User.fromModel(um)))
            .orElse(Optional.empty());
    }

    async findOneById(id: string): Promise<Optional<User>> {
        return (await this.usersRepository.findOneById(id))
            .map((um) => Optional.of(User.fromModel(um)))
            .orElse(Optional.empty());
    }
}
