import { GetApplicationsByJob } from "@/app/lib/actions/application"
import ApplicationsTable from "./ApplicationsTable"
import React from "react"

interface ApplicationsPerPageTypes {
  params: Promise<{ id: string }>
}

const ApplicationsPerJobPage = async ({ params }: ApplicationsPerPageTypes) => {
  const { id } = await params
  const applications = await GetApplicationsByJob(id)

  return (
    <div className="min-h-screen bg-gray-950 p-6 text-gray-100">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-2xl font-bold">Job Applications</h1>
        <p className="mb-6 text-sm text-gray-400">
          Manage and review candidates who applied for this position.
        </p>

        {/* Applications Table Component */}
        <ApplicationsTable initialApplications={applications} />
      </div>
    </div>
  )
}

export default ApplicationsPerJobPage
