import { queryOptions } from '@tanstack/react-query';
import { getAccessToken } from "@/utils/tokenCache";


export const petIdOptions = (petId: string) => queryOptions({
    queryKey: ['pet_id',petId],
    queryFn: async () => {
        const token = await getAccessToken();

        const res = await fetch(`https://api.petfinder.com/v2/animals/${petId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    
        if (!res.ok) {
            throw new Error('Failed to fetch pet');
        }
    
        const data = await res.json();
    
        return data;
    }
})