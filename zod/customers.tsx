import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schemas";

export const insertCustomerSchema = createInsertSchema(customers, {
  name: (schema) => schema.min(2, "Name is required"),
  email: (schema) => schema.email("Invalid email"),
  phone: (schema) =>
    schema.regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number"),
  address: (schema) => schema.min(2, "address is required"),
  city: (schema) => schema.min(2, "city is required"),
  state: (schema) => schema.min(2, "state must be 2 characters"),
  zip: (schema) => schema.regex(/^\d{5}(-\d{4})?$/, "Invalid zip code"),
});

export const selectCustomerSchema = createSelectSchema(customers);
export type insertCustomerSchemaType = typeof insertCustomerSchema._type;
export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
