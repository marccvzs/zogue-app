import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import PetCard from '@/app/_components/PetCard';
import { petIdOptions } from '@/app/queries/petId';

export default async function PetPage({ params }: { params: Promise<{ petId: string }>}) {
    const { petId } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(petIdOptions(petId));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PetCard petId={petId}/>
        </HydrationBoundary>
    ) 
}
