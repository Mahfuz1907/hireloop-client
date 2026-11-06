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
import { Briefcase, User, Mail, Lock, ArrowRight } from "lucide-react"
import Image from "next/image"
import { signUp } from "@/app/lib/auth-client"
import { toast } from "sonner"

export default function SignUpPage() {
  const router = useRouter()
  const [role, setRole] = useState<"seeker" | "recruiter">("seeker")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userData = {
      ...formData,
      role: role,
    }

    const { data, error } = await signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    })

    if (data) {
      toast.success("User created successfully", { position: "top-center" })
      router.push("/")
    } else if (error) {
      toast.error("User creation failed", { position: "top-center" })
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
            Create your account to get started
          </p>
        </div>

        <Card className="rounded-2xl border-zinc-800 bg-[#121216] text-white shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center text-2xl font-bold tracking-tight">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center text-sm text-zinc-400">
              Choose your role and enter your details below
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Role Selector Tabs */}
            <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-1">
              <button
                type="button"
                onClick={() => setRole("seeker")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-medium transition-all sm:text-sm ${
                  role === "seeker"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <User className="h-4 w-4" />
                Job Seeker
              </button>

              <button
                type="button"
                onClick={() => setRole("recruiter")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-medium transition-all sm:text-sm ${
                  role === "recruiter"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Briefcase className="h-4 w-4" />
                Recruiter
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-zinc-300">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute top-3.5 left-3 h-4 w-4 text-zinc-500" />
                  <Input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="rounded-xl border-zinc-800 bg-[#18181c] py-5 pl-10 text-white focus-visible:ring-indigo-600"
                  />
                </div>
              </div>

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
                <Label className="text-xs font-medium text-zinc-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute top-3.5 left-3 h-4 w-4 text-zinc-500" />
                  <Input
                    type="password"
                    name="password"
                    required
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className="rounded-xl border-zinc-800 bg-[#18181c] py-5 pl-10 text-white focus-visible:ring-indigo-600"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-6 font-medium text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500"
              >
                Create {role === "seeker" ? "Seeker" : "Recruiter"} Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-zinc-800/80 py-4">
            <p className="text-xs text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
