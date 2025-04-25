import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { petTypeSearchOptions } from "../queries/petTypeSearch";
import PetTypePage from "./_components/PetTypePage";

const Page = async ({ params }: { params: Promise<{ petType: string }>}) => {
    const { petType } = await params;

    const queryClient = new QueryClient();
    
    await queryClient.prefetchQuery(petTypeSearchOptions(petType));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PetTypePage petType={petType} />
        </HydrationBoundary>
    )
};

export default Page;
