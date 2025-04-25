import { queryOptions } from '@tanstack/react-query';
import { getAccessToken } from '@/utils/tokenCache';

export const petTypeSearchOptions = (petType: string) => queryOptions({
    queryKey: ['pet_type', petType],
    queryFn: async () => {
        const token = await getAccessToken();

        const res = await fetch(`https://api.petfinder.com/v2/animals?type=${petType}&location=78749`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch pets');
        }

        const data = await res.json();

        return data;
    }
})
