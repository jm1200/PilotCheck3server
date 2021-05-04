import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { DataResolver } from "../resolvers/data";
import { HelloResolver } from "../resolvers/hello";
import { UserResolver } from "../resolvers/user";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [HelloResolver, UserResolver, DataResolver],

    validate: false,
  });
};
