"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Lock,
  CreditCard,
  ChevronDown,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT")
  const [saveInfo, setSaveInfo] = useState(false)

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
            <label className="mb-3 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Choose a currency:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* BDT Card */}
              <button
                onClick={() => setCurrency("BDT")}
                className={`flex cursor-pointer flex-col justify-between rounded-xl border p-4 text-left transition ${
                  currency === "BDT"
                    ? "border-white bg-[#121216] shadow-md"
                    : "border-zinc-800 bg-[#121216]/50 hover:border-zinc-700"
                }`}
              >
                <span className="text-xl">🇧🇩</span>
                <span className="mt-3 text-base font-bold text-white">
                  BDT 2,553.33
                </span>
              </button>

              {/* USD Card */}
              <button
                onClick={() => setCurrency("USD")}
                className={`flex cursor-pointer flex-col justify-between rounded-xl border p-4 text-left transition ${
                  currency === "USD"
                    ? "border-white bg-[#121216] shadow-md"
                    : "border-zinc-800 bg-[#121216]/50 hover:border-zinc-700"
                }`}
              >
                <span className="text-xl">🇺🇸</span>
                <span className="mt-3 text-base font-bold text-white">
                  $20.00
                </span>
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-500">1 USD = 127.6665 BDT</p>
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
            <div className="text-lg font-bold text-white">
              {currency === "BDT" ? "BDT 2,553.33" : "$20.00"}
            </div>
          </div>
        </div>

        {/* ডান পাশ: স্ট্রাইপ স্টাইল পেমেন্ট ফর্ম */}
        <div className="space-y-6 lg:col-span-7">
          {/* Express Checkout (Link Button) */}
          <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#00D924] px-4 py-3.5 font-bold text-[#000] shadow-lg transition hover:bg-[#00c220]">
            <span className="text-lg font-extrabold tracking-wider lowercase">
              🔗 link
            </span>
            <span className="rounded bg-black/10 px-2 py-0.5 font-mono text-xs">
              VISA 4242
            </span>
          </button>

          {/* OR Divider */}
          <div className="relative flex items-center py-2">
            <div className="grow border-t border-zinc-800"></div>
            <span className="mx-4 shrink text-xs font-medium tracking-wider text-zinc-500 uppercase">
              or
            </span>
            <div className="grow border-t border-zinc-800"></div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-zinc-300">
              Contact information
            </label>
            <div>
              <label className="mb-1.5 block text-xs text-zinc-400">
                Email
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full rounded-xl border border-zinc-800 bg-[#121216] px-4 py-3 text-sm text-white transition placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method Container */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-zinc-300">
              Payment method
            </label>

            <div className="space-y-4 rounded-2xl border border-zinc-800 bg-[#121216] p-5 shadow-xl">
              {/* Card Header */}
              <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-2 text-sm font-medium text-zinc-300">
                <CreditCard className="h-4 w-4 text-zinc-400" />
                <span>Card</span>
              </div>

              {/* Card Information Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                    Card Information
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      className="w-full rounded-xl border border-zinc-800/80 bg-[#18181b] px-4 py-3 pr-20 font-mono text-sm tracking-wider text-white transition placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                    />
                    {/* Card Brand Icons Placeholder */}
                    <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 opacity-60">
                      <div className="h-3.5 w-5 rounded-xs bg-blue-600"></div>
                      <div className="h-3.5 w-5 rounded-xs bg-red-600"></div>
                      <div className="h-3.5 w-5 rounded-xs bg-amber-500"></div>
                    </div>
                  </div>
                </div>

                {/* Expiry & CVC */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full rounded-xl border border-zinc-800/80 bg-[#18181b] px-4 py-3 font-mono text-sm text-white transition placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full rounded-xl border border-zinc-800/80 bg-[#18181b] px-4 py-3 font-mono text-sm text-white transition placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                  />
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name on card"
                    className="w-full rounded-xl border border-zinc-800/80 bg-[#18181b] px-4 py-3 text-sm text-white transition placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                  />
                </div>

                {/* Country or Region */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                    Country or Region
                  </label>
                  <div className="relative">
                    <select className="w-full cursor-pointer appearance-none rounded-xl border border-zinc-800/80 bg-[#18181b] px-4 py-3 text-sm text-white transition focus:border-zinc-600 focus:outline-none">
                      <option>Bangladesh</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Information Checkbox */}
          <div className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-[#121216] p-4">
            <input
              type="checkbox"
              id="save-info"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
              className="mt-1 h-4 w-4 cursor-pointer rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-0"
            />
            <label
              htmlFor="save-info"
              className="cursor-pointer text-xs text-zinc-300"
            >
              <span className="mb-0.5 block font-semibold text-white">
                Save my information for faster checkout
              </span>
              <span className="text-zinc-500">
                Pay securely on this site and everywhere Link is accepted.
              </span>
            </label>
          </div>

          {/* Pay Button */}
          <button className="w-full cursor-pointer rounded-xl bg-blue-600 py-4 text-sm font-semibold tracking-wide text-[#fff] shadow-lg transition hover:bg-blue-700">
            Pay
          </button>
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
