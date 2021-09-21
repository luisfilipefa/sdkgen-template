import { Knex } from "knex";
import { v4 } from "uuid";

interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

type Insert<T extends BaseModel> = Omit<T, "id" | "createdAt" | "updatedAt"> & {
  id?: T["id"];
};
type Filter<T extends BaseModel> = Partial<Omit<T, "createdAt" | "updatedAt">>;
type Update<T extends BaseModel> = Filter<T> & { id: T["id"] };

export class BaseRepository<T extends BaseModel> {
  constructor(
    private readonly knex: Knex,
    private readonly tableName: string
  ) {}

  async insert(item: Insert<T>) {
    const now = new Date();

    const [result] = (await this.knex(this.tableName)
      .insert({
        id: v4(),
        createdAt: now,
        updatedAt: now,
        ...item,
      })
      .returning("*")) as T[];

    return result;
  }

  async findOneBy(
    condition: Filter<T> | ((qb: Knex.QueryBuilder<T>) => unknown) = {}
  ) {
    const item = (await this.knex<T>(this.tableName)
      .select()
      .where(condition)
      .first()) as T;

    if (!item) throw new Error("Not found");

    return item;
  }

  async findBy(
    condition: Filter<T> | ((qb: Knex.QueryBuilder<T>) => unknown) = {}
  ) {
    return (await this.knex<T>(this.tableName)
      .select()
      .where(condition)) as T[];
  }

  async update(item: Update<T>) {
    const [updatedItem] = (await this.knex(this.tableName)
      .where({ id: item.id })
      .update({
        ...item,
        updatedAt: new Date(),
      })
      .returning("*")) as T[];

    if (!updatedItem) throw new Error("Not found");

    return updatedItem;
  }

  async delete(id: T["id"]) {
    const [deleted] = (await this.knex(this.tableName)
      .where({ id })
      .delete()
      .returning("*")) as T[];

    if (!deleted) throw new Error("Not found");

    return deleted;
  }
}
