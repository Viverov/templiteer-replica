import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesRepository } from '@src/templates/templates.repository';
import { SoftwareModule } from '@src/software/software.module';
import { UsersModule } from '@src/users/users.module';

@Module({
    controllers: [],
    imports: [SoftwareModule, UsersModule],
    providers: [TemplatesRepository, TemplatesService],
    exports: [TemplatesService],
})
export class TemplatesModule {}
