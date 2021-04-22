import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "../resolvers/hello";
import { UserResolver } from "../resolvers/user";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [HelloResolver, UserResolver],
    validate: false,
  });
};
