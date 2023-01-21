
import AssignUserInput from "../../resolvers/input/project/AssigneUserInput";
import CreateProjectInput from "../../resolvers/input/project/CreateProjectInput";
import DeleteProjectInput from "../../resolvers/input/project/DeleteProjectInput";
import GetProjectInput from "../../resolvers/input/project/GetProjectInput";
import Project from "../Project";
import UserUtils from "./UserUtils";
import User from "../User";
import UpdateContentInput from "../../resolvers/input/project/UpdateContentInput";

class ProjectUtils extends Project {
  static async createProject({ name, description, created_at, projectPictureName }: CreateProjectInput) {
      const project = new Project();
  
      project.name = name;
      project.description = description;
      project.created_at = created_at;
      project.projectPictureName = projectPictureName
  
      await project.save();
  
      return project;
  }

  static async deleteProject({ id }: DeleteProjectInput) {
    const project = await Project.findOneOrFail({ id });

    return await Project.remove(project);
  }

  static async getProjectById({ id }: GetProjectInput) {
    return await Project.findOneOrFail({ where: { id }, relations: ["images", "user_assigned"] });
  }

  static async assignUserToProject({ email, projectId }: AssignUserInput) {
    const user = await UserUtils.getUserByEmail({ email });

    const project = await this.getProjectById({ id: projectId });
    
    project.user_assigned = project.user_assigned ? [...project.user_assigned, user] : [user];
    user.project_assigned = user.project_assigned ? [...user.project_assigned, project] : [project];

    await project.save();
    await user.save();

    return project;
  }

  static async updateProjectContent({id, name, description }: UpdateContentInput) {
    const issue = await this.getProjectById({ id });

    issue.name = name;
    issue.description = description;

    await issue.save();

    return issue;
  }
};

export default ProjectUtils;