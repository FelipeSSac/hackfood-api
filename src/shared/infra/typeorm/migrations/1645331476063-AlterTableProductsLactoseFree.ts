import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProductsLactoseFree1645331476063 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products"
      RENAME COLUMN "has_lactose" TO "lactose_free";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products"
      RENAME COLUMN "lactose_free" TO "has_lactose";
    `);
  }
}
