import { query } from "express";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserChatRelation1748502412770 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Return if 2 table is not existed
    const isExisted = await queryRunner.hasTable('user')
      && await queryRunner.hasTable('chat')
    const tableExisted = await queryRunner.hasTable('user_chats')

    if (!isExisted || tableExisted) return;

    await queryRunner.createTable(new Table({
      name: 'user_chats',
      columns: [
        {
          name: 'user_id',
          type: 'int',
          isPrimary: true
        },
        {
          name: 'chat_id',
          type: 'int',
          isPrimary: true
        }
      ],

      foreignKeys: [
        {
          columnNames: ['user_id'],
          referencedTableName: 'user',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE'
        },
        {
          columnNames: ['chat_id'],
          referencedTableName: 'chat',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableExisted = await queryRunner.hasTable('user_chats')
    if (tableExisted) {
      await queryRunner.dropTable('user_chats')
    }
  }

}
