import { redirect } from "next/navigation"
import Link from "next/link"
import { stripe } from "@/lib/stripe"
import { CheckCircle2, ArrowRight, LayoutDashboard, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CheckoutVerify } from "@/app/lib/actions/payment"

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedSearchParams = await searchParams
  const session_id = resolvedSearchParams?.session_id

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)")
  }

  const { status, payment_status, customer_email, metadata, payment_intent } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    })

  if (status === "open") {
    return redirect("/")
  }

  if (status === "complete" && payment_status === "paid") {
    console.log({
      status,
      payment_status,
      customer_email,
      metadata,
      payment_intent,
    })

    const result = await CheckoutVerify(session_id)
    console.log(result)

    return (
      <div
        id="success"
        className="flex min-h-screen items-center justify-center bg-[#09090b] p-4 font-sans text-white sm:p-6"
      >
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#121216] p-6 text-center shadow-2xl sm:p-8">
          {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

          {/* সাকসেস আইকন */}
          <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 sm:h-20 sm:w-20">
            <CheckCircle2 className="h-8 w-8 animate-pulse text-emerald-400 sm:h-10 sm:w-10" />
          </div>

          {/* হেডার টেক্সট */}
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Payment Successful!
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-zinc-400">
            We appreciate your business! A confirmation email has been sent to{" "}
            <span className="font-medium text-emerald-400">
              {customer_email}
            </span>
            .
          </p>

          {/* সাপোর্ট বা ইনফো বক্স */}
          <div className="mb-6 space-y-2 rounded-2xl border border-zinc-800/60 bg-[#18181b] p-4 text-left text-xs text-zinc-400 sm:text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>Have questions? Contact us at:</span>
            </div>
            <a
              href="mailto:orders@example.com"
              className="block pl-6 font-medium text-blue-400 hover:underline"
            >
              orders@example.com
            </a>
          </div>

          {/* ড্যাশবোর্ডে যাওয়ার বাটন */}
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/seeker">
              <Button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-semibold text-black shadow-lg shadow-emerald-500/10 transition-all hover:bg-emerald-600">
                <LayoutDashboard className="h-4 w-4" />
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}
