import { BaseUser, User } from "../generated/generated";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private repository = new UserRepository();

  async create(user: BaseUser) {
    const userExists = await this.repository.findOneBy({ email: user.email });

    if (userExists) throw new Error("User already exists");

    const dbUser = await this.repository.insert(user);

    return dbUser;
  }

  async get(id: string) {
    return await this.repository.findOneBy({ id });
  }

  async update(id: string, user: BaseUser) {
    return await this.repository.update({ id, ...user });
  }

  async remove(id: string) {
    return await this.repository.delete(id);
  }
}
