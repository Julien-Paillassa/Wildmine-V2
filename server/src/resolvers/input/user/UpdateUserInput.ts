import { ArgsType, Field } from 'type-graphql';

@ArgsType()
class UpdateUserInput {
  @Field()
  id!: number;
  
  @Field()
  first_name!: string;

  @Field()
  last_name!: string;

  @Field()
  email!: string;
}

export default UpdateUserInput;
