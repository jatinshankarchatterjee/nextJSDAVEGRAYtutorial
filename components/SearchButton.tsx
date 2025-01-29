"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function SearchButton() {
  const status = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={status.pending}
      className="flex items-center gap-2"
    >
      {status.pending && <LoaderCircle className="mr-2 animate-spin" />}
      <span>Search</span>
    </Button>
  );
}
