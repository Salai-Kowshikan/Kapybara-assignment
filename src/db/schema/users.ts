import { date, pgTable, smallint, varchar } from "drizzle-orm/pg-core"

export const users = pgTable('users', {
  userId: varchar().primaryKey().notNull(),
  username: varchar().notNull(),
  email: varchar().unique().notNull(),
  password: varchar().notNull(),
});

export const projects = pgTable('projects', {
  projectId: varchar().primaryKey().notNull(),
  projectName: varchar().notNull(),
  projectDesc: varchar().notNull(),
  userId: varchar().notNull().references(() => users.userId),
});

export const tasks = pgTable('tasks', {
  taskId: varchar().primaryKey().notNull(),
  taskName: varchar().notNull(),
  projectId: varchar().notNull().references(() => projects.projectId),
  userId: varchar().notNull().references(() => users.userId),
  dueDate: date().notNull(),
  priority: smallint().notNull(),
  status: smallint().notNull(),
  taskDesc: varchar().notNull(),
});
