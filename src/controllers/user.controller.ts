import { api } from "../generated/api";
import { UserService } from "../services/user.service";

const userService = new UserService();

api.fn.createUser = async (_, { values }) => {
  return userService.create(values);
};

api.fn.getUser = async (_, { id }) => {
  return userService.get(id);
};

api.fn.updatedUser = async (_, { id, values }) => {
  return userService.update(id, values);
};

api.fn.removeUser = async (_, { id }) => {
  return userService.remove(id);
};
