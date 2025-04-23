'use client';

import { useSuspenseQuery } from "@tanstack/react-query";
import { petIdOptions } from "@/app/queries/petId";

const PetCard = ({ petId }: { petId: string }) => {
    const { data } = useSuspenseQuery(petIdOptions(petId))

    console.log('[+] data: ', data);

    return (
        <div>
            <h1 className="text-2xl text-white font-bold">{data?.animal?.name}</h1>
        </div>
    )
};

export default PetCard;
