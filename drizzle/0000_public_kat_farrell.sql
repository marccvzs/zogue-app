CREATE SCHEMA IF NOT EXISTS "api";
--> statement-breakpoint
CREATE TABLE "api"."calendar" (
	"id" serial PRIMARY KEY NOT NULL,
	"date_of" date NOT NULL,
	"time" time NOT NULL,
	"text" text NOT NULL,
	"location" varchar(100),
	"user_id" text NOT NULL,
	"associated_user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api"."events" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"venue" varchar(255),
	"location" varchar(255) NOT NULL,
	"city" varchar(50),
	"state" varchar(25),
	"zip_code" integer NOT NULL,
	"event_type" "api"."event_type",
	"logo" text,
	"images" text DEFAULT '{}'::text[],
	"description" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api"."fosters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" varchar(100) NOT NULL,
	"breed" varchar(20),
	"size" varchar(10),
	"status" varchar(15),
	"org" varchar(100),
	"age" integer,
	"user_id" text,
	"associated_user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api"."organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" varchar(50),
	"slug" varchar(25),
	"logo" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "api"."pets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"pet_type" "api"."pet_type" NOT NULL,
	"breed" varchar(100),
	"gender" varchar(20),
	"birth_date" date,
	"age" integer,
	"user_id" text NOT NULL,
	"associated_user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api"."users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"registered_as_foster" boolean DEFAULT false,
	"contactable" boolean DEFAULT false,
	"image_url" text,
	"associated_user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_associated_user_id_unique" UNIQUE("associated_user_id")
);
--> statement-breakpoint
CREATE TABLE "api"."users_to_events" (
	"user_id" text NOT NULL,
	"event_id" integer NOT NULL,
	CONSTRAINT "users_to_events_user_id_event_id_pk" PRIMARY KEY("user_id","event_id")
);
--> statement-breakpoint
CREATE TABLE "api"."users_to_orgs" (
	"user_id" text NOT NULL,
	"org_id" text NOT NULL,
	CONSTRAINT "users_to_orgs_user_id_org_id_pk" PRIMARY KEY("user_id","org_id")
);
--> statement-breakpoint
ALTER TABLE "api"."calendar" ADD CONSTRAINT "calendar_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "api"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api"."calendar" ADD CONSTRAINT "calendar_associated_user_id_users_associated_user_id_fk" FOREIGN KEY ("associated_user_id") REFERENCES "api"."users"("associated_user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api"."fosters" ADD CONSTRAINT "fosters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "api"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api"."fosters" ADD CONSTRAINT "fosters_associated_user_id_users_associated_user_id_fk" FOREIGN KEY ("associated_user_id") REFERENCES "api"."users"("associated_user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api"."pets" ADD CONSTRAINT "pets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "api"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api"."pets" ADD CONSTRAINT "pets_associated_user_id_users_associated_user_id_fk" FOREIGN KEY ("associated_user_id") REFERENCES "api"."users"("associated_user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api"."users_to_events" ADD CONSTRAINT "users_to_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "api"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api"."users_to_events" ADD CONSTRAINT "users_to_events_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "api"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api"."users_to_orgs" ADD CONSTRAINT "users_to_orgs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "api"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api"."users_to_orgs" ADD CONSTRAINT "users_to_orgs_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "api"."organizations"("id") ON DELETE no action ON UPDATE no action;