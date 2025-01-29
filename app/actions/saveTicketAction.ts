"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { tickets } from "@/db/schemas";
import { actionClient } from "@/lib/safe-action";
import { insertTicketSchema, type insertTicketSchemaType } from "@/zod/tickets";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const saveTicketAction = actionClient
  .metadata({ actionName: "saveTicketAction" })
  .schema(insertTicketSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: ticket,
    }: {
      parsedInput: insertTicketSchemaType;
    }) => {
      const { isAuthenticated } = getKindeServerSession();

      const isAuth = await isAuthenticated();
      if (!isAuth) {
        return redirect("/login");
      }
      if (ticket.id === "(new)") {
        const result = await db
          .insert(tickets)
          .values({
            customerId: ticket.customerId,
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            assigned_to: ticket.assigned_to,
            created_at: ticket.created_at,
            updated_at: ticket.updated_at,
          })
          .returning({ insertedID: tickets.id });
        return { message: `New ticket ${result[0].insertedID} created` };
      } else {
        const result = await db
          .update(tickets)
          .set({
            customerId: ticket.customerId,
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            assigned_to: ticket.assigned_to,
            created_at: ticket.created_at,
            updated_at: ticket.updated_at,
          })
          .where(eq(tickets.id, ticket.id))
          .returning({ updatedID: tickets.id });
        return { message: `Ticket ${result[0].updatedID} updated` };
      }
    }
  );
