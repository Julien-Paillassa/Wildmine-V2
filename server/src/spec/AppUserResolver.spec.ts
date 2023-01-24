import { ApolloServer } from 'apollo-server-express'; 
import { getConnection } from 'typeorm';
import getServer from '../apollo-server';
import getDatabaseConnection from '../database-connection';
import User from '../models/User';


describe("UserResolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await getServer();

    if (!process.env.TEST_DATABASE_URL) {
      throw Error("TEST_DATABASE_URL must be set in environment.");
    }

    return getDatabaseConnection(process.env.TEST_DATABASE_URL);
  });
  beforeEach(async () => {
    const entities = getConnection().entityMetadatas;
    // eslint-disable-next-line no-restricted-syntax
    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name);
      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`
      );
    }
  });
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

    describe("when there are no users in database", () => {
      it("returns empty array", async () => {
        const result = await server.executeOperation({
          query: GET_USERS,
        });
        expect(result.errors).toBeUndefined();
        expect(result.data?.users).toEqual([]);
      });
    });

    describe("when there are users in database", () => {
      it("returns all users in database", async () => {
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

  describe("mutation createUser", () => {
    const CREATE_USER = `
    mutation createUser($firstName: String!, $lastName: String!, $roles: String!, $email: String!, $password: String!, $createdAt: String!) {
		createUser(first_name: $firstName, last_name: $lastName, roles: $roles, email: $email, password: $password, created_at: $createdAt) {
			id
			first_name
			last_name
			roles
			email
			created_at
		}
	}
    `;

    it("creates and returns user", async () => {
      const result = await server.executeOperation({
        query: CREATE_USER,
        variables: {
            first_name: "Lord",
            last_name: "Voldemort",
            roles: "admin",
            email: "lord.voldemor@askaban.com",
            password: "invalide",
            created_at: "2016-06-20T17:30:15+05:30"
        },
      });

      expect(await User.findOne({ last_name: "Lord" })).toHaveProperty(
        "Voldemort",
      );

      expect(result.errors).toBeUndefined();
      expect(result.data?.createUser).toEqual({
        id: "1",
        first_name: "Lord",
        last_name: "Voldemort",
        roles: "admin",
        email: "lord.voldemor@askaban.com",
        password: "invalide",
        created_at: "2016-06-20T17:30:15+05:30"
      });
    });
  });

  describe("mutation updateUser", () => {
    const UPDATE_USER = `
    mutation updateUser($id: Float!, $firstName: String!, $lastName: String!, $roles: String!, $email: String!) {
		updateUser(id: $id, first_name: $firstName, last_name: $lastName, roles: $roles, email: $email) {
			id
			first_name
			last_name
			roles
			email
		}
	}
    `;

    const newFirstName = "Anakin";
    const newLastName = "Skywalker";

    describe("when id does not match existing user", () => {
      it("returns error", async () => {
        const result = await server.executeOperation({
          query: UPDATE_USER,
          variables: {
            id: 1,
            first_name: newFirstName,
            last_name: newLastName,
          },
        });

        expect(result.data).toBeNull();
        expect(result.errors).toMatchInlineSnapshot(`
          Array [
            [GraphQLError: Could not find any entity of type "User" matching: {
              "id": 1
          }],
          ]
        `);
      });
    });

    describe("when id matches existing user", () => {
      it("updates and returns user", async () => {
        const user = new User();
        user.first_name = "Dark";
        user.last_name = "Vador";
        user.email = 'dark.vador@darkside.com';
        user.password = 'root'
        user.roles = 'admin';
        user.created_at = "2016-07-20T17:30:15+05:30";
        await user.save();

        const result = await server.executeOperation({
          query: UPDATE_USER,
          variables: {
            id: user.id,
            first_name: newFirstName,
            last_name: newLastName,
          },
        });

        const userInDatabase = await User.findOne({ id: user.id });
        expect(userInDatabase?.first_name).toEqual(newFirstName);
        expect(userInDatabase?.last_name).toEqual(newLastName);

        expect(result.errors).toBeUndefined();
        expect(result.data?.updateuser).toEqual({
            id: user.id.toString(),
            first_name: newFirstName,
            last_name: newLastName,
      });
    });
  });
})
});