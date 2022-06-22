import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersTable1655638519342 implements MigrationInterface {
	name = 'CreateUsersTable1655638519342'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS users (
				"id" SERIAL NOT NULL UNIQUE PRIMARY KEY,
				"firstName" VARCHAR(100) NOT NULL,
				"lastName" VARCHAR(100) NOT NULL,
				"email" VARCHAR(200) UNIQUE NOT NULL,
				"password" VARCHAR(100) NOT NULL,
				"username" VARCHAR(100) UNIQUE NOT NULL,
				"avatar" VARCHAR(200),
				"bgImgUrl" VARCHAR(200),
				"phone" VARCHAR(100),
				"gender" VARCHAR(10),
				"religion" VARCHAR(500),
				"location" VARCHAR(500),
				"emailVerified" BOOLEAN default FALSE,
				"phoneVerified" BOOLEAN default FALSE,
				"createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				"updatedAt" TIMESTAMP	DEFAULT CURRENT_TIMESTAMP
			);`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE IF EXISTS users CASCADE;')
	}
}
