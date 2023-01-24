import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    ManyToOne,
    OneToOne,
    JoinColumn
  } from 'typeorm';
import User from './User';

@Entity()
@ObjectType()
class Session extends BaseEntity {
    @PrimaryColumn()
    @Field()
    uid!: string;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user' })
    @Field()
    user!: User;
    
}

export default Session;