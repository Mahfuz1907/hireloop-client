import { Suspense } from "react"
import AdminPage from "./AdminPage"
import { Spinner } from "@/components/ui/spinner"

export default function AdminSuspense() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-6">
          <Spinner className="mx-auto my-20 size-6" />
        </div>
      }
    >
      <AdminPage />
    </Suspense>
  )
}
