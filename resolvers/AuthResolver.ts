import { Arg, Mutation, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { UserModel } from "../entity/User";
import { AuthInput } from "../types/AuthInput";
import { UserResponse } from "../types/UserResponse";

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("input") { email, password }: AuthInput
  ): Promise<UserResponse> {
    // CHECK FOR AN EXISTING EMAIL
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    // CREATE A NEW USER WITH A HASHED PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword });
    await user.save();

    // STORE USER ID ON TOKEN PAYLOAD
    const payload = {
      id: user.id,
    };

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || "aslkdfjoiq12312"
    );

    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input") { email, password }: AuthInput
  ): Promise<UserResponse> {
    // CHECK FOR AN EXISTING EMAIL
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new Error("Invalid login");
    }

    // CHECK IF PASSWORD IS VALID
    const valid = await bcrypt.compare(password, existingUser.password);
    if (!valid) {
      throw new Error("Invalid Login");
    }

    // STORE USER ID ON TOKEN PAYLOAD
    const payload = {
      id: existingUser.id,
    };

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || "aslkdfjoiq12312"
    );

    return { user: existingUser, token };
  }
}
