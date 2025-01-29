"use client";

import SearchButton from "@/components/SearchButton";
import Form from "next/form";
import { Input } from "@/components/ui/input";

export default function CustomerSearch() {
  return (
    <Form action="/customers" className="flex items-center gap-2">
      <Input
        type="text"
        name="searchText"
        placeholder="Search customers...."
        className="w-1/2 "
      />
      <SearchButton />
    </Form>
  );
}
