import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChatMessageTable1748504752539 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const isChatMessageTableExist = await queryRunner.hasTable('chat_message');
    if (isChatMessageTableExist) return;

    await queryRunner.createTable(new Table({
      name: 'chat_message',
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment",
        },
        {
          name: 'chatId',
          type: 'int',
          isNullable: false,
        },
        {
          name: "text",
          type: "varchar",
          isNullable: true,
        },
        {
          name: "mediaUrl",
          type: "varchar",
          isNullable: true,
        },
        {
          name: "lastSeenAt",
          type: "timestamp",
        },
        {
          name: 'lastSeenById',
          type: 'int',
          isNullable: true,
        }
      ],
      foreignKeys: [
        {
          columnNames: ['chatId'],
          referencedTableName: 'chat',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        },
        {
          columnNames: ['lastSeenById'],
          referencedTableName: 'user',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (!await queryRunner.hasTable('chat_message')) return;
    await queryRunner.dropTable('chat_message');
  }
}
