'use server';

import { auth } from '@clerk/nextjs/server';
import { ServerValidateError, createServerValidate } from '@tanstack/react-form/nextjs';
import { addCalendarEventOpts } from '../formOpts/addCalendarEventOpts';
import { createServerSupabaseClient } from '@/app/ssr/client';

const serverValidate = createServerValidate({
    ...addCalendarEventOpts,
    onServerValidate: ({ value }) => {
        if (value.title === '') {
            return 'Server validation: You must include a title'
        };
    },
});

export default async function addCalendarEventAction(prev: unknown, formData: FormData, selectedDate: Date) {
    try {
        const validatedData = await serverValidate(formData);
        
        const client = createServerSupabaseClient();

        try {
            const { userId } = await auth();

            if (!userId) {
                throw new Error('You must be signed in to add a calendar event');
            }

            const response = await client.from('calendar').insert({
                date_of: selectedDate,
                time: validatedData.time,
                title: validatedData.title,
                location: validatedData.location,
                appt_type: validatedData.apptType,
                user_id: userId
            });

            console.log('[+] response: ', response);
        } catch (error: any) {
            console.error('Error adding calendar event: ', error.message);

            throw new Error('Failed to add calendar event: ', error);
        }
    } catch (e) {
        if (e instanceof ServerValidateError) {
            return e.formState;
        }
        
        throw e;
    }
};
