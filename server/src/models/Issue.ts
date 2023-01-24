import { Field, ID, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	OneToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import Project from './Project';

import User from './User';

// export enum Status {
//   DONE = 'DONE',
//   IN_PROGRESS = 'IN_PROGRESS',
//   IN_WAIT = 'IN_WAIT'
// }

// export enum Priority {
//   HIGH = 'HIGH',
//   NORMAL = 'NORMAL',
//   LOW = 'LOW'
// }

@Entity()
@ObjectType()
class Issue extends BaseEntity {
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
	created_at!: Date;

	@Column()
	@Field()
	updated_at!: Date;

	@Column()
	@Field()
	status!: string;

	@Column()
	@Field()
	priority!: string;

	@Column()
	@Field()
	project_name!: string;

	@Column()
	@Field()
	project_id!: number;

	@ManyToOne(() => Project, (project) => project.issues)
	@Field(() => Project, { nullable: true })
	project!: Project;

	@ManyToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'user' })
	@Field(() => User)
	user?: User;

	@ManyToOne(() => User, (user) => user.issues_assigned)
	@Field(() => User, { nullable: true })
	user_assigned?: User;
}

export default Issue;
