'use server';
import { createServerSupabaseClient } from './client';

export async function addTask(name: string) {
    const client = createServerSupabaseClient();

    try {
        const response = await client.from('pets').insert({
            name,
        })

        console.log('Pet successfully added!', response);
    } catch (error: any) {
        console.error('Error adding pet: ', error.message);
        throw new Error('Failed to add pet');
    }
};
