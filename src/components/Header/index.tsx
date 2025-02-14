"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutUser } from "@/lib/client-actions/users";
import { useLoadingStore } from "@/stores/loading-store";
import Image from "next/image";
import { LogInIcon, LogOutIcon } from "lucide-react";

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
    <header className="sticky top-0 flex w-full gap-8 py-4 px-6 items-center h-24 bg-background text-white z-10">
      {currentPath.startsWith("/dashboard") && (
        <SidebarTrigger className="p-4" />
      )}
      <Image src="/Logo.png" alt="Kapybara" width={60} height={60} />
      <span className="text-xl">Kapybara</span>
      <div className="ml-auto flex gap-4">
        {currentPath.startsWith("/dashboard") ? (
          <Button onClick={handleLogout}>
            <LogOutIcon /> Logout
          </Button>
        ) : (
          <Link href="/login" passHref>
            <Button> <LogInIcon /> Login / Sign-Up</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
