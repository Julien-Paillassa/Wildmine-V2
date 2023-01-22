import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../apollo-server";

import User from "../models/User";
import CreateUserInput from "./input/user/CreateUserInput";
import UpdateUserInput from "./input/user/UpdateUserInput";
import UserUtils from "../models/utils/UserUtils";
import DeleteUserInput from "./input/user/DeleteUserInput";
import GetUserByEmailInput from "./input/user/getUserByEmailInput";

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async users() {
    return await User.find({ relations: ["project_assigned", "issues_assigned"] });
  }

  @Mutation(() => User)
  async createUser(
    @Args()
    { first_name, last_name, email, password, roles,created_at }: CreateUserInput
  ) {
    return UserUtils.createUser({first_name,last_name, email, password,roles, created_at,});
  }

  @Mutation(() => User)
  async updateUser( 
    @Arg("id") id: number,
    @Args()
    {
      first_name,
      last_name,
      email,
      roles
    }: UpdateUserInput
  ) {
    return UserUtils.updateUser({
      id,
      first_name,
      last_name,
      email,
      roles
    });
  }

	@Mutation(() => User)
	async deleteUser(@Args() { id }: DeleteUserInput) {
		return UserUtils.deleteUser({ id });
	}

  @Authorized()
  @Mutation(() => User)
  async deleteMe(@Ctx() context: Context) {
    const currentUser = context.user as User;
    return UserUtils.deleteUser({ id: currentUser.id });
  }

  @Query(() => User)
  async getUserByEmail(@Args() { email }: GetUserByEmailInput ) {
    return await UserUtils.getUserByEmail({ email });
  }
}

export default UserResolver;
