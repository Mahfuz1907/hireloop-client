"use client"

import React, { useState } from "react"

interface Application {
  _id: string
  title: string
  companyName: string
  jobSeekerName: string
  jobSeekerEmail: string
  status: string
}

interface ApplicationsTableProps {
  initialApplications: Application[]
}

const statusOptions = [
  "Active",
  "Review",
  "Interview",
  "Shortlisted",
  "Rejected",
  "Offered",
]

export default function ApplicationsTable({
  initialApplications,
}: ApplicationsTableProps) {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  // স্ট্যাটাস পরিবর্তনের হ্যান্ডলার ফাংশন
  const handleStatusChange = async (appId: string, newStatus: string) => {
    setLoadingId(appId)
    try {
      // আপনার ব্যাকএন্ড বা সার্ভার অ্যাকশনের মাধ্যমে স্ট্যাটাস আপডেট করার API কল এখানে হবে
      // যেমন: await updateApplicationStatus(appId, newStatus);

      // সাময়িকভাবে লোকাল স্টেট আপডেট করা হচ্ছে (Optimistic UI update)
      setApplications((prev) =>
        prev.map((app) =>
          app._id === appId ? { ...app, status: newStatus } : app
        )
      )
    } catch (error) {
      console.error("Failed to update status", error)
    } finally {
      setLoadingId(null)
    }
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
                <select
                  value={app.status || "Active"}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                  disabled={loadingId === app._id}
                  className="cursor-pointer rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs text-gray-200 transition-all focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {statusOptions.map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="bg-gray-900 text-white"
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
