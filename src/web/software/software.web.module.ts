import { Module } from '@nestjs/common';
import { SoftwareModule } from '@src/software/software.module';
import { SoftwareController } from '@src/web/software/software.controller';

@Module({
    imports: [SoftwareModule],
    controllers: [SoftwareController],
})
export class SoftwareWebModule {}
