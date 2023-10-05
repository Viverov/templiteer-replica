import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUsersEmailUniqueIndex1696526634629 implements MigrationInterface {
    name = 'FixUsersEmailUniqueIndex1696526634629';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(
            `CREATE UNIQUE INDEX "users_email_unique_index" ON "users" ("email") WHERE deleted_at IS NULL`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."users_email_unique_index"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
    }
}
