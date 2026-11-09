"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { SlidersHorizontal } from "lucide-react"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { useContext } from "react"
import { JobContext } from "@/Context/JobContext"

const FilterSideBar = () => {
  const { filter, setFilter } = useContext(JobContext)

  const handleRefresh = () => {
    setFilter([])
  }

  const handleFilter = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const form = Object.fromEntries(formData)
    setFilter(Object.keys(form))
  }
  return (
    <div className="space-y-6 lg:col-span-1">
      <FieldSet className="space-y-6 rounded-2xl border border-gray-800/80 bg-[#121216] p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-white uppercase">
            <SlidersHorizontal className="h-4 w-4 text-indigo-400" /> Filters
          </h3>
          <span
            onClick={handleRefresh}
            className="cursor-pointer text-[11px] text-indigo-400 hover:underline"
          >
            Reset
          </span>
        </div>
        <Separator className="bg-gray-800/80" />
        <form onClick={handleFilter}>
          <FieldGroup className="flex items-center justify-between">
            <Field orientation="horizontal">
              <Checkbox
                id="full-time"
                name="Full-time"
                checked={filter.includes("Full-time")}
              />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj-checkbox"
                className="font-normal"
              >
                Full Time
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="part-time"
                name="Part-time"
                checked={filter.includes("Part-time")}
              />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj-checkbox"
                className="font-normal"
              >
                Part Time
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="contract"
                name="Contract"
                checked={filter.includes("Contract")}
              />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj-checkbox"
                className="font-normal"
              >
                Contract
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="internship"
                name="Internship"
                checked={filter.includes("Internship")}
              />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj-checkbox"
                className="font-normal"
              >
                Internship
              </FieldLabel>
            </Field>
          </FieldGroup>
        </form>
      </FieldSet>
    </div>
  )
}

export default FilterSideBar
