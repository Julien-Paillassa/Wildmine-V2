import { Field, ID, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	// JoinColumn,
	JoinTable,
	ManyToMany,
	// ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Image from './Image';
// import User from './User';
import User from './User';
// import Organization from './Organization';
// import Issue from './Issue';

@Entity()
@ObjectType()
class Project extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id!: number;

	@Column()
	@Field()
	name!: string;

	@Column()
	@Field()
	description?: string;

	@Column()
	@Field()
	created_at!: string;

	@Column()
	@Field()
	projectPictureName?: string;

	@OneToMany(() => Image, image => image.project, { onDelete: 'CASCADE' })
	@Field(() => [Image], { nullable: true })
	images?: Image[];

	@ManyToMany(() => User, (user) => user.id)
	@JoinTable()
	@Field(() => [User], { nullable: true })
	user_assigned?: User[];
}

export default Project;
