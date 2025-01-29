"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from "@/zod/customers";
import { Button } from "@/components/ui/button";
import { InputLabel } from "@/components/inputs/input-label";
import { TextareaLabel } from "@/components/inputs/textarea-label";
import { SelectLabel } from "@/components/inputs/select-label";
import { StatesArray } from "@/constants/StatesArray";
import { CheckboxLabel } from "@/components/inputs/checkbox-label";
import { useAction } from "next-safe-action/hooks";
import { saveCustomerAction } from "@/app/actions/saveCustomerActions";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { DisplayServerRequests } from "@/components/DisplayServerRequests";
import { useEffect } from "react";

type Props = {
  customer?: selectCustomerSchemaType;
};
export default function CustomerForm({ customer }: Props) {
  const { toast } = useToast();

  const defaultValues: insertCustomerSchemaType = {
    id: customer?.id ?? 0,
    name: customer?.name ?? "",
    email: customer?.email ?? "",
    phone: customer?.phone ?? "",
    address: customer?.address ?? "",
    city: customer?.city ?? "",
    state: customer?.state ?? "",
    zip: customer?.zip ?? "",
    active: customer?.active ?? false,
    notes: customer?.notes ?? "",
  };

  const form = useForm<insertCustomerSchemaType>({
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  useEffect(() => {
    if (customer) {
      form.setValue("name", customer.name);
      form.setValue("email", customer.email);
      form.setValue("phone", customer.phone);
      form.setValue("address", customer.address);
      form.setValue("city", customer.city);
      form.setValue("state", customer.state);
      form.setValue("zip", customer.zip);
      form.setValue("active", customer.active);
      form.setValue("notes", customer.notes);
    }
  }, [customer, form]);

  const {
    execute: executeSave,
    result: resultSave,
    isExecuting: isExecutingSave,
    reset: resetSave,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      if (data?.message) {
        toast({
          variant: "default",
          title: "Success",
          description: data.message,
        });
      }
    },
    onError() {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: insertCustomerSchemaType) => {
    executeSave(data);
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <DisplayServerRequests result={resultSave} />
        <h2>{customer?.id ? "Edit" : "New"} Customer Form</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4  "
          >
            <div className="flex flex-col space-y-4">
              <InputLabel
                fieldTitle="Name"
                nameInSchema="name"
                className="w-full"
              />
              <InputLabel
                fieldTitle="Email"
                nameInSchema="email"
                className="w-full"
              />
              <InputLabel
                fieldTitle="Phone"
                nameInSchema="phone"
                className="w-full"
              />
              <InputLabel
                fieldTitle="Address"
                nameInSchema="address"
                className="w-full"
              />
              <InputLabel
                fieldTitle="City"
                nameInSchema="city"
                className="w-full"
              />
              <SelectLabel
                fieldTitle="State"
                nameInSchema="state"
                className="w-full"
                data={StatesArray}
              />
              <InputLabel
                fieldTitle="Zip"
                nameInSchema="zip"
                className="w-full"
              />
              <CheckboxLabel
                fieldTitle="Active"
                nameInSchema="active"
                message="yes"
              />
              <TextareaLabel
                fieldTitle="Notes"
                nameInSchema="notes"
                className="w-full"
              />

              <Button
                className="max-w-20"
                type="submit"
                disabled={isExecutingSave}
              >
                {isExecutingSave && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
              <Button
                className="max-w-20"
                type="reset"
                onClick={() => {
                  form.reset(defaultValues);
                  resetSave();
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
