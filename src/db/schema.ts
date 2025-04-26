import { pgTable, text, timestamp, varchar, integer, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
    id: text('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    imageUrl: text('image_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Define the pets table
export const petsTable = pgTable('pets', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    type: varchar('type', { length: 100 }).notNull(), // e.g., 'dog', 'cat', etc.
    breed: varchar('breed', { length: 100 }),
    birthDate: timestamp('birth_date'),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Define the relationships
export const usersRelations = relations(usersTable, ({ many }) => ({
    pets: many(petsTable),
}));

export const petsRelations = relations(petsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [petsTable.userId],
        references: [usersTable.id],
    }),
}));

export const eventsTable = pgTable('events', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    venue: varchar('venue', { length: 255 }),
    address: varchar('location', { length: 255 }).notNull(),
    city: varchar('city', { length: 50 }),
    state: varchar('state', { length: 25 }),
    zipCode: integer('zip_code').notNull(),
    eventType: varchar('event_type', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPet = typeof petsTable.$inferInsert;
export type SelectPet = typeof petsTable.$inferSelect;

export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;