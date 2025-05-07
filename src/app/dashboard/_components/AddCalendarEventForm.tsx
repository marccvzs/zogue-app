"use client";

import { useActionState } from "react";
import { initialFormState } from "@tanstack/react-form/nextjs";
import {
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from "@tanstack/react-form";
import { addCalendarEventOpts } from "@/utils/formOpts/addCalendarEventOpts";
import addCalendarEventAction from "@/utils/actions/addCalendarEventAction";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

const AddCalendarEventForm = ({ selectedDate }: { selectedDate: Date }) => {
  const actionWithDate = (prev: unknown, formData: FormData) =>
    addCalendarEventAction(prev, formData, selectedDate);

  const [state, action] = useActionState(actionWithDate, initialFormState);

  const form = useForm({
    ...addCalendarEventOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  return (
    <form
      action={action as never}
      onSubmit={() => form.handleSubmit}
      className="flex flex-col gap-2"
    >
      <form.Field name="title">
        {(field) => {
          return (
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Appointment Title</Label>
              <Input
                name="title"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          );
        }}
      </form.Field>
      <form.Field name="apptType">
        {(field) => {
            return (
                <div className="flex flex-col gap-2">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Appointment Type"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Appointment</SelectLabel>
                                <SelectItem value="vet">Vet</SelectItem>
                                <SelectItem value="social">Social</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            )
        }}
      </form.Field>
      <form.Field name="location">
        {(field) => {
          return (
            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                name="location"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          );
        }}
      </form.Field>
      <form.Field name="time">
        {(field) => {
            console.log('[+] field: ', field);
          return (
            <div className="flex flex-col gap-2">
              <Label htmlFor="time">Time</Label>
              <Input type="time" className="w-fit" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
            </div>
          );
        }}
      </form.Field>
      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Submit"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};

export default AddCalendarEventForm;
