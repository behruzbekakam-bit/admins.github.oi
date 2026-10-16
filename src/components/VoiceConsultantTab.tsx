import React, { useState, useEffect, useRef } from 'react';
import { CountryJurisdiction } from '../types';
import { voiceLab } from '../utils/voiceLab';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Square,
  Sparkles,
  Settings,
  Scale,
  RefreshCw,
  Radio,
  Sliders,
  Play
} from 'lucide-react';

interface VoiceConsultantTabProps {
  selectedCountry: CountryJurisdiction;
}

export const VoiceConsultantTab: React.FC<VoiceConsultantTabProps> = ({ selectedCountry }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState<
    { sender: 'user' | 'assistant'; text: string; timestamp: number }[]
  >([
    {
      sender: 'assistant',
      text: `Assalomu alaykum! Men Uzbek VoiceLab va Adolat AI bilan quvvatlangan advokatman. Mikrofon tugmasini bosing va o'zbek tilida savolingizni bemalol ayting, men sizga aniq qonun moddalari bilan baland va ravon ovozda javob beraman.`,
      timestamp: Date.now(),
    },
  ]);

  // Voice Settings
  const [voiceRate, setVoiceRate] = useState<number>(1.0);
  const [voicePitch, setVoicePitch] = useState<number>(1.0);
  const [useServerTTS, setUseServerTTS] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const speechRecognizerRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = voiceLab.getVoices();
      setAvailableVoices(voices);
      const best = voiceLab.getBestVoice();
      if (best) setSelectedVoiceName(best.name);
    };

    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Audio wave visualizer animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const render = () => {
      step++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const mid = height / 2;

      // Draw active waveform if listening or speaking
      const isActive = isListening || isSpeaking;
      const barsCount = 36;
      const barWidth = 4;
      const gap = (width - barsCount * barWidth) / (barsCount - 1);

      for (let i = 0; i < barsCount; i++) {
        const x = i * (barWidth + gap);
        let amplitude = 6;
        if (isActive) {
          amplitude = Math.sin((step * 0.1) + i * 0.4) * 24 + Math.cos((step * 0.15) + i * 0.2) * 16 + 18;
          if (amplitude < 4) amplitude = 4;
        }

        const gradient = ctx.createLinearGradient(0, mid - amplitude, 0, mid + amplitude);
        if (isSpeaking) {
          gradient.addColorStop(0, '#f59e0b');
          gradient.addColorStop(1, '#d97706');
        } else if (isListening) {
          gradient.addColorStop(0, '#10b981');
          gradient.addColorStop(1, '#059669');
        } else {
          gradient.addColorStop(0, '#334155');
          gradient.addColorStop(1, '#1e293b');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, mid - amplitude / 2, barWidth, amplitude, 2);
        ctx.fill();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isListening, isSpeaking]);

  const handleToggleListening = () => {
    if (isListening) {
      if (speechRecognizerRef.current) speechRecognizerRef.current.stop();
      setIsListening(false);
      return;
    }

    voiceLab.stop();
    setIsSpeaking(false);

    const recognizer = voiceLab.createSpeechRecognizer(
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          handleVoiceSubmit(text);
        }
      },
      (err) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      },
      (listening) => {
        setIsListening(listening);
      }
    );

    if (recognizer) {
      speechRecognizerRef.current = recognizer;
      try {
        recognizer.start();
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Sizning brauzeringizda ovozni aniqlash mavjud emas. Quyidagi matn orqali savol bering.");
    }
  };

  const handleVoiceSubmit = async (queryText: string) => {
    if (!queryText.trim()) return;

    // Add user voice message
    setConversation(prev => [
      ...prev,
      { sender: 'user', text: queryText, timestamp: Date.now() },
    ]);
    setTranscript('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          countryName: selectedCountry.name,
          language: "O'zbek tili (Lotin)",
        }),
      });

      if (!response.ok) throw new Error('Javob olishda xatolik');
      const data = await response.json();

      const replyText = data.reply || '';
      setConversation(prev => [
        ...prev,
        { sender: 'assistant', text: replyText, timestamp: Date.now() },
      ]);

      // Speak assistant response via VoiceLab
      handleSpeakText(replyText);
    } catch (err: any) {
      const errText = `Kechirasiz, aloqa nosozligi yuz berdi (${err.message}).`;
      setConversation(prev => [
        ...prev,
        { sender: 'assistant', text: errText, timestamp: Date.now() },
      ]);
      handleSpeakText(errText);
    }
  };

  const handleSpeakText = (text: string) => {
    voiceLab.stop();
    setIsSpeaking(true);

    voiceLab.speak(text, {
      rate: voiceRate,
      pitch: voicePitch,
      voiceName: selectedVoiceName,
      useServerTTS: useServerTTS,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleStopSpeaking = () => {
    voiceLab.stop();
    setIsSpeaking(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Voice Consultation Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white">Uzbek VoiceLab • Jonli Advokat</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                24/7 Ovozli
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {selectedCountry.flag} {selectedCountry.name} qonunlari bo'yicha jonli ovozli suhbat
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Ovoz Sozlamalari</span>
        </button>
      </div>

      {/* Voice Settings Drawer / Popover */}
      {isSettingsOpen && (
        <div className="mt-3 bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Ovoz Turi / Dvigatel</label>
            <select
              value={useServerTTS ? 'server' : 'browser'}
              onChange={(e) => setUseServerTTS(e.target.value === 'server')}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="server">🌟 VoiceLab Gemini HD (Tavsiya etiladi)</option>
              <option value="browser">💻 Qurilma Brauzer Ovozi</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Ovoz Tezligi: {voiceRate}x
            </label>
            <input
              type="range"
              min="0.75"
              max="1.5"
              step="0.05"
              value={voiceRate}
              onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Ovoz Tembr / Balandlik: {voicePitch}
            </label>
            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.05"
              value={voicePitch}
              onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>
        </div>
      )}

      {/* Interactive Waveform Visualizer Display */}
      <div className="my-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
        {/* Visualizer Canvas */}
        <canvas
          ref={canvasRef}
          width={420}
          height={80}
          className="w-full max-w-md h-20 mb-4"
        />

        {/* Live Status text */}
        <div className="mb-4">
          {isListening ? (
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              Sizni tinglamoqdaman... Savolingizni ayting
            </div>
          ) : isSpeaking ? (
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Volume2 className="w-4 h-4 animate-bounce" />
              Adolat AI javob bermoqda...
            </div>
          ) : (
            <div className="text-slate-400 text-xs sm:text-sm">
              Mikrofon tugmasini bosing va istalgan yuridik savolni ayting
            </div>
          )}
        </div>

        {/* Big Central Microphone Button */}
        <div className="relative">
          {isListening && (
            <div className="absolute inset-0 -m-3 rounded-full bg-emerald-500/20 animate-ping" />
          )}
          <button
            onClick={handleToggleListening}
            className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all transform active:scale-95 ${
              isListening
                ? 'bg-rose-600 text-white shadow-rose-600/40 ring-4 ring-rose-400/30'
                : isSpeaking
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/40 ring-4 ring-amber-400/30'
                : 'bg-gradient-to-tr from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/30'
            }`}
            title={isListening ? "Tinglashni yakunlash" : "Ovozli savol berish"}
          >
            {isListening ? (
              <MicOff className="w-10 h-10" />
            ) : isSpeaking ? (
              <Square className="w-8 h-8 fill-current" onClick={(e) => { e.stopPropagation(); handleStopSpeaking(); }} />
            ) : (
              <Mic className="w-10 h-10 stroke-[2.3]" />
            )}
          </button>
        </div>

        {transcript && (
          <div className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-amber-200 text-xs max-w-md border border-slate-700">
            "{transcript}"
          </div>
        )}
      </div>

      {/* Recent Spoken Conversation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg max-h-64 overflow-y-auto space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Ovozli Suhbat Tarixi</span>
          {isSpeaking && (
            <button
              onClick={handleStopSpeaking}
              className="text-rose-400 hover:text-rose-300 text-[11px] font-semibold flex items-center gap-1"
            >
              <Square className="w-3 h-3 fill-current" /> Ovozni To'xtatish
            </button>
          )}
        </div>

        {conversation.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl text-xs sm:text-sm ${
              item.sender === 'user'
                ? 'bg-amber-600/20 border border-amber-500/30 text-amber-100 ml-6'
                : 'bg-slate-950 border border-slate-800 text-slate-200 mr-6'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
              <span className="font-bold text-amber-400">
                {item.sender === 'user' ? 'Sizning ovozli savolingiz' : 'Adolat AI Advokat'}
              </span>
              {item.sender === 'assistant' && (
                <button
                  onClick={() => handleSpeakText(item.text)}
                  className="flex items-center gap-1 text-slate-300 hover:text-white"
                >
                  <Play className="w-3 h-3 text-amber-400" /> Qayta eshitish
                </button>
              )}
            </div>
            <p className="leading-relaxed whitespace-pre-wrap">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
