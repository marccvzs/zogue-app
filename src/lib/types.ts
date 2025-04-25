export type PetCard = {
    id: string;
    name: string;
    age: string;
    breeds: {
        primary: string;
    };
    gender: string;
    photos: Array<{ medium: string; large: string; }>;
    type: string;
}