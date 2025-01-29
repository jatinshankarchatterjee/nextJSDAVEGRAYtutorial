import React from "react";
import TicketSearch from "@/app/(dashboard)/tickets/form/TicketSearch";
import { getOpenTicketSearchResults } from "@/lib/queries/getOpenTicketSearchResults";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import TicketTable from "@/app/(dashboard)/tickets/TicketTable";
export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    const results = await getOpenTicketSearchResults();
    return (
      <div>
        <TicketSearch />
        {results.length ? (
          <TicketTable data={results} />
        ) : (
          <p>there are no open tickets..</p>
        )}
      </div>
    );
  }

  const results = await getTicketSearchResults(searchText);
  return (
    <div>
      <TicketSearch />
      {results.length ? <TicketTable data={results} /> : null}
    </div>
  );
}
