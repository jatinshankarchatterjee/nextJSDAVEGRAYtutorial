import React from "react";
import Link from "next/link"; 
import { LayoutDashboardIcon } from "lucide-react";
export default function Home() {
  return (
    <div className="flex flex-col h-svh justify-center items-center">
        <h1 className="text-4xl font-bold ">
          Hello @ Dave&apos;s repair shop</h1>

        <Link href="/dashboard" className="flex items-center gap-2 mt-20">
        <span>Proceed to Dashboard &nbsp;</span>
          <LayoutDashboardIcon />
          
        </Link>
    </div>
    
  );
}
