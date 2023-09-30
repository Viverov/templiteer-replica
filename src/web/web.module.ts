import { Module } from '@nestjs/common';
import { TemplatesWebModule } from '@src/web/templates/templates.web.module';

@Module({
    imports: [TemplatesWebModule],
    controllers: [],
})
export class WebModule {}
