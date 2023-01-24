import { Args, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import { Context } from '../apollo-server';

import Issue from '../models/Issue';
import IssueUtils from '../models/utils/IssueUtils';
import CreateIssueInput from "./input/issues/CreateIssueInput";
import DeleteIssueInput from "./input/issues/DeleteIssueInput";
import GetIssueByIdInput from "./input/issues/GetIssueByIdInput";
import GetIssueByProjectIdInput from './input/issues/GetIssueByProjectId';
import AssignUserInput from './input/issues/AssignUserInput';
import User from '../models/User';
import UpdateStatusInput from './input/issues/UpdateStatusInput';
import UpdatePriorityInput from './input/issues/UpdatePriorityInput';
import UpdateContentInput from './input/issues/UpdateContentInput';

@Resolver(Issue)
class IssueResolver {
  @Query(() => [Issue])
	async issues() {
		return await Issue.find({ relations: ["user_assigned", "user", 'project'] });
	}

	@Mutation(() => Issue)
	async createIssue(
    @Ctx() context: Context,
		@Args()
		{
      name,
      description,
      project_name,
      status,
      priority,
      project_id,
      created_at,
      updated_at
    }: CreateIssueInput
	) {
    const { sessionId } = context;

		return await IssueUtils.createIssue({
      name,
      description,
      project_name,
      status,
      priority,
      project_id,
      sessionId,
      created_at,
      updated_at
    })
	}

	@Mutation(() => Issue)
	async deleteIssue(@Args() { id }: DeleteIssueInput) {
		return await IssueUtils.deleteIssue({ id });
	}

  @Query(() => [Issue])
	async getIssuesByProjectId(@Args() { project_id }: GetIssueByProjectIdInput) {
		return await IssueUtils.getIssuesByProjectId({ project_id });
	}

	@Query(() => Issue)
	async getIssueById(@Args() { id }: GetIssueByIdInput) {
		return await IssueUtils.getIssueById({ id });
	}

  @Mutation(() => Issue)
	async assignUserToIssue(@Args() { email, issueId }: AssignUserInput) {
		return IssueUtils.assignUserToIssue({ email, issueId});
	}

  @Query(() => [Issue])
	async getMyIssues(@Ctx() context: Context,) {
    const currentUser = context.user as User;

		return await Issue.find({
      where: {user_assigned: currentUser, user: currentUser},
      relations: ["user_assigned", "user"]
    });
	}

  @Mutation(() => Issue)
  async updateIssueStatus(@Args() {id, status}: UpdateStatusInput) {
    return IssueUtils.updateIssueStatus({ id, status })
  }

  @Mutation(() => Issue)
  async updateIssuePriority(@Args() {id, priority}: UpdatePriorityInput) {
    return IssueUtils.updateIssuePriority({ id, priority })
  }

  @Mutation(() => Issue)
  async updateIssueContent(@Args() {id, name, description}: UpdateContentInput) {
    return IssueUtils.updateIssueContent({ id, name, description })
  }
}

export default IssueResolver;
