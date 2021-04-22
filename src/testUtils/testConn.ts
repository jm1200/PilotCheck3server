import { createConnection } from "typeorm";
import { User } from "../entities/User";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "testdbcompletepool",
    dropSchema: drop,
    synchronize: drop,
    entities: [User],
  });
};
