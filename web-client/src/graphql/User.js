import gql from 'graphql-tag';

export const getUser = gql`
	query getUsers {
		users {
			id
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
		}
	}
`;

export const setUser = gql`
	mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $createdAt: String!) {
		createUser(first_name: $firstName, last_name: $lastName, email: $email, password: $password, created_at: $createdAt) {
			id
			first_name
			last_name
			email
			created_at
		}
	}
`;

export const updateUser = gql`
	mutation updateUser($id: Float!, $firstName: String!, $lastName: String!, $email: String!) {
		updateUser(id: $id, first_name: $firstName, last_name: $lastName, email: $email) {
			id
			first_name
			last_name
			email
		}
	}
`;

export const getUserByEmail = gql`
	query getUserByEmail($email: String!) {
		getUserByEmail(email: $email) {
			id
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

