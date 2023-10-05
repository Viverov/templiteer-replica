import { Module } from '@nestjs/common';
import { TemplatesModule } from '@src/templates/templates.module';
import { TemplatesControllerV1 } from '@src/web/templates/templates.controller.v1';

@Module({
    imports: [TemplatesModule],
    controllers: [TemplatesControllerV1],
})
export class TemplatesWebModule {}
