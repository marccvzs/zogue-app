import {
  text,
  timestamp,
  varchar,
  integer,
  serial,
  primaryKey,
  boolean,
  date,
  time,
  pgSchema,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const api = pgSchema("api");

export const petType = api.enum("pet_type", [
  "dog",
  "cat",
  "bird",
  "rabbit",
  "other",
]);

export const eventType = api.enum("event_type", [
  "adoption",
  "social",
  "other",
]);

export const apptType = api.enum("appt_type", [
  "vet",
  "social",
  "other"
])

export const users = api.table("users", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  registeredAsFoster: boolean("registered_as_foster").default(false),
  contactable: boolean("contactable").default(false),
  imageUrl: text("image_url"),
  associated_user_id: text("associated_user_id").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define the pets table
export const pets = api.table("pets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  petType: petType("pet_type").notNull(),
  breed: varchar("breed", { length: 100 }),
  gender: varchar("gender", { length: 20 }),
  birthDate: date("birth_date"),
  age: integer("age"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  associatedUserId: text("associated_user_id").references(
    () => users.associated_user_id,
    { onDelete: "cascade" }
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const fosters = api.table("fosters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  breed: varchar("breed", { length: 20 }),
  size: varchar("size", { length: 10 }),
  status: varchar("status", { length: 15 }),
  organization: varchar("org", { length: 100 }),
  age: integer("age"),
  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  associatedUser: text("associated_user_id").references(
    () => users.associated_user_id,
    { onDelete: "cascade" }
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define the relationships
export const usersRelations = relations(users, ({ one, many }) => ({
  pets: many(pets),
  fosters: many(fosters),
  usersToEvents: many(usersToEvents),
  usersToOrgs: many(usersToOrgs),
  associatedUser: one(users, {
    fields: [users.associated_user_id],
    references: [users.id],
  }),
  calendar: many(calendar),
}));

export const petsRelations = relations(pets, ({ one }) => ({
  user: one(users, {
    fields: [pets.userId],
    references: [users.id],
  }),
  associatedUser: one(users, {
    fields: [pets.associatedUserId],
    references: [users.associated_user_id],
  }),
}));

export const fostersRelations = relations(fosters, ({ one }) => ({
  user: one(users, {
    fields: [fosters.userId],
    references: [users.id],
  }),
  associatedUser: one(users, {
    fields: [fosters.associatedUser],
    references: [users.associated_user_id],
  }),
}));

export const events = api.table("events", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  venue: varchar("venue", { length: 255 }),
  address: varchar("location", { length: 255 }).notNull(),
  city: varchar("city", { length: 50 }),
  state: varchar("state", { length: 25 }),
  zipCode: integer("zip_code").notNull(),
  eventType: eventType("event_type"),
  logo: text("logo"),
  images: text("images").default(sql`'{}'::text[]`),
  description: varchar("description", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersToEvents = api.table(
  "users_to_events",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id),
  },
  (t) => [primaryKey({ columns: [t.userId, t.eventId] })]
);

export const usersToEventsRelations = relations(usersToEvents, ({ one }) => ({
  event: one(events, {
    fields: [usersToEvents.eventId],
    references: [events.id],
  }),
  user: one(users, {
    fields: [usersToEvents.userId],
    references: [users.id],
  }),
}));

export const orgs = api.table("organizations", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }),
  slug: varchar("slug", { length: 25 }),
  logo: varchar("logo", { length: 100 }),
});

export const orgsRelations = relations(orgs, ({ many }) => ({
  userToOrgs: many(usersToOrgs),
}));

export const usersToOrgs = api.table(
  "users_to_orgs",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    orgId: text("org_id")
      .notNull()
      .references(() => orgs.id),
  },
  (t) => [primaryKey({ columns: [t.userId, t.orgId] })]
);

export const usersToOrgsRelations = relations(usersToOrgs, ({ one }) => ({
  org: one(orgs, {
    fields: [usersToOrgs.orgId],
    references: [orgs.id],
  }),
  user: one(users, {
    fields: [usersToOrgs.userId],
    references: [users.id],
  }),
}));

export const calendar = api.table("calendar", {
  id: serial("id").primaryKey(),
  dateOf: date("date_of").notNull(),
  time: time("time").notNull(),
  title: text("title").notNull(),
  location: varchar("location", { length: 100 }),
  apptType: apptType('appt_type').default("vet"),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  associatedUser: text("associated_user_id").references(
    () => users.associated_user_id,
    { onDelete: "cascade" }
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const calendarRelations = relations(calendar, ({ one }) => ({
  user: one(users, {
    fields: [calendar.user_id],
    references: [users.id],
  }),
  associatedUser: one(users, {
    fields: [calendar.associatedUser],
    references: [users.associated_user_id],
  }),
}));

export const petImages = api.table('pet_images', {
  id: serial('id').primaryKey(),
  url: text('image_url').notNull(),
  user_id: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  pet_id: integer('pet_id').references(() => pets.id, { onDelete: 'cascade' })
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertPet = typeof pets.$inferInsert;
export type SelectPet = typeof pets.$inferSelect;

export type InsertFoster = typeof fosters.$inferInsert;
export type SelectFoster = typeof fosters.$inferSelect;

export type InsertEvent = typeof events.$inferInsert;
export type SelectEvent = typeof events.$inferSelect;

export type InsertOrg = typeof orgs.$inferInsert;
export type SelectOrg = typeof orgs.$inferSelect;

export type InsertCalendar = typeof calendar.$inferInsert;
export type SelectCalendar = typeof calendar.$inferSelect;
