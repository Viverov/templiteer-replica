import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from '@src/users/user.model';
import { SoftwareModel } from '@src/software/software.model';

@Entity('templates', { schema: 'public' })
export class TemplateModel {
    @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    id?: string;

    @Column({ name: 'user_id', type: 'bigint' })
    @Index()
    userId?: string;

    @ManyToOne(() => UserModel, (user: UserModel) => user.templates)
    @JoinColumn({ name: 'user_id' })
    user?: UserModel;

    @Column({ name: 'software_id', type: 'bigint' })
    @Index()
    softwareId?: string;

    @ManyToOne(() => SoftwareModel, (software: SoftwareModel) => software.templates)
    @JoinColumn({ name: 'software_id' })
    software?: SoftwareModel;

    @Column({ name: 'template_text', type: 'text' })
    templateText?: string;
}
