import {
  ArrowLeft,
  Lock,
  CreditCard,
  ChevronDown,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>
}) {
  const { canceled } = await searchParams

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready."
    )
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#09090b] p-4 font-sans text-white selection:bg-blue-600 selection:text-[#fff] md:p-8 lg:p-12">
      {/* ১. টপ হেডার বার */}
      <div className="mx-auto mb-8 flex w-full max-w-6xl items-center justify-between">
        <div className="flex items-center gap-4 text-zinc-400">
          <Link href="/dashboard" className="transition hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="rounded-lg border border-zinc-800 bg-[#121216] p-2 text-zinc-300">
            <Lock className="h-4 w-4" />
          </div>
        </div>

        {/* Sandbox Badge */}
        <div className="rounded-md border border-zinc-700/80 bg-[#18181b] px-3 py-1 text-[11px] font-bold tracking-widest text-zinc-300 uppercase">
          SANDBOX
        </div>
      </div>

      {/* ২. মেইন কন্টেন্ট গ্রিড (Left: Plan Info, Right: Payment Form) */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
        {/* বাম পাশ: কারেন্সি সিলেকশন এবং প্ল্যান সামারি */}
        <div className="space-y-6 lg:col-span-5">
          {/* কারেন্সি সিলেক্ট অপশন */}
          <div>
            {/* USD Card */}
            <button className="flex w-full cursor-pointer flex-col justify-between rounded-xl border border-white bg-[#121216] p-4 text-left shadow-md transition">
              <span className="text-xl">🇺🇸</span>
              <span className="mt-3 text-base font-bold text-white">
                $20.00
              </span>
            </button>
          </div>

          <hr className="my-6 border-zinc-800/80" />

          {/* প্ল্যান ডিটেইলস */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Hireloop Pro Plan
              </h2>
              <p className="mt-0.5 text-sm text-zinc-400">
                Access to all features
              </p>
            </div>
            <div className="text-lg font-bold text-white">$20.00</div>
          </div>

          {/* Pay Button */}
          <form action="/api/checkout_sessions" method="POST">
            <section>
              <button
                type="submit"
                role="link"
                className="w-full cursor-pointer rounded-xl bg-blue-600 py-4 text-sm font-semibold tracking-wide text-[#ffffff] shadow-lg transition hover:bg-blue-700"
              >
                Checkout $20
              </button>
            </section>
          </form>
        </div>
      </div>

      {/* ফুটার নোট */}
      <div className="mx-auto mt-12 flex w-full max-w-6xl items-center justify-center gap-2 text-center text-xs text-zinc-600">
        <ShieldCheck className="h-4 w-4 text-zinc-500" />
        <span>Secured by Stripe • Powered by HireLoop</span>
      </div>
    </div>
  )
}
