'use client';

import { useSuspenseQuery } from "@tanstack/react-query";
import { petIdOptions } from "@/app/queries/petId";
import { notFound } from "next/navigation";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "@/components/ui/card";

const PetCard = ({ petId }: { petId: string }) => {
    const { data } = useSuspenseQuery(petIdOptions(petId))

    if (!data || !data.animal) notFound();

    const pet = data?.animal;
    console.log('[+] pet: ', pet);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{pet.name}</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
};

export default PetCard;
