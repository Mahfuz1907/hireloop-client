"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { SlidersHorizontal } from "lucide-react"

const FilterSideBar = () => {
  return (
    <div className="space-y-6 lg:col-span-1">
      <div className="space-y-6 rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-white uppercase">
            <SlidersHorizontal className="h-4 w-4 text-indigo-400" /> Filters
          </h3>
          <span className="cursor-pointer text-[11px] text-indigo-400 hover:underline">
            Reset
          </span>
        </div>

        <Separator className="bg-gray-800/80" />

        {/* Job Type Filter */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
            Job Type
          </h4>

          <div className="space-y-3 text-xs text-gray-300">
            <label className="group flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Checkbox
                  defaultChecked
                  className="border-gray-700 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600"
                />
                <span className="transition group-hover:text-white">
                  Full-time
                </span>
              </div>
              <span className="text-[11px] text-gray-500">1.2k</span>
            </label>

            <label className="group flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Checkbox className="border-gray-700 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600" />
                <span className="transition group-hover:text-white">
                  Contract
                </span>
              </div>
              <span className="text-[11px] text-gray-500">432</span>
            </label>

            <label className="group flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Checkbox className="border-gray-700 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600" />
                <span className="transition group-hover:text-white">
                  Freelance
                </span>
              </div>
              <span className="text-[11px] text-gray-500">156</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSideBar
