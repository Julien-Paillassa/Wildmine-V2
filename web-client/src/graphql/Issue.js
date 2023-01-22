import gql from 'graphql-tag';

export const createIssue = gql`
mutation createIssue($name: String!, $description: String!, $projectName: String!, $status: String!, $priority: String!, $projectId: Float!, $createdAt: DateTime!, $updatedAt: DateTime!) {
  createIssue(name: $name, description: $description, project_name: $projectName, status: $status, priority: $priority, project_id: $projectId, created_at: $createdAt, updated_at: $updatedAt) {
    id
    name
    description
    created_at
    updated_at
    status
    priority
    project_name
    project_id
    user {
      id
      roles
      first_name
      last_name
      email
      created_at
    }
    user_assigned {
      id
      roles
      first_name
      last_name
      email
      created_at
    }
  }
}
`;

export const getIssues = gql`
	query getIssues {
		issues {
      id
      name
      description
      created_at
      updated_at
      status
      priority
      project_name
      project_id
      user {
        id
        roles
        first_name
        last_name
        email
        created_at
      }
      user_assigned {
        id
        roles
        first_name
        last_name
        email
        created_at
      }
    }
	}
`;

export const deleteIssue = gql`
	mutation deleteIssue($id: Float!) {
		deleteIssue(id: $id) {
			id
			name
		}
	}
`;

export const updateIssueContent = gql`
	mutation updateIssueContent($id: Float!, $name: String!, $description: String!) {
		updateIssueContent(id: $id, name: $name, description: $description) {
			id
			name
      description
		}
	}
`;

export const getIssuesByProjectId = gql`
  query GetIssuesByProjectId($projectId: Float!) {
    getIssuesByProjectId(project_id: $projectId) {
      id
      name
      description
      created_at
      updated_at
      status
      priority
      project_name
      project_id
      user {
        id
        roles
        first_name
        email
        last_name
        created_at
      }
      user_assigned {
        id
        roles
        first_name
        email
        last_name
        created_at
      }
    }
  }
`;

export const getIssueById = gql`
  query getIssueById($id: Float!) {
    getIssueById(id: $id) {
      id
      name
      description
      created_at
      updated_at
      status
      priority
      project_name
      project_id
      user {
        id
        roles
        first_name
        last_name
        email
      }
      user_assigned {
        id
        roles
        first_name
        last_name
        email
        created_at
      }
    }
  }
`;

export const assignUserToIssue = gql`
  mutation assignUserToIssue($email: String!, $issueId: Float!) {
    assignUserToIssue(email: $email, issueId: $issueId) {
      id
      name
      description
      created_at
      updated_at
      status
      priority
      project_name
      project_id
      user_assigned {
        id
        roles
        first_name
        last_name
        email
        created_at
      }
    }
  }
`;

export const getMyIssues = gql`
query getMyIssues {
  getMyIssues {
    id
    name
    description
    created_at
    updated_at
    status
    priority
    project_name
    project_id
  }
}
`;

export const updateIssueStatus = gql`
  mutation updateIssueStatus($status: String!, $issueId: Float!) {
    updateIssueStatus(status: $status, id: $issueId) {
      id
      name
      description
      created_at
      updated_at
      status
      priority
      project_name
      project_id
      user {
        id
        roles
        first_name
        last_name
        email
        created_at
      }
      user_assigned {
        id
        roles
        first_name
        last_name
        email
        created_at
      }
    }
  }
`;

export const updateIssuePriority = gql`
  mutation updateIssuePriority($priority: String!, $issueId: Float!) {
    updateIssuePriority(priority: $priority, id: $issueId) {
      id
      name
      description
      created_at
      updated_at
      status
      priority
      project_name
      project_id
      user {
        id
        roles
        first_name
        last_name
        email
        created_at
      }
      user_assigned {
        id
        roles
        first_name
        last_name
        email
        created_at
      }
    }
  }
`;