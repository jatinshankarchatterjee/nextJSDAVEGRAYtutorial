import React from "react";
import CustomersSearch from "@/app/(dashboard)/customers/form/CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";
import CustomerTable from "@/app/(dashboard)/customers/CustomerTable";

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;
  if (!searchText) return <CustomersSearch />;

  const results = await getCustomerSearchResults(searchText);

  return (
    <div>
      <CustomersSearch />
      {results.length ? (
        <>
          <CustomerTable data={results} />
        </>
      ) : (
        <h1>No results found</h1>
      )}
    </div>
  );
}
