import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0c] text-zinc-400 border-t border-zinc-800/60 pt-16 pb-12 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        
        {/* Logo & Tagline */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-flex items-center gap-1 text-3xl font-bold tracking-tight">
            <span className="text-sky-400">hire</span>
            <span className="text-orange-500 font-extrabold">loop</span>
          </Link>
          <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
            The AI-native career platform. Built for people who take their work seriously.
          </p>
        </div>

        {/* Product Column */}
        <div className="space-y-4">
          <h3 className="text-indigo-400 font-semibold text-sm tracking-wide">Product</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Job discovery</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Worker AI</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Companies</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Salary data</Link></li>
          </ul>
        </div>

        {/* Navigations Column */}
        <div className="space-y-4">
          <h3 className="text-indigo-400 font-semibold text-sm tracking-wide">Navigations</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Help center</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Career library</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="space-y-4">
          <h3 className="text-indigo-400 font-semibold text-sm tracking-wide">Resources</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Brand Guideline</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Newsroom</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Social Icons & Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Social Icons (Using SVG) */}
        <div className="flex items-center gap-3">
          {/* Facebook */}
          <Link href="#" className="w-10 h-10 rounded-xl bg-[#121216] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </Link>

          {/* Globe / Website */}
          <Link href="#" className="w-10 h-10 rounded-xl bg-[#121216] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </Link>

          {/* LinkedIn */}
          <Link href="#" className="w-10 h-10 rounded-xl bg-[#121216] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </Link>
        </div>

        {/* Copyright & Policy */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-zinc-500 text-center sm:text-left">
          <span>Copyright © 2026 HireLoop. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <Link href="#" className="hover:text-zinc-300 transition-colors">Terms & Policy</Link>
            <span>-</span>
            <Link href="#" className="hover:text-zinc-300 transition-colors">Privacy Guideline</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}