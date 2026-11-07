"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, FileText } from "lucide-react"

const StatsCard = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Total Users Card */}
      <Card className="border-gray-800 bg-gray-900 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">
            Total Users
          </CardTitle>
          <Users className="h-5 w-5 text-blue-400" />
        </CardHeader>
        <CardContent>
          <p className="mt-1 text-xs text-gray-500">+12% from last month</p>
        </CardContent>
      </Card>

      {/* Active Jobs Card */}
      <Card className="border-gray-800 bg-gray-900 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">
            Active Jobs
          </CardTitle>
          <Briefcase className="h-5 w-5 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="mt-1 text-xs text-gray-500">
            Across various categories
          </p>
        </CardContent>
      </Card>

      {/* Total Applications Card */}
      <Card className="border-gray-800 bg-gray-900 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">
            Total Applications
          </CardTitle>
          <FileText className="h-5 w-5 text-emerald-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">142</div>
          <p className="mt-1 text-xs text-gray-500">Pending review</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsCard
