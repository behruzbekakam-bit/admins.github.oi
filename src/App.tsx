import React, { useState } from 'react';
import { CountryJurisdiction, DeviceMode } from './types';
import { COUNTRIES_DATA } from './data/countries';
import { Header } from './components/Header';
import { ChatView } from './components/ChatView';
import { VoiceConsultantTab } from './components/VoiceConsultantTab';
import { DocumentDrafter } from './components/DocumentDrafter';
import { DocumentAnalyzer } from './components/DocumentAnalyzer';
import { MigrantShield } from './components/MigrantShield';
import { AdminSecurityModal } from './components/AdminSecurityModal';
import { DeviceSimulatorWrapper } from './components/DeviceSimulatorWrapper';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'draft' | 'analyze' | 'shield'>('chat');
  const [selectedCountry, setSelectedCountry] = useState<CountryJurisdiction>(COUNTRIES_DATA[0]);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // When a user in Migrant Shield clicks "Ask AI", pass prompt into Chat
  const handleAskAIFromShield = (question: string) => {
    setActiveTab('chat');
    // Allow slight timeout so chat component is mounted
    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.value = question;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.focus();
      }
    }, 150);
  };

  return (
    <DeviceSimulatorWrapper deviceMode={deviceMode} setDeviceMode={setDeviceMode}>
      <div className="flex flex-col min-h-screen bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Navigation Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          deviceMode={deviceMode}
          setDeviceMode={setDeviceMode}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
          isAdminUnlocked={isAdminUnlocked}
        />

        {/* Tab Views */}
        <main className="flex-1">
          {activeTab === 'chat' && (
            <ChatView
              selectedCountry={selectedCountry}
              onOpenShield={() => setActiveTab('shield')}
              onOpenVoiceTab={() => setActiveTab('voice')}
            />
          )}

          {activeTab === 'voice' && (
            <VoiceConsultantTab selectedCountry={selectedCountry} />
          )}

          {activeTab === 'draft' && (
            <DocumentDrafter selectedCountry={selectedCountry} />
          )}

          {activeTab === 'analyze' && (
            <DocumentAnalyzer selectedCountry={selectedCountry} />
          )}

          {activeTab === 'shield' && (
            <MigrantShield
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              onAskAI={handleAskAIFromShield}
            />
          )}
        </main>

        {/* Admin Security Owner Modal */}
        <AdminSecurityModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          isAdminUnlocked={isAdminUnlocked}
          setIsAdminUnlocked={setIsAdminUnlocked}
        />
      </div>
    </DeviceSimulatorWrapper>
  );
}
