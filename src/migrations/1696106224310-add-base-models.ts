import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseModels1696106224310 implements MigrationInterface {
    name = 'AddBaseModels1696106224310';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "software" ("id" BIGSERIAL NOT NULL, "official_name" character varying NOT NULL, CONSTRAINT "PK_3ceec82cc90b32643b07e8d9841" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_2dc006104a4556c05b15323517" ON "software" ("official_name") `,
        );
        await queryRunner.query(
            `CREATE TABLE "templates" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "software_id" bigint NOT NULL, "template_text" text NOT NULL, CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_58b6865e85d7d38ae6478f002f" ON "templates" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_81d69568c00a2ea9ddd2012d89" ON "templates" ("software_id") `);
        await queryRunner.query(
            `ALTER TABLE "templates" ADD CONSTRAINT "FK_58b6865e85d7d38ae6478f002f1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "templates" ADD CONSTRAINT "FK_81d69568c00a2ea9ddd2012d89d" FOREIGN KEY ("software_id") REFERENCES "software"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" DROP CONSTRAINT "FK_81d69568c00a2ea9ddd2012d89d"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP CONSTRAINT "FK_58b6865e85d7d38ae6478f002f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_81d69568c00a2ea9ddd2012d89"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58b6865e85d7d38ae6478f002f"`);
        await queryRunner.query(`DROP TABLE "templates"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2dc006104a4556c05b15323517"`);
        await queryRunner.query(`DROP TABLE "software"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
