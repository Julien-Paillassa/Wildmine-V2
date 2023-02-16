import { ApolloServer } from "apollo-server-express";
import { AuthChecker, buildSchema } from "type-graphql";
import User from "./models/User";
import SessionUtils from "./models/utils/SessionUtils";
import FileResolver from "./resolvers/FileResolver";
import IssueResolver from "./resolvers/IssueResolver";
import ProjectResolver from "./resolvers/ProjectResolver";
import SessionResolver from "./resolvers/SessionResolver";
import UserResolver from "./resolvers/UserResolver";
import ImageResolver from "./resolvers/ImageResolver";

export interface Context {
  sessionId: string;
  user: User | null;
}

export const customAuthChecker: AuthChecker<Context> = ({ context }) => {
  return Boolean(context.user);
};

export default async function getServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver, SessionResolver, ProjectResolver, FileResolver, ImageResolver, IssueResolver],
    authChecker: customAuthChecker,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }): Promise<Context> => {
      const sessionId = req.cookies.sessionId || "";
      const user = await SessionUtils.userInfo({ sessionId }) || null;

      return { sessionId, user };
    },
  });
  return apolloServer;
}
