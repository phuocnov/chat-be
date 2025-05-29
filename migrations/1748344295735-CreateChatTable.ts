import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChatTable1748344295735 implements MigrationInterface {
  private readonly logger = new Logger(CreateChatTable1748344295735.name)
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create chat type enum
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'chat_type_enum') THEN
          CREATE TYPE "chat_type_enum" AS ENUM ('group', 'private');
        END IF;
      END
      $$;
    `);

    // Create the chat table 
    this.logger.log('Creating Chat table');
    const tableExisted = await queryRunner.hasTable('chat')
    if (!tableExisted) await queryRunner.createTable(
      new Table({
        name: 'chat',
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: 'type',
            type: 'chat_type_enum',
            isNullable: false
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Drop Chat table');
    const tableExisted = await queryRunner.hasTable('chat')

    await queryRunner.dropTable('chat');
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'chat_type_enum') THEN
          DROP TYPE "chat_type_enum";
        END IF;
      END
      $$;
    `);
  }
}
