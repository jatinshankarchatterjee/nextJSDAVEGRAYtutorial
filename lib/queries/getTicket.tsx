import {db} from "@/db";
import {tickets} from "@/db/schemas";
import {eq} from "drizzle-orm";

export async function getTicket(id: number) {    
    const ticket = await db
        .select()
        .from(tickets)
        .where(eq(tickets.id, id));
    return ticket[0];
}