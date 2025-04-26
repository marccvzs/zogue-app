"use client";

import Image from "next/image";
import { useSuspenseQuery } from "@tanstack/react-query";
import { petTypeSearchOptions } from "@/app/queries/petTypeSearch";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { PetCard } from "@/lib/types";

const PetTypePage = ({ petType }: { petType: string }) => {
  const { data } = useSuspenseQuery(petTypeSearchOptions(petType));

  console.log("[+] data: ", data);

  return (
    <div className="min-h-screen p-8">
      <div>
        <ul className="flex flex-wrap gap-8 justify-center">
          {data?.animals?.map((pet: PetCard) => (
            <li key={pet.id} className="h-auto hover:scale-110 ease-in-out duration-300 cursor-pointer basis-1/5">
              <Card className="h-full shadow-xl bg-primary/10">
                <CardHeader>
                  <CardTitle>{pet.name}</CardTitle>
                  <CardDescription>
                    <p>{pet.age}</p>
                    <p>{pet.gender}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src={pet.photos[0].medium}
                    alt={pet.name}
                    width={100}
                    height={100}
                    style={{
                      height: "auto",
                      width: "100%",
                    }}
                    priority
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PetTypePage;
