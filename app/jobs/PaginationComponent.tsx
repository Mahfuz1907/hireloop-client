"use client"

import { Dispatch, SetStateAction } from "react"

interface PaginationTypes {
  pageNumber: number
  setPageNumber: Dispatch<SetStateAction<number>>
  totalPages: number
}

const PaginationComponent = ({
  pageNumber,
  setPageNumber,
  totalPages,
}: PaginationTypes) => {
  return (
    <div className="mt-8 flex w-full items-center gap-4">
      <button
        onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
        disabled={pageNumber === 1}
        className="rounded-xl bg-indigo-600 px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm text-gray-300">
        Page {pageNumber} of {totalPages}
      </span>

      <button
        onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
        disabled={pageNumber === totalPages}
        className="rounded-xl bg-indigo-600 px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default PaginationComponent
