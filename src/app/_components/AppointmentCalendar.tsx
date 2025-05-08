"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DayPickerProps } from "react-day-picker";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCalendarEventForm from "../dashboard/_components/AddCalendarEventForm";

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const modifiers: DayPickerProps["modifiers"] = {};
  if (selectedDate) {
    modifiers.selected = selectedDate;
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <Dialog>
          <DialogTrigger className="outline p-1 rounded-lg hover:bg-accent hover:cursor-pointer" asChild>
            <Plus />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Appointment</DialogTitle>
              <DialogDescription>Add a new appointment for your pet to your calendar</DialogDescription>
            </DialogHeader>
            <p>{selectedDate ? selectedDate?.toDateString() : new Date().toDateString()}</p>
            <AddCalendarEventForm selectedDate={selectedDate || new Date()} />
          </DialogContent>
        </Dialog>
      </div>
      <Calendar
        modifiers={{ booked: [new Date(2025, 4, 8), new Date(2025, 4, 20)] }}
        modifiersClassNames={{
          booked: "bg-red-400 rounded-full!",
          selected: "bg-pastel-yellow",
        }}
        selected={selectedDate}
        onDayClick={(day, modifiers) => {
          if (modifiers.booked) {
            console.log("[+] this day is booked");
            return;
          }
          if (modifiers.selected) {
            setSelectedDate(undefined);
          } else {
            setSelectedDate(day);
          }
        }}
        classNames={{
          root: "shadow-lg w-fit bg-pastel-blue rounded-xl",
        }}
      />
    </div>
  );
};

export default AppointmentCalendar;
