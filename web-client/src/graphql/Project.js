import gql from 'graphql-tag';

export const getProjects = gql`
	query getProjects {
		projects {
			id
			name
			description
			projectPictureName
			created_at
			user_assigned {
				id
				roles
				first_name
				last_name
				email
				created_at
			}
			images {
				id
				name
				created_at
			}
		}
	}
`;

export const getProjectById = gql`
	query getProjectById($id: Float!) {
		getProjectById(id: $id) {
			id
			name
			description
			created_at
			projectPictureName
			images {
				id
				name
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
			images {
				id
				name
				created_at
			}
		}
	}
`;

export const deleteProject = gql`
	mutation deleteProject($id: Float!) {
		deleteProject(id: $id) {
			id
			name
		}
	}
`;

export const updateProjectContent = gql`
	mutation updateProjectContent($id: Float!, $name: String!, $description: String!) {
		updateProjectContent(id: $id, name: $name, description: $description) {
			id
			name
      		description
		}
	}
`;

export const createProject = gql`
	mutation createProject($name: String!, $description: String!, $createdAt: String!, $projectPictureName: String!, $images: [String!]!) {
		createProject(name: $name, description: $description, created_at: $createdAt, projectPictureName: $projectPictureName, images: $images) {
			id
			name
			description
			projectPictureName
			created_at
			images {
				id 
				name
				created_at
			}
		}
	}
`;

export const createFile = gql`
	mutation createFile($picture: Upload!) {
		createFile(picture: $picture)
	}
`;

export const assignUserToProject = gql`
mutation assignUserToProject($email: String!, $projectId: Float!) {
  assignUserToProject(email: $email, projectId: $projectId) {
    id
    name
    description
    created_at
    projectPictureName
    user_assigned {
      id
      roles
      first_name
      last_name
      email
      created_at
    }
    images {
      id
      name
      created_at
    }
  }
}
`;
