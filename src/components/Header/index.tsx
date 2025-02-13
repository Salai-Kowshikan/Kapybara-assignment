import Link from "next/link";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";

function Header() {
  return (
    <header className="sticky top-0 flex w-full gap-8 p-2 items-center h-16 bg-white shadow-md z-10">
      <SidebarTrigger className="p-4" />
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
