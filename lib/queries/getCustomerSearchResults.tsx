import { db } from "@/db";
import { customers } from "@/db/schemas";
import { ilike, or } from "drizzle-orm";

export async function getCustomerSearchResults(searchText: string) {
  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        ilike(customers.name, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`)
      )
    );

  return results.map((result) => ({
    id: result.id,
    name: result.name,
    email: result.email,
    phone: result.phone,
    address: result.address,
    city: result.city,
    state: result.state,
    zip: result.zip,
    active: result.active,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    notes: result.notes,
  }));
}
