import React from "react";
import { ModeToggle } from "./mode-toggle";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogInIcon } from "lucide-react";
export default function Headerhome() {
  return (
    <div className="flex items-center justify-between">
      <h1>Home</h1>
      <div className="flex items-center">
        <LoginLink>
          <LogInIcon />
        </LoginLink>
        <ModeToggle />
      </div>
    </div>
  );
}
