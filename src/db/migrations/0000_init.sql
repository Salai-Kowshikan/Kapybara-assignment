CREATE TABLE "projects" (
	"projectId" varchar PRIMARY KEY NOT NULL,
	"projectName" varchar NOT NULL,
	"projectDesc" varchar NOT NULL,
	"userId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"taskId" varchar PRIMARY KEY NOT NULL,
	"taskName" varchar NOT NULL,
	"projectId" varchar NOT NULL,
	"userId" varchar NOT NULL,
	"dueDate" date NOT NULL,
	"priority" smallint NOT NULL,
	"status" smallint NOT NULL,
	"taskDesc" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"userId" varchar PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_projectId_projects_projectId_fk" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("projectId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE no action ON UPDATE no action;