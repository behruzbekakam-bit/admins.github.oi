import React from 'react';
import { Scale, Shield } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-slate-950 shadow-lg shadow-amber-500/20 border border-amber-400/40">
        <Scale className={`${iconSizes[size]} text-slate-950 stroke-[2.2]`} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" title="AI Advokat Faol" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`${textSizes[size]} font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent font-['Plus_Jakarta_Sans']`}>
            ADOLAT
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold tracking-wider">
            AI
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
          Oliy Advokat & Yuridik Qalqon
        </span>
      </div>
    </div>
  );
};
