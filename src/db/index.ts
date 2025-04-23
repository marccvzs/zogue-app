import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

export const client = postgres(connectionString, { 
    prepare: false,
    ssl: process.env.NODE_ENV === 'production' // Only use SSL in production
});

export const db = drizzle(client); 