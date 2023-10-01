import { Module } from '@nestjs/common';
import { TemplatesWebModule } from '@src/web/templates/templates.web.module';
import { AuthWebModule } from '@src/web/auth/auth.web.module';

@Module({
    imports: [AuthWebModule, TemplatesWebModule],
})
export class WebModule {}
