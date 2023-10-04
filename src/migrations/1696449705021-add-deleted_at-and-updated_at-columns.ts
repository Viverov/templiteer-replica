import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAtAndUpdatedAtColumns1696449705021 implements MigrationInterface {
    name = 'AddDeletedAtAndUpdatedAtColumns1696449705021';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
        );
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(
            `ALTER TABLE "templates" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
        );
        await queryRunner.query(`ALTER TABLE "templates" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(
            `ALTER TABLE "software" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
        );
        await queryRunner.query(`ALTER TABLE "software" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "software" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "software" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    }
}
