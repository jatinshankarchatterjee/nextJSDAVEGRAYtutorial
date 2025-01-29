"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TextareaHTMLAttributes } from "react";

type TextareaLabelProps<S> = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
};

export function TextareaLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: TextareaLabelProps<S>) {
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
          <FormControl>
            <Textarea
              id={nameInSchema}
              className="bg-white text-black  max-w-md"
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
