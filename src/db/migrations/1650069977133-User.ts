import { MigrationInterface, QueryRunner } from 'typeorm'

export class User1650069977133 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE user ADD middleName varchar(30);`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE user drop column middleName`)
	}
}
