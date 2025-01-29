import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { HomeIcon, FileIcon, UsersRoundIcon } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import NavDash from "@/components/navDash";
import { LogOutIcon } from "lucide-react";
import { NavMenu } from "@/components/NavMenu";
export default function Headerdash() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <NavDash icon={HomeIcon} label="Home" href="/dashboard" />
          <NavDash icon={FileIcon} label="Tickets" href="/tickets" />
          <NavMenu
            icon={UsersRoundIcon}
            label="Customers Menu"
            choices={[
              { title: "Search Customers", href: "/customers" },
              { title: "New Customer", href: "/customers/form" },
            ]}
          />
        </div>
        <div className="flex items-center gap-4">
          <LogoutLink>
            <LogOutIcon />
          </LogoutLink>
          <ModeToggle />
        </div>
      </div>
      <hr className="my-4 border-muted-foreground" />
    </>
  );
}
