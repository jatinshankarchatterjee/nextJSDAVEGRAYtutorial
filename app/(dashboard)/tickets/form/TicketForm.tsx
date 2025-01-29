"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  insertTicketSchema,
  type insertTicketSchemaType,
  type selectTicketSchemaType,
} from "@/zod/tickets";
import { selectCustomerSchemaType } from "@/zod/customers";
import { Button } from "@/components/ui/button";
import { InputLabel } from "@/components/inputs/input-label";
import { TextareaLabel } from "@/components/inputs/textarea-label";
import { CheckboxLabel } from "@/components/inputs/checkbox-label";
import { useAction } from "next-safe-action/hooks";
import { saveTicketAction } from "@/app/actions/saveTicketAction";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { DisplayServerRequests } from "@/components/DisplayServerRequests";
type Props = {
  ticket?: selectTicketSchemaType;
  customer: selectCustomerSchemaType;
};

export default function TicketForm({ ticket, customer }: Props) {
  const { toast } = useToast();
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? "(new)",
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    status: ticket?.status ?? false,
    assigned_to: ticket?.assigned_to ?? "new-ticket@nt.com",
  };
  const form = useForm<insertTicketSchemaType>({
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });
  const {
    execute: executeSave,
    result: resultSave,
    isExecuting: isExecutingSave,
    reset: resetSave,
  } = useAction(saveTicketAction, {
    onSuccess({ data }) {
      toast({
        variant: "default",
        title: "Success",
        description: data?.message,
      });
    },
    onError() {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: insertTicketSchemaType) => {
    executeSave(data);
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <DisplayServerRequests result={resultSave} />
        <h2>{ticket?.id ? "Edit" : "New"} Ticket Form</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <InputLabel
              fieldTitle="Title"
              nameInSchema="title"
              placeholder="Title"
            />
            <TextareaLabel
              fieldTitle="Description"
              nameInSchema="description"
              placeholder="Description"
            />
            <CheckboxLabel
              fieldTitle="Status"
              nameInSchema="status"
              message="Open"
            />
            <InputLabel
              fieldTitle="Assigned To"
              nameInSchema="assigned_to"
              readOnly={true}
            />
            <div className="flex flex-row space-x-4">
              <h3>Customer Info</h3>
              <p>Name: {customer.name}</p>
              <p>Email: {customer.email}</p>
              <p>Phone: {customer.phone}</p>
              <p>
                Address: {customer.address}, {customer.city}, {customer.state},{" "}
                {customer.zip}{" "}
              </p>
            </div>
            <Button type="submit" disabled={isExecutingSave}>
              {isExecutingSave ? (
                <LoaderCircle className="animate-spin" />
              ) : null}
              Submit
            </Button>
            <Button
              type="reset"
              onClick={() => {
                form.reset();
                resetSave();
              }}
            >
              Reset
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
