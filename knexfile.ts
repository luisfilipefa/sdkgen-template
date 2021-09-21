import { Knex } from "knex";

export default {
  client: "pg",
  connection: {
    host: "127.0.0.1",
    database: "postgres",
    user: "postgres",
    password: "postgres",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: `src/infra/migrations`,
    extension: "ts",
  },
} as Knex.Config;
