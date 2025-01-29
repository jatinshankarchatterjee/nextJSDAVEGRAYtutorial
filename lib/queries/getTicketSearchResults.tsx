import { db } from "@/db";
import { tickets, customers } from "@/db/schemas";
import { eq, ilike, or,asc } from "drizzle-orm";

export async function getTicketSearchResults(searchText: string) {
  const results = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.created_at,
      title: tickets.title,
      name: customers.name,
      email: customers.email,
      phone: customers.phone,
      description: tickets.description,
      status: tickets.status,
      assigned_to: tickets.assigned_to,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      or(
        ilike(tickets.title, `%${searchText}%`),
        ilike(tickets.description, `%${searchText}%`),
        ilike(customers.name, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`)
      )
    ).orderBy(asc(tickets.created_at));

  return results.map((result) => ({
    id: result.id,
    ticketDate: result.ticketDate,
    title: result.title,
    name: result.name,
    email: result.email,
    phone: result.phone,
    description: result.description,
    status: result.status,
    assigned_to: result.assigned_to,
  }));
}

export type TicketSearchResultsType = Awaited<
  ReturnType<typeof getTicketSearchResults>
>;
