// import {
// 	Entity,
// 	PrimaryGeneratedColumn,
// 	Column,
// 	BaseEntity,
// 	CreateDateColumn,
// 	UpdateDateColumn,
// } from 'typeorm'

// @Entity({ name: 'users' })
// export class User extends BaseEntity {
// 	@PrimaryGeneratedColumn('uuid')
// 	id: string

// 	@Column({ nullable: false })
// 	firstName: string

// 	@Column({ nullable: false })
// 	lastName: string

// 	@Column({
// 		unique: true,
// 		nullable: false,
// 	})
// 	email: string

// 	@Column({ nullable: false })
// 	password: string

// 	@Column({
// 		type: 'set',
// 		enum: [null, 'MALE', 'FEMALE'],
// 		default: [null],
// 	})
// 	gender: GenderType

// 	@Column()
// 	phone: string

// 	@Column()
// 	location: string

// 	@Column({
// 		default: false,
// 	})
// 	emailVerified: boolean

// 	@Column({
// 		default: false,
// 	})
// 	phoneVerified: boolean

// 	@Column({
// 		default: false,
// 	})
// 	isVendor: boolean

// 	@Column({
// 		default: false,
// 	})
// 	isFreelancer: boolean

// 	@Column({
// 		default: false,
// 	})
// 	isBlogger: boolean

// 	@Column({
// 		default: false,
// 	})
// 	isPremium: boolean

// 	@Column({
// 		default: false,
// 	})
// 	isSubscribed: boolean

// 	@CreateDateColumn()
// 	createdAt: Date

// 	@UpdateDateColumn()
// 	updatedAt: Date
// }

// export type GenderType = 'MALE' | 'FEMALE'

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: number

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column()
	email: string

	@Column()
	password: string

	@Column()
	username: string

	@Column()
	avatar: string

	@Column()
	bgImgUrl: string

	@Column()
	phone: string

	@Column()
	gender: string

	@Column()
	religion: string

	@Column()
	location: string

	@Column()
	emailVerified: string

	@Column()
	phoneVerified: string

	@Column()
	createdAt: Date

	@Column()
	updatedAt: Date
}
