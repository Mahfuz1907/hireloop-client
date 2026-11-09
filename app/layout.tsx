import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import NavFootWrapper from "@/components/NavFootWrapper"
import { Toaster } from "@/components/ui/sonner"
import JobProvider from "@/Context/JobContext"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "HireLoop",
  icons: {
    icon: "/globe.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <JobProvider>
            <NavFootWrapper>
              {/* main components */}
              <div className="grow">{children}</div>
            </NavFootWrapper>
            <Toaster />
          </JobProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
