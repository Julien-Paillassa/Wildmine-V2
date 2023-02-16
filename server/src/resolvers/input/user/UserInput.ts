import { ArgsType, Field } from 'type-graphql';

@ArgsType()
class UserInput {
  @Field()
  name!: string;

  @Field()
  id!: number;

  @Field()
  first_name!: string;

  @Field()
  last_name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  created_at!: Date;
}

export default UserInput;