import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';

@Module({
    controllers: [],
    providers: [TemplatesService],
    exports: [TemplatesService],
})
export class TemplatesModule {}
