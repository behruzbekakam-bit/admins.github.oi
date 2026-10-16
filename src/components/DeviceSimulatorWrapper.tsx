import React from 'react';
import { DeviceMode } from '../types';
import { Smartphone, Monitor, Tablet, X } from 'lucide-react';

interface DeviceSimulatorWrapperProps {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  children: React.ReactNode;
}

export const DeviceSimulatorWrapper: React.FC<DeviceSimulatorWrapperProps> = ({
  deviceMode,
  setDeviceMode,
  children,
}) => {
  if (deviceMode === 'desktop') {
    return <div className="w-full min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 py-6 sm:py-10 px-2 flex flex-col items-center justify-start overflow-x-hidden">
      {/* Floating Controller Badge */}
      <div className="mb-4 flex items-center gap-2 bg-slate-950/90 border border-slate-700/80 px-4 py-2 rounded-2xl shadow-2xl backdrop-blur-md">
        <span className="text-xs font-semibold text-slate-400">
          Qurilma Rejimi: <span className="text-amber-400 font-bold">{deviceMode === 'mobile' ? '📱 Telefon (Smartfon)' : '📱 Planshet'}</span>
        </span>
        <div className="h-4 w-px bg-slate-700 mx-1" />
        <button
          onClick={() => setDeviceMode('desktop')}
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-sm"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Kompyuter Rejimiga Qaytish</span>
        </button>
      </div>

      {/* Phone / Tablet Bezel Frame */}
      <div
        className={`relative transition-all duration-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-[10px] sm:border-[12px] border-slate-800 rounded-[48px] bg-slate-950 overflow-hidden flex flex-col ${
          deviceMode === 'mobile'
            ? 'w-full max-w-[420px] h-[860px]'
            : 'w-full max-w-[760px] h-[920px]'
        }`}
      >
        {/* Dynamic Island / Speaker Notch for phone */}
        {deviceMode === 'mobile' && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
            <div className="w-28 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner">
              <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
            </div>
          </div>
        )}

        {/* Interior Screen (Scrollable) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-950 text-slate-100 flex flex-col">
          {children}
        </div>

        {/* Phone Bottom Home Indicator Bar */}
        {deviceMode === 'mobile' && (
          <div className="w-full py-1.5 bg-slate-950 flex justify-center items-center pointer-events-none">
            <div className="w-32 h-1 bg-slate-600/70 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};
