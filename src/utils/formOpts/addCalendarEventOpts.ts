import { formOptions } from "@tanstack/react-form/nextjs";
import getCurrentTime from "@/lib/getCurrentTime";

export const addCalendarEventOpts = formOptions({
  defaultValues: {
    dateOf: "",
    time: getCurrentTime(),
    title: "",
    location: "",
    apptType: "vet",
  },
});
