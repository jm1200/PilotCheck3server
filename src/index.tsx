import "reflect-metadata";
import "dotenv-safe/config";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { COOKIE_NAME, __prod__ } from "./utils/constants";
import { createSchema } from "./utils/createSchema";
import { Data } from "./entities/Data";

const main = async () => {
  console.log("test test test");
  const conn = createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [User, Data],
  });

  // (await conn).createQueryBuilder().delete().from(User).execute();

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? ".domainnamegoeshere" : undefined,
      },
      saveUninitialized: false,
      secret: "asdkfhjalkjshflakjdhfasdfas",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }) => {
      console.log("index.tsx 62 req:", req.protocol);
      return { req, res };
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log("Error starting server, ", err);
});
