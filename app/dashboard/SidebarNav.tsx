"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileText,
  PlusCircle,
  Bookmark,
} from "lucide-react"

const menuItemsByRoles = {
  admin: [
    {
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
    },
  ],
  seeker: [
    {
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
  ],
  recruiter: [
    {
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      name: "Add Job",
      url: "/dashboard/recruiter/add-job",
      icon: PlusCircle,
    },
    {
      name: "Manage Jobs",
      url: "/dashboard/recruiter/manage-jobs",
      icon: Briefcase,
    },
  ],
}

type Role = keyof typeof menuItemsByRoles

export function SidebarNav({ role }: { role?: string }) {
  const pathname = usePathname()
  const items =
    role && role in menuItemsByRoles ? menuItemsByRoles[role as Role] : []

  // Pick the most specific matching URL so e.g. "Dashboard" (/dashboard/admin)
  // is not active while on "/dashboard/admin/users" (Users), while deeper
  // nested pages (edit-jobs/[id]) still keep their parent item active.
  const activeUrl = items
    .filter(
      (item) => pathname === item.url || pathname.startsWith(item.url + "/")
    )
    .sort((a, b) => b.url.length - a.url.length)[0]?.url

  return (
    <Sidebar className="top-14.5 z-40 h-screen bg-[#09090b]">
      <SidebarContent className="bg-[#09090b] text-white">
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  isActive={item.url === activeUrl}
                  aria-current={item.url === activeUrl ? "page" : undefined}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
