import { Args, Mutation, Query, Resolver, Ctx } from 'type-graphql';

import Project from '../models/Project';
import CreateProjectInput from './input/project/CreateProjectInput';
import DeleteProjectInput from './input/project/DeleteProjectInput';
import GetProjectInput from './input/project/GetProjectInput';
import ProjectUtils from '../models/utils/ProjectUtils';
import AssignUserInput from './input/project/AssigneUserInput';
import UserUtils from '../models/utils/UserUtils';
import ImageUtils from '../models/utils/ImageUtils';
import User from '../models/User';
import { Context } from '../apollo-server';
import promise from 'bluebird';
import UpdateContentInput from './input/project/UpdateContentInput';

@Resolver(Project)
class ProjectResolver {
  @Query(() => [Project])
	async projects() {
		return await Project.find({ relations: ["user_assigned", "images", "issues"]});
	}

	@Mutation(() => Project)
		async createProject(
			@Args()
			{ name, description, created_at, images }: CreateProjectInput
		) 	{
				const projectCreated = await ProjectUtils.createProject({
					name,
					description,
					created_at,
					images
				})

				if (images) {
					promise.mapSeries(images, async image => {
						return await ImageUtils.createImage({
							name: image,
							project: projectCreated.id, 
							created_at,	
						})
					})
				}

				return await Project.findOneOrFail({where: {id : projectCreated.id}, relations: ["images"]})

			}

	@Mutation(() => Project)
	async deleteProject(@Args() { id }: DeleteProjectInput) {
		return ProjectUtils.deleteProject({ id });
	}

	@Query(() => Project)
	async getProjectById(@Args() { id }: GetProjectInput) {
		return ProjectUtils.getProjectById({ id });
	}

	@Mutation(() => Project)
	async assignUserToProject(@Args() { email, projectId }: AssignUserInput) {
		return ProjectUtils.assignUserToProject({ email, projectId});
	}

	@Query(() => [Project])
	async projectsByUserId(@Args() { id }: GetProjectInput) {
		return await Project.find({ where: { user_assigned: id }, relations: ["user_assigned"] });
	}

	@Query(() => [Project])
	async getMyProjects(@Ctx() context: Context,) {
    const currentUser = context.user as User;

		return await Project.find({
      where: {user_assigned: currentUser, user: currentUser},
      relations: ["user_assigned", "user"]
    });
	}
	@Mutation(() => Project)
		async updateProjectContent(@Args() {id, name, description}: UpdateContentInput) {
			return ProjectUtils.updateProjectContent({ id, name, description })
	}
}

export default ProjectResolver;
