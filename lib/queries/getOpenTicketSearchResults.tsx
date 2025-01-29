import { db } from "@/db";
import { tickets, customers } from "@/db/schemas";
import { asc, eq } from "drizzle-orm";

export async function getOpenTicketSearchResults() {
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
    .where(eq(tickets.status, false))
    .orderBy(asc(tickets.created_at));

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
