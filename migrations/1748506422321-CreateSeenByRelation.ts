import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSeenByRelation1748506422321 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chat_message_seen_by_user',
        columns: [
          {
            name: 'chatMessageId',
            type: 'int',
          },
          {
            name: 'userId',
            type: 'int',
          }
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['chatMessageId'],
            referencedTableName: 'chat_message',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
        ],
      }) // true to create the table if it doesn't exist
      , true)
  }

  public async down(qjueryRunner: QueryRunner): Promise<void> {
    await qjueryRunner.dropTable('chat_message_users_user', true, true, true);
  }

}
