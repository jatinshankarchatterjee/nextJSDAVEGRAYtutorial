"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LayoutDashboardIcon } from "lucide-react";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col h-svh justify-center items-center">
        <h1 className="text-4xl font-bold ">Hello @ Dave&apos;s repair shop</h1>
        <Button className="m-10" onClick={() => router.push("/dashboard")}>
          <LayoutDashboardIcon />
        </Button>
      </div>
    </>
  );
}
