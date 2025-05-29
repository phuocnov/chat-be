import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnEmailToUser1748503956024 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasEmailColumn = await queryRunner.hasColumn('user', 'email');

    if (!hasEmailColumn) await queryRunner.addColumn('user', new TableColumn({
      name: 'email',
      type: 'varchar',
      isNullable: true,
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'email');
  }
}
