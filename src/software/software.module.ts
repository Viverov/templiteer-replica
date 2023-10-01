import { Module } from '@nestjs/common';
import { SoftwareService } from '@src/software/software.service';
import { SoftwareRepository } from '@src/software/software.repository';

@Module({
    controllers: [],
    providers: [SoftwareRepository, SoftwareService],
    exports: [SoftwareService],
})
export class SoftwareModule {}
