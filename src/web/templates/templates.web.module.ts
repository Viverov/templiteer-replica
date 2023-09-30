import { Module } from '@nestjs/common';
import { TemplatesModule } from '@src/templates/templates.module';
import { TemplatesController } from '@src/web/templates/templates.controller';

@Module({
    imports: [TemplatesModule],
    controllers: [TemplatesController],
})
export class TemplatesWebModule {}
