import { Column, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
        nullable: false,
    })
    updatedAt?: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp with time zone',
        nullable: true,
    })
    deletedAt?: Date;
}
