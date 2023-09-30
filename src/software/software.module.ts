import { Module } from '@nestjs/common';
import { SoftwareService } from '@src/software/software.service';

@Module({
    controllers: [],
    providers: [SoftwareService],
    exports: [SoftwareService],
})
export class SoftwareModule {}
