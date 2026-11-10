"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Mail, Lock, ArrowRight } from "lucide-react"
import Image from "next/image"
import { signIn } from "@/app/lib/auth-client"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data, error } = await signIn.email({
      email: formData.email,
      password: formData.password,
      rememberMe: true,
    })

    if (data) {
      toast.success("User logged in successfully", { position: "top-center" })
      router.push("/")
    } else if (error) {
      toast.error("User log in failed", { position: "top-center" })
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0c] px-4 py-12 text-white">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href={"/"}>
            <Image
              src="/images/logo.png"
              alt="HireLoop Logo"
              width={120}
              height={36}
              priority
            />
          </Link>
          <p className="mt-2 text-sm text-zinc-400">
            Welcome back! Please enter your details
          </p>
        </div>

        <Card className="rounded-2xl border-zinc-800 bg-[#121216] text-white shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center text-2xl font-bold tracking-tight">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-sm text-zinc-400">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-zinc-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute top-3.5 left-3 h-4 w-4 text-zinc-500" />
                  <Input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-xl border-zinc-800 bg-[#18181c] py-5 pl-10 text-white focus-visible:ring-indigo-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-zinc-300">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute top-3.5 left-3 h-4 w-4 text-zinc-500" />
                  <Input
                    type="password"
                    name="password"
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="rounded-xl border-zinc-800 bg-[#18181c] py-5 pl-10 text-white focus-visible:ring-indigo-600"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-6 font-medium text-[#fff] shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500"
              >
                Sign In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-zinc-800/80 py-4">
            <p className="text-xs text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
