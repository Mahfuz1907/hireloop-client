"use client"

interface PaginationTypes {
  pageNumber: number
  totalPages: number
  handlePageChange: (page: number) => void
}

const PaginationComponent = ({
  pageNumber,
  totalPages,
  handlePageChange,
}: PaginationTypes) => {
  return (
    <div className="mt-8 flex w-full items-center gap-4">
      <button
        onClick={() => handlePageChange(pageNumber - 1)}
        disabled={pageNumber === 1}
        className="rounded-xl bg-indigo-600 px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm text-gray-300">
        Page {pageNumber} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(pageNumber + 1)}
        disabled={pageNumber === totalPages}
        className="rounded-xl bg-indigo-600 px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default PaginationComponent
