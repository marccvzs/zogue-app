import { pgTable, text, timestamp, varchar, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    clerkId: text('clerk_id').notNull().unique(), // Clerk user ID
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
    name: varchar('name', { length: 255 }).notNull(),
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
    location: varchar('location', { length: 255 }).notNull(),
    eventType: varchar('event_type', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
