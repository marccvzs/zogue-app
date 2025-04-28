import {
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
  serial,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  registeredAsFoster: boolean("registered_as_foster"),
  contactable: boolean("contactable"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define the pets table
export const petsTable = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(), // e.g., 'dog', 'cat', etc.
  breed: varchar("breed", { length: 100 }),
  gender: varchar("gender", { length: 20 }),
  birthDate: timestamp("birth_date"),
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
  userId: text("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

// Define the relationships
export const usersRelations = relations(usersTable, ({ many }) => ({
  pets: many(petsTable),
  fosters: many(fostersTable)
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
  eventType: varchar("event_type", { length: 255 }).notNull(),
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

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPet = typeof petsTable.$inferInsert;
export type SelectPet = typeof petsTable.$inferSelect;

export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;
