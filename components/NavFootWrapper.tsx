"use client";

import React from "react";
import { usePathname } from "next/navigation";
// Apnar Navbar ebong Footer er path thik moto diye diben
import Navbar from "@/components/Navbar/Navbar"; 
import Footer from "@/components/Footer/Footer";

export default function NavFootWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Je pageগুলোতে navbar/footer rakhte chan na, segulo ekhane check korbe
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}
        {children}
      {!isAuthPage && <Footer />}
    </>
  );
}