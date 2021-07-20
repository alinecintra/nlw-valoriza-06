import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email,
    })

    if (!user) {
      throw new Error("E-mail/Password incorrect! ")
    }

    if (!password) {
      throw new Error("Incorrect password! ")
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("E-mail/Password incorrect! ")
    }

    const token = sign({
      email: user.email
    }, "5105377ab78a49f7d09ed8d0227b2d76", {
      subject: user.id,
      expiresIn: "1d"
    }
    );

    return token;
  }
}

export { AuthenticateUserService };