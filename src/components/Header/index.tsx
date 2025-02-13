"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import {toast} from 'sonner';
import { logoutUser } from "@/lib/client-actions/users";
import { useLoadingStore } from "@/stores/loading-store";

function Header() {
  const currentPath = usePathname();
  const router = useRouter();
  const setLoading = useLoadingStore((state) => state.setLoading);

  const handleLogout = async () => {
    setLoading(true);
    await logoutUser();
    toast.success("Logged out successfully");
    setLoading(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 flex w-full gap-8 p-2 items-center h-16 bg-white shadow-md z-10">
      {currentPath.startsWith("/dashboard") && (
        <SidebarTrigger className="p-4" />
      )}
      Kapybara - Your partner in crime
      <div className="ml-auto flex gap-4">
        {currentPath.startsWith("/dashboard") ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Link href="/login" passHref>
            <Button>Login / Sign-Up</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;