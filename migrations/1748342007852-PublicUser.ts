import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PublicUser1748342007852 implements MigrationInterface {
  private readonly logger = new Logger(PublicUser1748342007852.name)

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Up');
    const tableExisted = await queryRunner.hasTable('user')
    if (!tableExisted) await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "username",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Up')
    const tableExisted = await queryRunner.hasTable('user')
    if (tableExisted) await queryRunner.dropTable("user");
  }
}
