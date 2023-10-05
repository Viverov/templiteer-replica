import { Module } from '@nestjs/common';
import { SoftwareModule } from '@src/software/software.module';
import { SoftwareControllerV1 } from '@src/web/software/software.controller.v1';

@Module({
    imports: [SoftwareModule],
    controllers: [SoftwareControllerV1],
})
export class SoftwareWebModule {}
