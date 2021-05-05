import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { Data } from "../entities/Data";
import { User } from "../entities/User";
import { MyContext } from "../types";

//   @ObjectType()
//   class FieldError {
//     @Field()
//     field: string;
//     @Field()
//     message: string;
//   }

//   @ObjectType()
//   export class UserResponse {
//     @Field(() => [FieldError], { nullable: true })
//     errors?: FieldError[];

//     @Field(() => User, { nullable: true })
//     user?: User;
//   }

@Resolver()
export class DataResolver extends BaseEntity {
  @Query(() => Data, { nullable: true })
  async userData(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await User.findOne(req.session.userId, {
      relations: ["data"],
    });

    console.log("data.ts", user);

    return user?.data;
  }

  @Mutation(() => Data)
  async setData(
    @Arg("directories") directories: string,
    @Ctx() { req }: MyContext
  ): Promise<Data | null> {
    let userId = req.session.userId;

    if (!userId) {
      return null;
    }
    try {
      const user = await User.findOne(userId, { relations: ["data"] });
      if (user) {
        let dataId = user.dataId;

        await Data.update(dataId, { directories });

        return user.data;
      }

      return null;
    } catch (error) {
      console.log("error setting data", error);
      return null;
    }
  }

  // @Mutation(() => UserResponse)
  // async register(
  //   @Arg("options") options: EmailPasswordInput,
  //   @Ctx() ctx: MyContext
  // ): Promise<UserResponse> {
  //   const errors = validateRegister(options);
  //   if (errors) {
  //     return { errors };
  //   }

  //   const hashedPassword = await argon2.hash(options.password);

  //   let user;

  //   try {
  //     user = User.create({
  //       email: options.email,
  //       password: hashedPassword,
  //     });

  //     await user.save();
  //   } catch (err) {
  //     if (err.code === "23505") {
  //       return {
  //         errors: [
  //           {
  //             field: "email",
  //             message: "email already exists",
  //           },
  //         ],
  //       };
  //     } else {
  //       console.log("Register user error: ", err);
  //       return {
  //         errors: [
  //           {
  //             field: "email",
  //             message: "Error registering user. Please contact Administrator.",
  //           },
  //         ],
  //       };
  //     }
  //   }

  //   ctx.req.session.userId = user.id;
  //   return { user };
  // }
  // @Mutation(() => UserResponse)
  // async login(
  //   @Arg("email") email: string,
  //   @Arg("password") password: string,
  //   @Ctx() { req }: MyContext
  // ): Promise<UserResponse> {
  //   const user = await User.findOne({ where: { email: email } });

  //   if (!user) {
  //     return {
  //       errors: [
  //         {
  //           field: "email",
  //           message: "that email doesn't exist",
  //         },
  //       ],
  //     };
  //   }
  //   const valid = await argon2.verify(user.password, password);
  //   if (!valid) {
  //     return {
  //       errors: [
  //         {
  //           field: "password",
  //           message: "incorrect password",
  //         },
  //       ],
  //     };
  //   }

  //   req.session.userId = user.id;

  //   return {
  //     user,
  //   };
  // }

  // @Mutation(() => Boolean)
  // logout(@Ctx() { req, res }: MyContext) {
  //   return new Promise((resolve) =>
  //     req.session.destroy((err) => {
  //       res.clearCookie(COOKIE_NAME);
  //       if (err) {
  //         console.log(err);
  //         resolve(false);
  //         return;
  //       }

  //       resolve(true);
  //     })
  //   );
  // }
}
