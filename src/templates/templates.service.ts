import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplatesService {
    create() {
        return 'This action adds a new template';
    }

    findAll() {
        return `This action returns all templates`;
    }

    findOne(id: number) {
        return `This action returns a #${id} template`;
    }

    update(id: number) {
        return `This action updates a #${id} template`;
    }

    remove(id: number) {
        return `This action removes a #${id} template`;
    }
}
