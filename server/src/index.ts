import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

import User from './models/User';
import UserResolver from './resolvers/UserResolver';

dotenv.config();

const runServer = async () => {
  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    entities: [User],
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: true
  });
  console.log("Connected to database");

  const schema = await buildSchema({ resolvers: [UserResolver] });
  const server = new ApolloServer({ schema });

  // The `listen` method launches a web server.
  server.listen({ port: 3004 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

runServer();