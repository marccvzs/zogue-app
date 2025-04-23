import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
    id: text('id').primaryKey(), // Clerk user ID
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    imageUrl: text('image_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
