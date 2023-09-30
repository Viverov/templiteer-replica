import { Injectable } from '@nestjs/common';

@Injectable()
export class SoftwareService {
    create() {
        return 'This action adds a new software';
    }

    findAll() {
        return `This action returns all software`;
    }

    findOne(id: number) {
        return `This action returns a #${id} software`;
    }

    update(id: number) {
        return `This action updates a #${id} software`;
    }

    remove(id: number) {
        return `This action removes a #${id} software`;
    }
}
