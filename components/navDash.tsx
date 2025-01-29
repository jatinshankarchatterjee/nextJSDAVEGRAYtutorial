import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  label: string;
  href: string;
};
export default function NavDash({ icon: Icon, label, href }: Props) {
  return (
    <Button
      asChild
      variant="ghost"
      aria-label={label}
      title={label}
      className="rounded-full"
      size="lg"
    >
      {href ? (
        <Link href={href}>
          <Icon className="mr-2 h-4 w-4" />
        </Link>
      ) : (
        <Icon className="mr-2 h-4 w-4" />
      )}
    </Button>
  );
}
