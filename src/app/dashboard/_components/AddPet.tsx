"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddPetForm from "./AddPetForm";
import { Plus, Minus } from "lucide-react";

const AddPet = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex gap-2 py-4">
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <Minus /> : <Plus />}
      </Button>
      {isOpen && <AddPetForm />}
    </div>
  );
};

export default AddPet;
