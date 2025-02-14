"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CirclePlusIcon, FolderKanbanIcon, GaugeIcon } from "lucide-react";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user-store";
import { getUsername } from "@/lib/client-actions/users";

export function AppSidebar() {
  const currentPath = usePathname();
  const setUsername = useUserStore((state) => state.setUsername);
  const username = useUserStore((state) => state.username);

  useEffect(() => {
    async function fetchUsername() {
      try {
        const data = await getUsername();
        setUsername(data.username);
      } catch (error) {
        console.error("Failed to fetch username:", error);
      }
    }

    fetchUsername();
  }, [setUsername]);

  if (!currentPath.startsWith("/dashboard")) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarHeader>Hey {username}! Get work done with us</SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard" passHref>
                <SidebarMenuButton>
                  <GaugeIcon />
                  Dashboard
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard/projects" passHref>
                  <SidebarMenuButton>
                    <FolderKanbanIcon /> View all active projects
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard/projects/new" passHref>
                  <SidebarMenuButton>
                    <CirclePlusIcon /> New Project
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Recents</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard" passHref>
                <SidebarMenuButton>Example project</SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
