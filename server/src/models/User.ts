import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import Color from './Color';
import Issue from './Issue';
import Organization from './Organization';
import Project from './Project';

@Entity()
@ObjectType()
class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id!: number;

	@Column()
	@Field()
	roles!: string;

	@Column()
	@Field()
	first_name!: string;

	@Column()
	@Field()
	last_name!: string;

	@Column()
	@Field()
	// @isEmail()
	email!: string;

	@Column()
	password!: string;

	@Column()
	@Field()
	created_at!: string;

	@ManyToMany(() => Project, (project) => project.id)
	@JoinTable()
	@Field(() => [Project], { nullable: true })
	project_assigned?: Project[];

	@OneToMany(() => Issue, (issue) => issue.user_assigned)
	@Field(() => [Issue], { nullable: true })
	issues_assigned?: Issue[];
}

export default User;
