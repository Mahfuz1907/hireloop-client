"use client"

import React, { useState } from "react"
import Link from "next/link" // or react-router-dom Link
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { signOut, useSession } from "@/app/lib/auth-client"
import { Avatar, AvatarBadge, AvatarFallback } from "../ui/avatar"
import { Spinner } from "../ui/spinner"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const UserInfo = () => {
  const { data: session, isPending } = useSession()
  const user = session?.user
  const userRole = user?.role
  const userLogo = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return {
    user: user,
    userRole: userRole,
    userLogo: userLogo,
    isPending: isPending,
  }
}

const UserImage = () => {
  const isLoggedIn = UserInfo()

  return (
    <div className="flex flex-row items-center justify-start gap-5">
      <Avatar>
        <AvatarFallback>{isLoggedIn.userLogo}</AvatarFallback>
        <AvatarBadge
          className={`${isLoggedIn.userRole === "admin" ? "bg-green-600 dark:bg-green-800" : isLoggedIn.userRole === "seeker" ? "bg-blue-600 dark:bg-blue-800" : "bg-red-600 dark:bg-red-800"}`}
        />
      </Avatar>
      <h1 className="font-mediums text-base">
        Welcome{" "}
        <span
          className={`${isLoggedIn.userRole === "admin" ? "text-green-600 dark:text-green-800" : isLoggedIn.userRole === "seeker" ? "text-blue-600 dark:text-blue-800" : "text-red-600 dark:text-red-800"}`}
        >
          {isLoggedIn.user?.name}
        </span>
      </h1>
    </div>
  )
}

const LogOutButton = () => {
  const router = useRouter()
  return (
    <Button
      onClick={() =>
        signOut({
          fetchOptions: {
            onSuccess: () => {
              toast.success("User logged out successfully", {
                position: "top-center",
              })
              router.push("/login")
            },
          },
        })
      }
      className="text-sm font-medium text-red-400 transition-colors hover:text-red-300"
    >
      Log Out
    </Button>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const isLoggedIn = UserInfo()

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/companies" },
    { name: "Pricing", href: "/pricing" },
  ]

  if (isLoggedIn.isPending) {
    return (
      <div className="flex items-center gap-4 bg-[#121214] text-white">
        <Spinner className="mx-auto my-5 size-6" />
      </div>
    )
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#121214] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="HireLoop Logo"
            width={120}
            height={36}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-700" />

          <div className="flex items-center gap-4">
            {isLoggedIn.user ? (
              <>
                <UserImage />
                <LogOutButton />
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Log In
              </Link>
            )}

            <Button className="rounded-xl bg-indigo-600 px-5 py-2 font-medium text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500">
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Navigation (Hamburger Menu) */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-300 hover:text-white"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="border-zinc-800 bg-[#121214] text-white"
            >
              <SheetHeader>
                <Image
                  src="/images/logo.png"
                  alt="HireLoop Logo"
                  width={120}
                  height={36}
                  priority
                />
              </SheetHeader>

              <div className="mt-8 ml-5 flex flex-col gap-6">
                <div className="flex flex-col gap-4 text-base font-medium text-zinc-300">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="py-1 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <hr className="border-zinc-800" />

                <div className="flex flex-col gap-3">
                  {isLoggedIn.user ? (
                    <>
                      <UserImage />
                      <div
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center"
                      >
                        <LogOutButton />
                      </div>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="py-2 text-center font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                    >
                      Log In
                    </Link>
                  )}

                  <Button
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded-xl bg-indigo-600 py-2 font-medium text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
