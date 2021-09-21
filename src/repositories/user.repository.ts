import knex from "../config/knex";
import { DBUser } from "../types/db";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<DBUser> {
  constructor() {
    super(knex, "users");
  }
}
