import { ApolloServer } from 'apollo-server-express'; 
import { getConnection, createConnection, getManager } from 'typeorm';
import getApolloServer from '../apollo-server';
import getDatabaseConnection from '../database-connection';
import User from '../models/User';
import Issue from '../models/Issue'; 
import Organization from '../models/Organization';
import Project from '../models/Project';
import Color from '../models/Color';
import Comment from '../models/Comment';
import File from '../models/File';
import Session from '../models/Session';
import Image from '../models/Image';

jest.setTimeout(10000)

describe("UserResolver", () => {
	let server: ApolloServer;

	beforeAll(async () => {
		server = await getApolloServer();

		return createConnection({
			type: "postgres",
			url: "postgres://postgres:database_password@database:5432/test",
			synchronize: true,
			logging: true,
			entities:  [User, Organization, Project, Issue, Color, Comment, File, Session, Image],
		});
	});

	/*beforeEach(async () => {
		const entities = getConnection().entityMetadatas;

		// eslint-disable-next-line no-restricted-syntax
		for (const entity of entities) {
		  const repository = getConnection().getRepository(entity.name);
		  console.log(repository)
		  await repository.query(
			`DROP`
		  );
		}
	});*/
	
	afterAll(() => getConnection().close());

	describe("query users", () => {

		const GET_USERS = `
		query getUsers {
			users { 
				id
				first_name
				last_name
				roles
				email
				created_at
				project_assigned { 
					id
					name
					description
					created_at
				}
			}
		}`; 

		/*describe("when there are no wilders in database", () => {
			it("returns empty array", async () => {

				const result = await server.executeOperation({
					query: GET_USERS, 
				});
				expect(result.errors).toBeUndefined();
				expect(result.data?.users).toStrictEqual([]);
			});
		});*/
		
		describe("when there are wilders in database", () => {
			it("returns all wilders in database", async () => {
			const user1 = new User();
			user1.first_name = "Dark";
			user1.last_name = "Vador";
			user1.email = 'dark.vador@darkside.com';
			user1.password = 'root'
			user1.roles = 'admin';
			user1.created_at = "2016-07-20T17:30:15+05:30";
			await user1.save();
	
			const user2 = new User();
			user2.first_name = "Lord";
			user2.last_name = "Sauron";
			user2.email = 'lord.sauron@mordor.com';
			user2.password = 'root'
			user2.roles = 'admin';
			user2.created_at = "2016-06-20T17:30:15+05:30";
			await user2.save();
	
			const result = await server.executeOperation({
				query: GET_USERS,
			});
			expect(result.errors).toBeUndefined();
			console.log(result.data?.users)
			expect(result.data?.users).toMatchInlineSnapshot(`
				Array [
				Object {
					"id": "1",
					"first_name": "Dark",
					"last_name": "Vador",
					"email": "dark.vador@darkside.com",
					"roles": "admin",
					"password": "root,
					"project_assigned": Array [],
				},
				Object {
					"id": "2",
					"first_name": "Lord",
					"last_name": "Sauron",
					"email": "lord.sauron@mordor.com",
					"roles": "admin",
					"password": "root,
					"project_assigned": Array [],
				},
				]
			`);
			});
		});
		});
	});


/*
describe('UserResolver', () => {
	let server: ApolloServer;

	beforeAll(async () => {
		server = await getApolloServer();
	});

	beforeEach(() => {
		if (!process.env.DATABASE_URL) {
			throw Error('DATABASE_URL must be set in environment.');
		}

		getDatabaseConnection(process.env.DATABASE_URL);
	});

	afterEach(() => getConnection().close());

	describe('query users', () => {
		const getUsers = `
        query getUsers {
			users {
				id
				first_name
				last_name
				roles
				email
				created_at
				project_assigned {
					id
					name
					description
					created_at
				}
			}
		}`;

		describe('when there are no users in database', () => {
			it('returns empty array', async () => {
				const result = await server.executeOperation({
					query: getUsers,
				});
				expect(result.errors).toBeUndefined();
				expect(result.data?.wilders).toEqual([]);
			});
		});

		// describe('CreateUser', () => {
		//     const createUserData = `
		//         mutation($first_name: String!, $last_name: String!, $roles: String!, $email: String!, $password: String!, $color_id: String!, $organization_id: String!, $created_at: String!) {
		//             createUser(first_name: $first_name, last_name: $last_name, roles: $roles, email: $email, password: $password, color_id: $color_id, organization_id: $organization_id, created_at: $created_at) {
		//                 id
		//                 first_name
		//                 last_name
		//                 roles
		//                 email
		//                 password
		//                 color_id
		//                 organization_id
		//                 created_at
		//             }
		//         }`;

		//     it('create a use in database', async () => {
		//         const result = await server.executeOperation({
		//             query: createUserData,
		//             variables: {
		//                 first_name: "Gros",
		//                 last_name: "Tony",
		//                 roles: `['ROLE_USER']`,
		//                 email: 'azerty@poiuy.com',
		//                 password: 'root',
		//                 color_id: '9',
		//                 organization_id: '9',
		//                 created_at: "2016-07-20T17:30:15+05:30"
		//             },
		//         });

		// console.log(result);

		// expect(await User.findOne({ first_name: "Gros" })).toHaveProperty(
		//     "last_name",
		//     "Tony"
		// );

		// expect(result.errors).toBeUndefined();
		// expect(result.data?.createUserData).toEqual({
		//     first_name: "Gros",
		//     last_name: "Tony",
		//     roles: `['ROLE_USER']`,
		//     email: 'azerty@poiuy.com',
		//     password: 'root',
		//     color_id: 9,
		//     created_at: "2016-07-20T17:30:15+05:30"
		// })
		//     })
	});
})*/;
