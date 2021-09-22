import { hashSync } from "bcrypt";
import { BaseUser, BaseUserWithoutAuth, User } from "../generated/generated";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private repository = new UserRepository();

  async create(user: BaseUser) {
    const userExists = await this.repository.findOneBy({ email: user.email });

    if (userExists) throw new Error("User already exists");

    return await this.repository.insert({
      ...user,
      password: hashSync(user.password, 8),
    });
  }

  async get(id: string) {
    const user = await this.repository.findOneBy({ id });

    if (!user) throw new Error("User not found");

    return user;
  }

  async update(id: string, user: BaseUserWithoutAuth) {
    const userExists = await this.repository.findOneBy({ id });

    if (!userExists) throw new Error("User not found");

    return await this.repository.update({ id, ...user });
  }

  async remove(id: string) {
    const user = await this.repository.findOneBy({ id });

    if (!user) throw new Error("User not found");

    return await this.repository.delete(id);
  }
}
