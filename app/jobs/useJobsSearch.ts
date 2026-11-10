"use client"

import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

// Shared helper for the /jobs page. Search + filter state lives in the URL
// query params (search, location, jobType, category, isRemote) so the search
// bar and the sidebar filters always combine and stay shareable.
export function useJobsSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Pushes a new URL with the given params updated. Empty-string or null
  // values remove the param from the URL entirely.
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        if (value) params.set(key, value)
        else params.delete(key)
      }

      const query = params.toString()
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  return { searchParams, updateParams }
}
