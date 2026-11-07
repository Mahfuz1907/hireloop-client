import { auth } from "@/auth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { headers } from "next/headers"
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  CreditCard,
  Settings,
  FileText,
  PlusCircle,
  Bookmark,
} from "lucide-react"
import Link from "next/link"

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
    {
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: CreditCard,
    },
    {
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
  seeker: [
    {
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: Briefcase,
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
    {
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
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
    {
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
}

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const role = session?.user?.role

  return (
    <Sidebar className="top-14.5 z-40 h-screen">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRoles[role!].map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton render={<Link href={item.url} />}>
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
