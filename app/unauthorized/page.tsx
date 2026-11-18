import Link from "next/link"
import { ShieldAlert, ArrowLeft, Home } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900 p-8 text-center shadow-2xl">
        {/* Icon Header */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
          <ShieldAlert className="h-8 w-8 text-red-500" />
        </div>

        {/* Title & Description */}
        <span className="text-xs font-semibold tracking-wider text-red-400 uppercase">
          403 Access Denied
        </span>
        <h1 className="mt-1 mb-3 text-2xl font-bold text-white">
          Unauthorized Access
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-gray-400">
          You don&apos;t have permission to access this page. Please make sure
          you are logged in with the correct account or return to safety.
        </p>

        {/* Navigation Actions */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-700 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
