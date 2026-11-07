import { Badge } from "@/components/ui/badge"
import { ShieldCheck } from "lucide-react"
import StatsCard from "./StatsCard"
import { User } from "@/lib/types"

interface AdminPage {
  users: User[]
}

const AdminPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users`)
  const users = await res.json()

  return (
    <div className="min-h-screen bg-gray-950 p-6 font-sans text-white md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-800 pb-6 md:flex-row md:items-center">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-blue-400">
              <ShieldCheck className="h-8 w-8 text-blue-500" /> Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Welcome back, Admin. Monitor platform activity and manage users.
            </p>
          </div>
          <Badge
            variant="outline"
            className="border-blue-500/50 bg-blue-950/30 px-3 py-1 text-blue-400"
          >
            System Status: Active
          </Badge>
        </div>

        {/* 1. Stat Cards Overview */}
        <StatsCard />

        {/* 2. User Management Table Section */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-200">
              Registered Users
            </h2>
            <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
              Live Database
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-800 text-xs tracking-wider text-gray-400 uppercase">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm">
                {users.map((user: User) => (
                  <tr
                    key={user._id}
                    className="transition duration-150 hover:bg-gray-800/40"
                  >
                    <td className="px-4 py-3 font-medium text-gray-200">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{user.email}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          user.role === "admin"
                            ? "border-green-800 bg-green-950 text-green-400"
                            : user.role === "seeker"
                              ? "border-blue-800 bg-blue-950 text-blue-400"
                              : "border-red-800 bg-red-950 text-red-400"
                        }`}
                      >
                        {user.role.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={`/admin/users/${user._id}`}
                        className="text-xs font-semibold text-blue-400 underline hover:text-blue-300"
                      >
                        View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
