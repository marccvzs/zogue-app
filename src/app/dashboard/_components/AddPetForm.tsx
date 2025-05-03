"use client";

import { useActionState } from "react";
import { initialFormState } from "@tanstack/react-form/nextjs";
import {
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from "@tanstack/react-form";
import addPetAction from "@/utils/actions/addPetAction";
import { addPetOpts } from "@/utils/formOpts/addPetOpts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select";
import { UploadButton } from "@/utils/uploadthing";

const AddPetForm = () => {
  const [state, action] = useActionState(addPetAction, initialFormState);

  const form = useForm({
    ...addPetOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  return (
    <form
      action={action as never}
      onSubmit={() => form.handleSubmit()}
      className="border-slate-300 rounded-lg border p-4 shadow-xl"
    >
      {formErrors.map((error) => (
        <p key={error}>{error}</p>
      ))}
      <form.Field name="name">
        {(field) => {
          return (
            <div className="flex flex-col gap-2 pb-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          );
        }}
      </form.Field>
      <form.Field name="age">
        {(field) => {
          return (
            <div className="flex flex-col gap-2 pb-2">
              <Label htmlFor="age">Age</Label>
              <Input
                name="age"
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
            </div>
          );
        }}
      </form.Field>
      <form.Field name="breed">
        {(field) => {
          return (
            <div className="flex flex-col gap-2 pb-2">
              <Label htmlFor="breed">Primary Breed</Label>
              <Input
                name="breed"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          );
        }}
      </form.Field>
      <form.Field name="petType">
        {(field) => {
          return (
            <div className="flex flex-col gap-2 pb-2">
              <Label htmlFor="petType">Pet Type</Label>
              <Select onValueChange={field.handleChange} name="petType">
                <SelectTrigger>
                  <SelectValue placeholder="Select a pet type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="pig">Rabbit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          );
        }}
      </form.Field>
      <form.Field name="images">
        {(field) => {
            return (
                <div className="flex flex-col gap-2 pb-2">
                    <UploadButton endpoint="imageUploader" />
                </div>
            )
        }}
      </form.Field>
      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit} className="py-4">
            {isSubmitting ? "..." : "Submit"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};

export default AddPetForm;
