'use server';

import { auth } from '@clerk/nextjs/server';
import {
    ServerValidateError,
    createServerValidate,
} from '@tanstack/react-form/nextjs';
import { addPetOpts } from '../formOpts/addPetOpts';
import { createServerSupabaseClient } from '@/app/ssr/client';

const serverValidate = createServerValidate({
    ...addPetOpts,
    onServerValidate: ({ value }) => {
        if (value.name === '') {
            return 'Server validation: You must include a name'
        };
    },
});

export default async function addPetAction(prev: unknown, formData: FormData) {
    try {
        const validatedData = await serverValidate(formData);
        const client = createServerSupabaseClient();

        try {
            const { userId } = await auth();

            if (!userId) {
                throw new Error('You must be signed in to add a pet');
            }

            const response = await client.from('pets').insert({
                name: validatedData.name,
                age: validatedData.age,
                breed: validatedData.breed,
                type: validatedData.type,
                user_id: userId
            });
            
            if (response.status === 201) {
                console.log('Pet successfully added!', response);
            } else {
                console.error('Error adding pet: ', response);

                throw new Error('Failed to add pet');
            }
        } catch (error: any) {
            console.error('Error adding pet: ', error.message);

            throw new Error('Failed to add pet');
        }
    } catch (e) {
        if (e instanceof ServerValidateError) {
            return e.formState;
        }

        throw e
    }
};
