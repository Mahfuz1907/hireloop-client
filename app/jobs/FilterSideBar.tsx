"use client"

import { Briefcase, Layers, MapPin, SlidersHorizontal } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { useJobsSearch } from "./useJobsSearch"

const filterGroups = [
  {
    key: "jobType",
    label: "Job Type",
    icon: Briefcase,
    options: [
      { value: "any", label: "Any" },
      { value: "Full-time", label: "Full-time" },
      { value: "Part-time", label: "Part-time" },
      { value: "Contract", label: "Contract" },
      { value: "Internship", label: "Internship" },
    ],
  },
  {
    key: "category",
    label: "Category",
    icon: Layers,
    options: [
      { value: "any", label: "Any" },
      { value: "engineering", label: "Engineering & Tech" },
      { value: "design", label: "Product & Design" },
      { value: "marketing", label: "Marketing & Growth" },
    ],
  },
  {
    key: "isRemote",
    label: "Work Place",
    icon: MapPin,
    options: [
      { value: "any", label: "Any" },
      { value: "remote", label: "Remote" },
      { value: "onsite", label: "On-site" },
    ],
  },
] as const

type FilterKey = (typeof filterGroups)[number]["key"]

// Map a sidebar selection to its URL query param value
// (null removes the param from the URL).
const toUrlValue = (key: FilterKey, value: string): string | null => {
  if (key === "isRemote") {
    if (value === "remote") return "true"
    if (value === "onsite") return "false"
    return null
  }
  return value === "any" ? null : value
}

// Map a URL query param back to the sidebar selection.
const fromUrlValue = (key: FilterKey, urlValue: string | null): string => {
  if (key === "isRemote") {
    if (urlValue === "true") return "remote"
    if (urlValue === "false") return "onsite"
    return "any"
  }
  return urlValue ?? "any"
}

const FilterSideBar = () => {
  const { searchParams, updateParams } = useJobsSearch()

  const handleReset = () => {
    updateParams({ jobType: null, category: null, isRemote: null })
  }

  const handleSelect = (key: FilterKey, value: string) => {
    updateParams({ [key]: toUrlValue(key, value) })
  }

  return (
    <div className="space-y-6 lg:col-span-1">
      <FieldSet className="space-y-6 rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-xl">
        <FieldLegend className="sr-only">Filter Jobs</FieldLegend>

        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-white uppercase">
            <SlidersHorizontal className="h-4 w-4 text-indigo-400" /> Filters
          </h3>
          <button
            type="button"
            onClick={handleReset}
            className="cursor-pointer text-[11px] text-indigo-400 hover:underline"
          >
            Reset
          </button>
        </div>

        <Separator className="bg-gray-800/80" />

        <div className="divide-y divide-gray-800/80">
          {filterGroups.map((group) => {
            const selected = fromUrlValue(
              group.key,
              searchParams.get(group.key)
            )
            const Icon = group.icon

            return (
              <div
                key={group.key}
                className="space-y-3 py-4 first:pt-0 last:pb-0"
              >
                <h4
                  id={`${group.key}-label`}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase"
                >
                  <Icon className="h-3.5 w-3.5" /> {group.label}
                </h4>

                <RadioGroup
                  value={selected}
                  onValueChange={(value) => handleSelect(group.key, value)}
                  aria-labelledby={`${group.key}-label`}
                  className="gap-1.5"
                >
                  {group.options.map((option) => {
                    const id = `${group.key}-${option.value}`
                    return (
                      <FieldLabel
                        key={option.value}
                        htmlFor={id}
                        className="w-full cursor-pointer rounded-lg px-2 py-1.5 font-normal text-gray-300 transition-colors hover:text-white has-data-checked:bg-indigo-500/10 has-data-checked:text-white dark:has-data-checked:bg-indigo-500/10"
                      >
                        <RadioGroupItem
                          id={id}
                          value={option.value}
                          className="border-gray-600 data-checked:border-indigo-500 data-checked:bg-indigo-600 group-has-[:focus-visible]/field-label:data-checked:border-indigo-500 dark:data-checked:border-indigo-500 dark:data-checked:bg-indigo-600 [&_[data-slot=radio-group-indicator]_span]:bg-white"
                        />
                        {option.label}
                      </FieldLabel>
                    )
                  })}
                </RadioGroup>
              </div>
            )
          })}
        </div>
      </FieldSet>
    </div>
  )
}

export default FilterSideBar
