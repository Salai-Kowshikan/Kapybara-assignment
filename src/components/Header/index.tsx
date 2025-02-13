"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

function Header() {
  const currentPath = usePathname();
  return (
    <header className="sticky top-0 flex w-full gap-8 p-2 items-center h-16 bg-white shadow-md z-10">
      {currentPath.startsWith('/dashboard') && <SidebarTrigger className="p-4" />}
      Kapybara - Your partner in crime
      <div className="ml-auto flex gap-4">
        <Link href="/login" passHref>
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up" passHref>
          <Button>Sign-up</Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
