import { Software } from '@src/software/software.entity';

export class SoftwareResponse {
    id: string;
    official_name: string;

    constructor(id: string, officialName: string) {
        this.id = id;
        this.official_name = officialName;
    }

    static fromSoftware(software: Software): SoftwareResponse {
        return {
            id: software.id,
            official_name: software.officialName,
        };
    }
}
