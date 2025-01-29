"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Dataobject = {
  id: string;
  description: string;
};

type SelectLabelProps<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
  data: Dataobject[];
};

export function SelectLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  data,
}: SelectLabelProps<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <Select onValueChange={field.onChange} {...field}>
            <FormControl>
              <SelectTrigger
                id={nameInSchema}
                className="bg-white text-black  max-w-md"
              >
                <SelectValue placeholder="Select a value" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
