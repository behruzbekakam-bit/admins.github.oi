import React, { useState } from 'react';
import { Logo } from './Logo';
import { COUNTRIES_DATA } from '../data/countries';
import { CountryJurisdiction, DeviceMode } from '../types';
import {
  MessageSquare,
  Mic,
  FileText,
  FileSearch,
  ShieldAlert,
  Smartphone,
  Monitor,
  Tablet,
  Lock,
  Unlock,
  Menu,
  X,
  Globe2,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'chat' | 'voice' | 'draft' | 'analyze' | 'shield';
  setActiveTab: (tab: 'chat' | 'voice' | 'draft' | 'analyze' | 'shield') => void;
  selectedCountry: CountryJurisdiction;
  setSelectedCountry: (country: CountryJurisdiction) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  onOpenAdminModal: () => void;
  isAdminUnlocked: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCountry,
  setSelectedCountry,
  deviceMode,
  setDeviceMode,
  onOpenAdminModal,
  isAdminUnlocked,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const tabs = [
    { id: 'chat', label: 'Advokat AI', icon: MessageSquare, badge: 'Onlayn' },
    { id: 'voice', label: 'Ovozli Muloqot', icon: Mic, badge: 'VoiceLab' },
    { id: 'draft', label: 'Hujjat Tuzuvchi', icon: FileText, badge: '18+ Shablon' },
    { id: 'analyze', label: 'Hujjat Tahlili', icon: FileSearch, badge: 'Ekspertiza' },
    { id: 'shield', label: 'Musofirlar Qalqoni', icon: ShieldAlert, badge: '11 Davlat' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('chat')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
            >
              <Logo size="md" />
            </button>

            {/* Country Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-amber-500/50 text-xs sm:text-sm font-medium text-slate-200 transition-all shadow-sm"
                title="Yurisdiksiyani tanlash"
              >
                <span className="text-base sm:text-lg">{selectedCountry.flag}</span>
                <span className="hidden sm:inline font-semibold">{selectedCountry.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isCountryDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 p-2 max-h-96 overflow-y-auto"
                  onClick={() => setIsCountryDropdownOpen(false)}
                >
                  <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
                    <span>Qonunchilik davlatini tanlang</span>
                    <Globe2 className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="mt-1 space-y-1">
                    {COUNTRIES_DATA.map((country) => (
                      <button
                        key={country.id}
                        onClick={() => setSelectedCountry(country)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs sm:text-sm transition-all ${
                          selectedCountry.id === country.id
                            ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                          {country.code}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-slate-950/20 text-slate-900'
                          : 'bg-slate-800 text-amber-400 border border-slate-700'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Device Mode Switcher & Admin Protection */}
          <div className="flex items-center gap-2">
            {/* Device Switcher (Mobile / Desktop Simulator) */}
            <div className="hidden sm:flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800" title="Qurilma ko'rinishi">
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  deviceMode === 'mobile'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="📱 Telefon rejimiga moslash"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  deviceMode === 'tablet'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="📱 Planshet rejimi"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  deviceMode === 'desktop'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="💻 Kompyuter to'liq ekran rejimi"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            {/* Admin Security PIN Protection Button */}
            <button
              onClick={onOpenAdminModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isAdminUnlocked
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-900 text-slate-300 border-slate-700/80 hover:border-amber-500/40'
              }`}
              title={isAdminUnlocked ? "Admin rejimi ochiq" : "Xavfsizlik: Faqat egasi sozlay oladi"}
            >
              {isAdminUnlocked ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">Admin Ochiq</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">Xavfsizlik Qulfi</span>
                </>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-800 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Device switcher */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400 px-1">
              <span>Qurilma ko'rinishi:</span>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                    deviceMode === 'mobile' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  📱 Telefon
                </button>
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                    deviceMode === 'desktop' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  💻 Kompyuter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
