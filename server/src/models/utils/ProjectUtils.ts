
import AssignUserInput from "../../resolvers/input/project/AssigneUserInput";
import CreateProjectInput from "../../resolvers/input/project/CreateProjectInput";
import DeleteProjectInput from "../../resolvers/input/project/DeleteProjectInput";
import GetProjectInput from "../../resolvers/input/project/GetProjectInput";
import Project from "../Project";
import UserUtils from "./UserUtils";

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
    let user = await UserUtils.getUserByEmail({ email });

    let project = await this.getProjectById({ id: projectId });

    project.user_assigned = [user];
    user.project_assigned = [project];

    await project.save();
    await user.save();

    return project;
  }
};

export default ProjectUtils;