import { SoftwareResponse } from '@src/web/software/controller-types/software.response';
import { Software } from '@src/software/software.entity';

export class SoftwareListResponse {
    software: SoftwareResponse[] = [];

    static fromSoftwareList(software: Software[]): SoftwareListResponse {
        return {
            software: software.map((s) => SoftwareResponse.fromSoftware(s)),
        };
    }
}
