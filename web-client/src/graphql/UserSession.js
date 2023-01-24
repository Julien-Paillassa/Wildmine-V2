import gql from 'graphql-tag';

export const signIn = gql`
	mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
			id
			first_name
			last_name
			roles
			email
			created_at
		}
	}
`;

export const userInfo = gql`
	query userInfo {
		userInfo {
			id
			roles
			first_name
			last_name
			email
			created_at
			project_assigned {
				id
				name
				description
				created_at
			}
			issues_assigned {
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
	}
`;

export const userWithRelations = gql`
query userWithRelations {
  userWithRelations {
    id
    roles
    first_name
    last_name
    email
    created_at
    project_assigned {
      id
      name
      description
      created_at
	  images {
		id
		name
	  }
    }
    issues_assigned {
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
}`;

export const deleteSession = gql`
	mutation DeleteSession($user: Float!) {
		deleteSession(user: $user) {
	  		uid
		}
  	}	
`;