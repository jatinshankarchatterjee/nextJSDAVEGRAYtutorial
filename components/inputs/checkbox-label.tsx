"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
type CheckboxLabelProps<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  message: string;
};

export function CheckboxLabel<S>({
  fieldTitle,
  nameInSchema,
  message,
}: CheckboxLabelProps<S>) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
          <div className="flex items-center space-x-2">
            <FormLabel className="text-base">{fieldTitle}</FormLabel>
            <FormControl>
              <Checkbox
                id={nameInSchema}
                checked={field.value}
                onCheckedChange={field.onChange}
                {...field}
              />
            </FormControl>
            {message}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
