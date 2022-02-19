import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductsTable1645288587161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "products" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "name" character varying NOT NULL,
          "price" numeric NOT NULL,
          "has_lactose" boolean NOT NULL DEFAULT true,
          "description" character varying,
          "image" character varying,
          "user_id" uuid NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_products" PRIMARY KEY ("id"),
          CONSTRAINT "FK_products_users" FOREIGN KEY ("user_id")
            REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "products"');
  }
}
