import { Connection } from "typeorm";
import { gCall } from "../../testUtils/gCall";
import { testConn } from "../../testUtils/testConn";
import faker from "faker";
import { User } from "../../entities/User";
import { UserResponse } from "../../resolvers/user";
import { registerMutation } from "../../queryStrings";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

describe("Register", () => {
  it("create user", async () => {
    let user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const result = await gCall({
      source: registerMutation,
      variableValues: {
        options: user,
      },
    });

    let res = result.data!.register as UserResponse;

    expect(res.user?.email).toBe(user.email);

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.email).toBe(user.email);
  });

  it("test invalid email", async () => {
    let user = {
      email: "bob",
      password: "bob",
    };
    const result = await gCall({
      source: registerMutation,
      variableValues: {
        options: user,
      },
    });

    let res = result.data!.register as UserResponse;

    expect(res.errors).toMatchObject([
      {
        field: "email",
        message: "invalid email",
      },
    ]);
  });

  it("test too short password", async () => {
    let user = {
      email: "bob@bob.com",
      password: "bo",
    };
    const result = await gCall({
      source: registerMutation,
      variableValues: {
        options: user,
      },
    });

    let res = result.data!.register as UserResponse;

    expect(res.errors).toMatchObject([
      {
        field: "password",
        message: "length must be greater than 2",
      },
    ]);
  });
});
