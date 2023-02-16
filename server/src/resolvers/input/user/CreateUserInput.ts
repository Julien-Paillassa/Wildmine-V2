import { ArgsType, Field } from 'type-graphql';

@ArgsType()
class CreateUserInput {
  @Field()
  first_name!: string;

  @Field()
  last_name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  created_at!: string;
}

export default CreateUserInput;
