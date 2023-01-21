import { ArgsType, Field } from 'type-graphql';

@ArgsType()
class UpdateContentInput {
  @Field()
  id!: number

  @Field()
  name!: string;

  @Field()
  description!: string;
}

export default UpdateContentInput;
