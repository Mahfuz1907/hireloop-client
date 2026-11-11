import { auth } from "@/auth"
import { headers } from "next/headers"
import { SidebarNav } from "./SidebarNav"

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const role = session?.user?.role

  return <SidebarNav role={role} />
}
