"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { customers } from "@/db/schemas";
import { actionClient } from "@/lib/safe-action";
import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
} from "@/zod/customers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const saveCustomerAction = actionClient
  .metadata({ actionName: "saveCustomerAction" })
  .schema(insertCustomerSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: customer,
    }: {
      parsedInput: insertCustomerSchemaType;
    }) => {
      const { isAuthenticated } = getKindeServerSession();

      const isAuth = await isAuthenticated();
      if (!isAuth) {
        return redirect("/login");
      }
      if (customer.id === 0) {
        const result = await db
          .insert(customers)
          .values({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            zip: customer.zip,
            active: customer.active,
            notes: customer.notes,
          })
          .returning({ insertedID: customers.id });
        return { message: `New customer ${result[0].insertedID} created` };
      } else {
        const result = await db
          .update(customers)
          .set({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            zip: customer.zip,
            active: customer.active,
            notes: customer.notes,
          })
          .where(eq(customers.id, customer.id!))
          .returning({ updatedID: customers.id });
        return { message: `Customer ${result[0].updatedID} updated` };
      }
    }
  );
