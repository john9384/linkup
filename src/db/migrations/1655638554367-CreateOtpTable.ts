import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateOtpTable1655638554367 implements MigrationInterface {
	name = 'CreateOtpTable1655638554367'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS otps (
				"id" VARCHAR(100) NOT NULL PRIMARY KEY,
				"userId" VARCHAR(100) NOT NULL,
				"transporter" VARCHAR(10) NOT NULL,
				"transporterType" VARCHAR(10) NOT NULL,
				"token" VARCHAR(6) NOT NULL,
				"tokenExpires" VARCHAR(100) NOT NULL,
				"createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				"updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE IF EXISTS otps CASCADE;')
	}
}
