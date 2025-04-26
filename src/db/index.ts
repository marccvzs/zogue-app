import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

export const client = postgres(connectionString, { prepare: process.env.NODE_ENV === 'production' ? false : true });

export const db = drizzle(client); 