import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";

function Header() {
  return (
    <header className="sticky top-0 flex w-full gap-8 p-2 items-center h-16 bg-white shadow-md z-10">
      <SidebarTrigger className="p-4" />
      Kapybara - Your partner in crime
      <div className="ml-auto flex gap-4">
        <Button>Sign-up</Button>
        <Button>Log-in</Button>
      </div>
    </header>
  );
}

export default Header;