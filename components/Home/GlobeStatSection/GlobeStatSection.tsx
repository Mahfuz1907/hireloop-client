import React from "react";
import Image from "next/image";
import { Briefcase, Building2, Users, Star } from "lucide-react";

export default function GlobeStatsSection() {
  const statsCards = [
    {
      icon: <Briefcase className="w-5 h-5 text-sky-400" />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      icon: <Building2 className="w-5 h-5 text-orange-400" />,
      value: "12K",
      label: "Companies",
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-400" />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      icon: <Star className="w-5 h-5 text-amber-400" />,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <div className="relative w-full bg-[#0a0a0c] text-white pt-10 pb-16 px-4 sm:px-6 overflow-hidden">
      
      {/* Globe & Grid Background Container */}
      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center pt-8 pb-12">
        
        {/* Background Globe Image from public folder */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-80 z-0">
          <Image 
            src="/images/globe.png" 
            alt="Globe Background" 
            width={900} 
            height={600} 
            className="w-full max-w-4xl object-cover"
            priority
          />
        </div>

        {/* Center Message over Globe */}
        <div className="relative z-10 text-center max-w-xl mx-auto mt-12 sm:mt-20 mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
            Assisting over <span className="text-indigo-400">15,000 job seekers</span> find their dream positions.
          </h2>
        </div>

        {/* Stats Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-6">
          {statsCards.map((stat, index) => (
            <div 
              key={index}
              className="bg-[#121216]/90 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl hover:border-zinc-700 transition-all group"
            >
              <div className="p-2.5 bg-zinc-900/80 border border-zinc-800 rounded-xl w-fit mb-6 group-hover:scale-105 transition-transform">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-zinc-400 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}