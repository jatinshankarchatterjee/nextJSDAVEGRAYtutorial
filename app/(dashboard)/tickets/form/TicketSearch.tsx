"use client";

import SearchButton from "@/components/SearchButton";
import Form from "next/form";
import { Input } from "@/components/ui/input";

export default function TicketSearch() {
  return (
    <Form action="/tickets" className="flex items-center gap-2">
      <Input
        type="text"
        name="searchText"
        placeholder="Search tickets...."
        className="w-1/2 "
      />
      <SearchButton />
    </Form>
  );
}
