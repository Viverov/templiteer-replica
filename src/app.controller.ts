import { Get } from '@nestjs/common';
import { ExtendedController } from '@libs/nest/ExtendedController';

@ExtendedController({
    version: '1',
})
export class AppController {
    @Get('/ping')
    getPing(): string {
        return 'pong';
    }
}
