import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1586873277676
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varChar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          { name: 'provider', type: 'varchar', isNullable: false },
          { name: 'date', type: 'datetime', isNullable: false },
          { name: 'created_at', type: 'datetime', default: 'now()' },
          { name: 'updated_at', type: 'datetime', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}

// Só pode alterar migrations se nao for enviada para controle de versão, caso contrario, deve criar uma nova migration
