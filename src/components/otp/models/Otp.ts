import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'otps' })
export class Otp extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ nullable: false })
	userId: string

	@Column({ nullable: false })
	transporter: string

	@Column({ default: 'EMAIL' })
	transporterType: string

	@Column({ nullable: false, unique: true })
	token: string

	@Column({ nullable: false })
	tokenExpires: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
