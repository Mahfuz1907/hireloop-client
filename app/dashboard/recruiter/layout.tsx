import { requireRole } from "@/app/lib/GettingSessions/GetSessionFromServer"
import React from "react"

const RecruiterDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  await requireRole("recruiter")
  return children
}

export default RecruiterDashboardLayout
