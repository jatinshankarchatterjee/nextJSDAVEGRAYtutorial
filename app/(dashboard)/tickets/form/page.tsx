import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { BackButton } from "@/components/back-button";
import TicketForm from "@/app/(dashboard)/tickets/form/TicketForm";
import * as Sentry from "@sentry/nextjs";
export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <div>
          <h1>Ticket id or Customer id required to load form</h1>
          <BackButton title="Back" />
        </div>
      );
    }

    if (customerId) {
      const customer = await getCustomer(Number(customerId));
      if (!customer) {
        return (
          <div>
            <h1>Customer{customerId} not found</h1>
            <BackButton title="Back" />
          </div>
        );
      }
      if (!customer.active) {
        return (
          <div>
            <h1>Customer{customerId} is inactive</h1>
            <BackButton title="Back" />
          </div>
        );
      }

      return (
        <div>
          <TicketForm customer={customer} />
        </div>
      );
    }
    if (ticketId) {
      const ticket = await getTicket(Number(ticketId));
      if (!ticket) {
        return (
          <div>
            <h1>Ticket{ticketId} not found</h1>
            <BackButton title="Back" />
          </div>
        );
      }

      const customer = await getCustomer(ticket.customerId);
      return (
        <div>
          <TicketForm ticket={ticket} customer={customer} />
        </div>
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
