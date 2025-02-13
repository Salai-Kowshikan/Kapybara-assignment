import { pgTable, integer, varchar } from "drizzle-orm/pg-core"

export const users = pgTable('users', {
  username: varchar().notNull(),
  email: varchar().primaryKey().notNull(),
  password: varchar().notNull(),
});
