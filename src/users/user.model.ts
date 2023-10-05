import { Column, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TemplateModel } from '@src/templates/template.model';

@Entity('users', { schema: 'public' })
@Index('users_email_unique_index', ['email'], {
    unique: true,
    where: 'deleted_at IS NULL',
})
export class UserModel {
    @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    id?: string;

    @Column({ name: 'password', type: 'character varying' })
    password?: string;

    @Column({ name: 'email', type: 'character varying' })
    email?: string;

    @OneToMany(() => TemplateModel, (template: TemplateModel) => template.user)
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
