import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TemplateModel } from '@src/templates/template.model';

@Entity('users', { schema: 'public' })
export class UserModel {
    @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    id?: string;

    @Column({ name: 'password', type: 'character varying' })
    password?: string;

    @Column({ name: 'email', type: 'character varying', unique: true })
    email?: string;

    @OneToMany(() => TemplateModel, (template: TemplateModel) => template.user)
    templates?: TemplateModel[];
}
