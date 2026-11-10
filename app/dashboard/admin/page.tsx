import {
  Search,
  Bell,
  HelpCircle,
  Calendar,
  Download,
  Users,
  Briefcase,
  Building2,
  CreditCard,
  ArrowUpRight,
  Inbox,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { GetUsers, GetUsersByRole } from "@/app/lib/actions/users"
import { GetAllJobs } from "@/app/lib/actions/jobs"
import { Transaction } from "@/lib/types"

const AdminDashboardPage = async () => {
  // users calculation
  const previousUsers = 1
  const users = await GetUsers()
  const userPercent = ((users.length - previousUsers) * 100) / previousUsers

  // recruiters calculation
  const previousRecruiters = 1
  const recruiters = await GetUsersByRole("recruiter")
  const recruitersPercent =
    ((recruiters.length - previousRecruiters) * 100) / previousRecruiters

  // jobs calculation
  const previousJobs = 5
  const jobs = await GetAllJobs()
  const jobsPercent = ((jobs.length - previousJobs) * 100) / previousJobs

  // transaction calculation
  const previousTransaction = 0
  const transactions: Transaction[] = []
  const transactionPercent =
    ((transactions.length - previousTransaction) * 100) / previousTransaction
  return (
    <div className="min-h-screen space-y-8 bg-[#09090b] p-4 font-sans text-white md:p-8">
      {/* Top Search & Actions Bar */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-gray-800/60 bg-[#121216] p-4 sm:flex-row">
        <div className="relative w-full sm:w-96">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Global search..."
            className="w-full rounded-lg border border-gray-800 bg-[#18181b] py-2 pr-4 pl-10 text-sm text-gray-200 transition focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="relative rounded-lg border border-gray-800 bg-[#18181b] p-2 text-gray-300 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button className="rounded-lg border border-gray-800 bg-[#18181b] p-2 text-gray-300 hover:text-white">
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Real-time platform performance and growth metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-gray-800 bg-[#121216] text-xs text-gray-300 hover:bg-gray-800"
          >
            <Calendar className="mr-2 h-4 w-4 text-gray-400" /> Last 30 Days
          </Button>
          <Button className="bg-white text-xs font-semibold text-black hover:bg-gray-200">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Stat Cards Grid (5 Cards responsive) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Total Users */}
        <Card className="border-gray-800 bg-[#121216] text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-2">
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <span
              className={`flex items-center text-xs font-semibold ${userPercent > 0 ? "text-emerald-400" : userPercent < 0 ? "text-red-400" : "text-white"}`}
            >
              {userPercent > 0 ? (
                <ArrowUp />
              ) : userPercent < 0 ? (
                <ArrowDown />
              ) : (
                ""
              )}
              {userPercent}%
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-medium text-gray-400">Total Users</p>
            <h3 className="mt-1 text-2xl font-bold">{users.length}</h3>
          </CardContent>
        </Card>

        {/* Total Recruiters */}
        <Card className="border-gray-800 bg-[#121216] text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-2">
              <Briefcase className="h-4 w-4 text-gray-400" />
            </div>
            <span
              className={`flex items-center text-xs font-semibold ${recruitersPercent > 0 ? "text-emerald-400" : recruitersPercent < 0 ? "text-red-400" : "text-white"}`}
            >
              {recruitersPercent > 0 ? (
                <ArrowUp />
              ) : recruitersPercent < 0 ? (
                <ArrowDown />
              ) : (
                ""
              )}
              {recruitersPercent}%
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-medium text-gray-400">
              Total Recruiters
            </p>
            <h3 className="mt-1 text-2xl font-bold">{recruiters.length}</h3>
          </CardContent>
        </Card>

        {/* Total Companies */}
        <Card className="border-gray-800 bg-[#121216] text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-2">
              <Building2 className="h-4 w-4 text-gray-400" />
            </div>
            <span
              className={`flex items-center text-xs font-semibold ${recruitersPercent > 0 ? "text-emerald-400" : recruitersPercent < 0 ? "text-red-400" : "text-white"}`}
            >
              {recruitersPercent > 0 ? (
                <ArrowUp />
              ) : recruitersPercent < 0 ? (
                <ArrowDown />
              ) : (
                ""
              )}
              {recruitersPercent}%
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-medium text-gray-400">Total Companies</p>
            <h3 className="mt-1 text-2xl font-bold">{recruiters.length}</h3>
          </CardContent>
        </Card>

        {/* Jobs Posted */}
        <Card className="border-gray-800 bg-[#121216] text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-2">
              <Briefcase className="h-4 w-4 text-gray-400" />
            </div>
            <span
              className={`flex items-center text-xs font-semibold ${jobsPercent > 0 ? "text-emerald-400" : jobsPercent < 0 ? "text-red-400" : "text-white"}`}
            >
              {jobsPercent > 0 ? (
                <ArrowUp />
              ) : jobsPercent < 0 ? (
                <ArrowDown />
              ) : (
                ""
              )}
              {jobsPercent}%
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-medium text-gray-400">Jobs Posted</p>
            <h3 className="mt-1 text-2xl font-bold">{jobs.length}</h3>
          </CardContent>
        </Card>

        {/* Platform Revenue */}
        <Card className="border-gray-800 bg-[#121216] text-white shadow-lg sm:col-span-2 xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-2">
              <CreditCard className="h-4 w-4 text-gray-400" />
            </div>
            <span
              className={`flex items-center text-xs font-semibold ${transactionPercent > 0 ? "text-emerald-400" : transactionPercent < 0 ? "text-red-400" : "text-white"}`}
            >
              {transactionPercent > 0 ? (
                <ArrowUp />
              ) : transactionPercent < 0 ? (
                <ArrowDown />
              ) : (
                ""
              )}
              {transactionPercent}%
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-medium text-gray-400">
              Platform Revenue
            </p>
            <h3 className="mt-1 text-2xl font-bold">$00000</h3>
          </CardContent>
        </Card>
      </div>

      {/* Recent Subscription Transactions Section */}
      <div className="rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            Recent Subscription Transactions
          </h2>
          <a
            href="/dashboard/admin/activity"
            className="flex items-center gap-1 text-xs font-medium text-gray-400 transition hover:text-white"
          >
            View All Activity <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {transactions.length === 0 ? (
          /* 🔴 Empty State Design (Jokhon kono transaction database-e thakbe na) */
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-800 bg-[#18181b]/40 py-16 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-500">
              <Inbox className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-semibold text-gray-300">
              No Recent Transactions
            </h3>
            <p className="mt-1 max-w-sm text-xs text-gray-500">
              There are no subscription transactions recorded in the database
              yet. New payments will appear here automatically.
            </p>
          </div>
        ) : (
          /* 🟢 Data Table Design (Jokhon transaction thakbe) */
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-800/80 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                  <th className="px-4 py-3">User/Recruiter</th>
                  <th className="px-4 py-3">Plan Type</th>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40 text-sm">
                {transactions.map((tx) => (
                  <tr key={tx._id} className="transition hover:bg-gray-900/40">
                    <td className="flex items-center gap-3 px-4 py-3.5">
                      <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-700 bg-gray-800 text-xs font-bold text-gray-300">
                        {tx.user?.avatar ? (
                          <Image
                            src={tx.user.avatar}
                            alt={tx.user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          tx.user?.name?.charAt(0).toUpperCase() || "U"
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-200">
                          {tx.user?.email}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          {tx.user?.name || tx.user?.company || "Independent"}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge
                        variant="secondary"
                        className="rounded-full border border-gray-800 bg-[#18181b] px-2.5 py-0.5 text-xs font-normal text-gray-300"
                      >
                        {tx.planType}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-gray-400">
                      {tx.transactionId}
                    </td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-gray-200">
                      ${tx.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-400">
                      {tx.date}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          tx.status === "Success"
                            ? "text-emerald-400"
                            : tx.status === "Pending"
                              ? "text-amber-400"
                              : "text-red-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            tx.status === "Success"
                              ? "bg-emerald-400"
                              : tx.status === "Pending"
                                ? "bg-amber-400"
                                : "bg-red-400"
                          }`}
                        ></span>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboardPage
