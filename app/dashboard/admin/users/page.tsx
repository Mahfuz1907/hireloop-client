import { Download, LockKeyhole, Shield, User as UserIcon } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GetUsers } from "@/app/lib/actions/users"
import { User } from "@/lib/types"

export default async function AdminUserManagementPage() {
  const users = await GetUsers()

  return (
    <div className="min-h-screen bg-[#09090b] p-4 font-sans text-white sm:p-6 md:p-10">
      {/* ১. পেজ হেডার এবং অ্যাকশন কন্ট্রোলস */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Review, filter, and manage platform access for all users.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Export List Button */}
          <Button className="h-10 rounded-xl bg-white px-4 text-xs font-semibold text-black shadow-sm transition hover:bg-zinc-200">
            <Download className="mr-2 h-4 w-4" />
            Export List
          </Button>
        </div>
      </div>

      {/* ৩. ইউজার ম্যানেজমেন্ট টেবিল (Using Shadcn Table) */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#121216] shadow-xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-zinc-800 bg-[#121216]/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                  User Name
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                  Email Address
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                  Role
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-zinc-800/60 text-sm">
              {users && users.length > 0 ? (
                users.map((user: User) => (
                  <TableRow
                    key={user._id}
                    className="group border-zinc-800/60 transition hover:bg-zinc-900/50"
                  >
                    {/* User Name & Avatar */}
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-zinc-700">
                          <AvatarFallback className="bg-zinc-800 text-xs text-zinc-300">
                            {user.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-white transition group-hover:text-blue-400">
                          {user.name}
                        </span>
                      </div>
                    </TableCell>

                    {/* Email Address */}
                    <TableCell className="px-6 py-4 font-mono text-xs text-zinc-300">
                      {user.email}
                    </TableCell>

                    {/* Role Badge (Shadcn Badge) */}
                    <TableCell className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className="gap-1.5 border-zinc-800 bg-[#18181b] px-2.5 py-1 font-normal text-zinc-300"
                      >
                        {user.role === "recruiter" ? (
                          <Shield className="h-3.5 w-3.5 text-blue-400" />
                        ) : user.role === "seeker" ? (
                          <UserIcon className="h-3.5 w-3.5 text-zinc-400" />
                        ) : (
                          <LockKeyhole className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                        {user.role}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-12 text-center text-zinc-500"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
