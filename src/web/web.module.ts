import { Module } from '@nestjs/common';
import { TemplatesWebModule } from '@src/web/templates/templates.web.module';
import { AuthWebModule } from '@src/web/auth/auth.web.module';
import { SoftwareWebModule } from '@src/web/software/software.web.module';

@Module({
    imports: [AuthWebModule, TemplatesWebModule, SoftwareWebModule],
})
export class WebModule {}
