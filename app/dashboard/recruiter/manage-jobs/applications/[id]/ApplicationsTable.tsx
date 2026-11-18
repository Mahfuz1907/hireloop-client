"use client"

import { UpdateApplicationStatus } from "@/app/lib/actions/application"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ApplicationTypes } from "@/lib/types"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const items = [
  { label: "Active", value: "Active" },
  { label: "Review", value: "Review" },
  { label: "Interview", value: "Interview" },
  { label: "Shortlisted", value: "Shortlisted" },
  { label: "Rejected", value: "Rejected" },
  { label: "Offered", value: "Offered" },
]

export default function ApplicationsTable({
  applications,
}: {
  applications: ApplicationTypes[]
}) {
  const [statuses, setStatuses] = useState("Active")
  const router = useRouter()
  const handleStatusChange = async (id: string, status: string) => {
    setStatuses(status)
    const result = await UpdateApplicationStatus(id, { status })
    router.refresh()
    console.log(result)
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="rounded-lg border border-gray-800 bg-gray-900 py-12 text-center">
        <p className="text-gray-400">No applications found for this job yet.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-900 shadow-md">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-900/50 text-xs text-gray-400 uppercase">
            <th className="px-6 py-4 font-semibold">Candidate Name</th>
            <th className="px-6 py-4 font-semibold">Email</th>
            <th className="px-6 py-4 font-semibold">Job Title</th>
            <th className="px-6 py-4 font-semibold">Current Status</th>
            <th className="px-6 py-4 text-right font-semibold">
              Update Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 text-sm">
          {applications.map((app) => (
            <tr
              key={app._id}
              className="transition-colors hover:bg-gray-800/50"
            >
              <td className="px-6 py-4 font-medium text-white">
                {app.jobSeekerName}
              </td>
              <td className="px-6 py-4 text-gray-300">{app.jobSeekerEmail}</td>
              <td className="px-6 py-4 text-gray-300">{app.title}</td>
              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    app.status === "Offered"
                      ? "border border-green-500/20 bg-green-500/10 text-green-400"
                      : app.status === "Rejected"
                        ? "border border-red-500/20 bg-red-500/10 text-red-400"
                        : app.status === "Interview"
                          ? "border border-purple-500/20 bg-purple-500/10 text-purple-400"
                          : app.status === "Shortlisted"
                            ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"
                            : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {app.status || "Active"}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <Select
                  items={items}
                  defaultValue={app.status}
                  onValueChange={(value) =>
                    handleStatusChange(app._id, value as string)
                  }
                >
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
