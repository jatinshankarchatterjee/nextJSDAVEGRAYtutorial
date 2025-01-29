import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schemas";
import { z } from "zod";

export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal("(new)")]),
  title: (schema) => schema.min(2, "Title is    required"),
  description: (schema) => schema.min(2, "Description is required"),
  assigned_to: (schema) => schema.email("Invalid email"),
});

export const selectTicketSchema = createSelectSchema(tickets);
export type insertTicketSchemaType = typeof insertTicketSchema._type;
export type selectTicketSchemaType = typeof selectTicketSchema._type;
