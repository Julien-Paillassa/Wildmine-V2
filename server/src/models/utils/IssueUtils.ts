import Issue from "../Issue";
import CreateIssueUtilsInput from "../../resolvers/input/issues/CreateIssueUtilsInput";
import DeleteIssueInput from "../../resolvers/input/issues/DeleteIssueInput";
import GetIssueByIdInput from "../../resolvers/input/issues/GetIssueByIdInput";
import SessionUtils from "./SessionUtils";
import GetIssueByProjectIdInput from "../../resolvers/input/issues/GetIssueByProjectId";
import UserUtils from "./UserUtils";
import AssignUserInput from "../../resolvers/input/issues/AssignUserInput";
import UpdateStatusInput from "../../resolvers/input/issues/UpdateStatusInput";
import UpdatePriorityInput from "../../resolvers/input/issues/UpdatePriorityInput";
import UpdateContentInput from "../../resolvers/input/issues/UpdateContentInput";
import ProjectUtils from "./ProjectUtils";

class IssueUtils extends Issue {
  static async createIssue({ name, description, status, priority, project_id, sessionId, created_at, updated_at, project_name }: CreateIssueUtilsInput) {
      const issue = new Issue();

      const user = await SessionUtils.userInfo({ sessionId });
      const project = await ProjectUtils.getProjectById({id: project_id});

  
      issue.name = name;
      issue.description = description;
      issue.status = status;
      issue.project_name = project_name;
      issue.priority = priority;
      issue.project_id = project_id;
      issue.user = user;
      issue.project = project;
      issue.user_assigned = user;
      issue.created_at = created_at;
      issue.updated_at = updated_at;

      await issue.save();

      project.issues = project.issues ? [...project.issues, issue] : [issue];

      await project.save();
  
      return issue;
  }

  static async deleteIssue({ id }: DeleteIssueInput) {
    const issue = await Issue.findOneOrFail({ id });

    return await Issue.remove(issue);
  }

  static async getIssuesByProjectId({ project_id }: GetIssueByProjectIdInput) {
    return await Issue.find({ where: { project_id }, relations: ["user", "user_assigned"] });
  }

  static async getIssueById({ id }: GetIssueByIdInput) {
    return await Issue.findOneOrFail({ where: { id }, relations: ["user", "user_assigned"] });
  }

  static async assignUserToIssue({ email, issueId }: AssignUserInput) {
    

    const user = await UserUtils.getUserByEmail({ email });
    
    const issue = await this.getIssueById({ id: issueId });

    issue.user_assigned = user;
    user.issues_assigned = user.issues_assigned ? [...user.issues_assigned, issue] : [issue];

    await issue.save();
    await user.save();

    return issue;
  }

  static async updateIssueStatus({id, status}: UpdateStatusInput) {
    const issue = await this.getIssueById({ id });

    issue.status = status;

    await issue.save();

    return issue;
  }

  static async updateIssuePriority({id, priority}: UpdatePriorityInput) {
    const issue = await this.getIssueById({ id });

    issue.priority = priority;

    await issue.save();

    return issue;
  }

  static async updateIssueContent({id, name, description }: UpdateContentInput) {
    const issue = await this.getIssueById({ id });

    issue.name = name;
    issue.description = description;

    await issue.save();

    return issue;
  }
};

export default IssueUtils;