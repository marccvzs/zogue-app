import {
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
  serial,
  primaryKey,
  boolean,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const petType = pgEnum("pet_type", [
  "dog",
  "cat",
  "bird",
  "rabbit",
  "other",
]);
export const eventType = pgEnum("event_type", ["adoption", "social", "other"]);

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  registeredAsFoster: boolean("registered_as_foster").default(false),
  contactable: boolean("contactable").default(false),
  imageUrl: text("image_url"),
  associated_user_id: text("associated_user_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define the pets table
export const petsTable = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  petType: petType("pet_type").notNull(),
  breed: varchar("breed", { length: 100 }),
  gender: varchar("gender", { length: 20 }),
  birthDate: date("birth_date"),
  age: integer("age"),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const fostersTable = pgTable("fosters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  breed: varchar("breed", { length: 20 }),
  size: varchar("size", { length: 10 }),
  status: varchar("status", { length: 15 }),
  organization: varchar("org", { length: 100 }),
  age: integer("age"),
  userId: text("user_id").references(() => usersTable.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define the relationships
export const usersRelations = relations(usersTable, ({ one, many }) => ({
  pets: many(petsTable),
  fosters: many(fostersTable),
  usersToEvents: many(usersToEvents),
  usersToOrgs: many(usersToOrgs),
  associatedUser: one(usersTable, {
    fields: [usersTable.associated_user_id], 
    references: [usersTable.id]
  })
}));

export const petsRelations = relations(petsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [petsTable.userId],
    references: [usersTable.id],
  }),
}));

export const fostersRelations = relations(fostersTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [fostersTable.userId],
    references: [usersTable.id],
  }),
}));

export const eventsTable = pgTable("events", {
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

export const usersToEvents = pgTable(
  "users_to_events",
  {
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id),
    eventId: integer("event_id")
      .notNull()
      .references(() => eventsTable.id),
  },
  (t) => [primaryKey({ columns: [t.userId, t.eventId] })]
);

export const usersToEventsRelations = relations(usersToEvents, ({ one }) => ({
  event: one(eventsTable, {
    fields: [usersToEvents.eventId],
    references: [eventsTable.id],
  }),
  user: one(usersTable, {
    fields: [usersToEvents.userId],
    references: [usersTable.id],
  }),
}));

export const orgsTable = pgTable("organizations", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }),
  slug: varchar("slug", { length: 25 }),
  logo: varchar("logo", { length: 100 }),
});

export const orgsRelations = relations(orgsTable, ({ many }) => ({
  userToOrgs: many(usersToOrgs),
}));

export const usersToOrgs = pgTable(
  "users_to_orgs",
  {
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id),
    orgId: text("org_id")
      .notNull()
      .references(() => orgsTable.id),
  },
  (t) => [primaryKey({ columns: [t.userId, t.orgId] })]
);

export const usersToOrgsRelations = relations(usersToOrgs, ({ one }) => ({
  org: one(orgsTable, {
    fields: [usersToOrgs.orgId],
    references: [orgsTable.id],
  }),
  user: one(usersTable, {
    fields: [usersToOrgs.userId],
    references: [usersTable.id],
  }),
}));

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPet = typeof petsTable.$inferInsert;
export type SelectPet = typeof petsTable.$inferSelect;

export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;

export type InsertOrg = typeof orgsTable.$inferInsert;
export type SelectOrg = typeof orgsTable.$inferSelect;
