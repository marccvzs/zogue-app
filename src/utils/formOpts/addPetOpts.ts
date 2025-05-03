import { formOptions } from '@tanstack/react-form/nextjs';

export const addPetOpts = formOptions({
    defaultValues: {
        name: '',
        age: 0,
        petType: '',
        breed: '',
        birthDate: '',
        image: '',
        userId: '',
    },
});
