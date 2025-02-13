"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const currentPath = usePathname();
  console.log(currentPath);

  if (!currentPath.startsWith('/dashboard')) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
