import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TemplateModel } from '@src/templates/template.model';

@Entity('software', { schema: 'public' })
export class SoftwareModel {
    @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    id?: string;

    @Column({ name: 'official_name', type: 'character varying' })
    @Index({ unique: true })
    officialName?: string;

    @OneToMany(() => TemplateModel, (template: TemplateModel) => template.software)
    templates?: TemplateModel[];
}
