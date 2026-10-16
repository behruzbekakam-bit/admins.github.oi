import React, { useState, useRef, useEffect } from 'react';
import { CountryJurisdiction, Message } from '../types';
import { voiceLab } from '../utils/voiceLab';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  Square,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Sparkles,
  PhoneCall,
  Scale,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface ChatViewProps {
  selectedCountry: CountryJurisdiction;
  onOpenShield: () => void;
  onOpenVoiceTab: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  selectedCountry,
  onOpenShield,
  onOpenVoiceTab,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Assalomu alaykum! Men - "Adolat AI" Oliy toifali advokatiman.

Hozirda tanlangan qonunchilik: ${selectedCountry.flag} **${selectedCountry.name}**.
Men O'zbekiston hamda xorijdagi vatandoshlarimiz uchun amaldagi qonunlar, kodekslar va aniq moddalar asosida to'g'ri va lo'nda yuridik maslahat beraman.

Qanday huquqiy muammo yoki savol sizni qiynamoqda? Mikrofondan foydalanishingiz yoki quyidagi tezkor mavzulardan birini tanlashingiz mumkin.`,
      timestamp: Date.now(),
      articlesCited: selectedCountry.criticalLaws.map(l => l.code),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechRecognizerRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Voice Input via Web Speech API
  const toggleListening = () => {
    if (isListening) {
      if (speechRecognizerRef.current) {
        speechRecognizerRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const recognizer = voiceLab.createSpeechRecognizer(
      (text, isFinal) => {
        setInput(prev => (isFinal ? (prev ? `${prev} ${text}` : text) : text));
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
      alert("Sizning brauzeringizda ovozni aniqlash (Speech Recognition) qo'llab-quvvatlanmaydi.");
    }
  };

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || isLoading) return;

    if (isListening && speechRecognizerRef.current) {
      speechRecognizerRef.current.stop();
      setIsListening(false);
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: Date.now(),
      country: selectedCountry.name,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: messages,
          countryName: selectedCountry.name,
          language: "O'zbek tili (Lotin)",
        }),
      });

      if (!response.ok) {
        throw new Error('Serverdan javob olishda xatolik');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        timestamp: Date.now(),
        articlesCited: data.articlesCited || [],
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (autoSpeak && data.reply) {
        handlePlayVoice(assistantMessage);
      }
    } catch (error: any) {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Kechirasiz, tizimda vaqtincha nosozlik yuz berdi (${error.message}). Iltimos qaytadan urinib ko'ring yoki shoshilinch yordam raqamlariga murojaat qiling.`,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayVoice = (message: Message) => {
    if (playingMessageId === message.id) {
      voiceLab.stop();
      setPlayingMessageId(null);
      return;
    }

    voiceLab.stop();
    setPlayingMessageId(message.id);

    voiceLab.speak(message.text, {
      rate: 1.05,
      pitch: 1.0,
      onStart: () => setPlayingMessageId(message.id),
      onEnd: () => setPlayingMessageId(null),
      onError: () => setPlayingMessageId(null),
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-5xl mx-auto px-2 sm:px-4 py-2">
      {/* Country & Jurisdiction Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-3 sm:p-4 mb-3 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{selectedCountry.flag}</span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-sm sm:text-base">{selectedCountry.name} Qonunchiligi</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Faol Huquqiy Baza
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1">{selectedCountry.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
          <button
            onClick={() => {
              if (playingMessageId) {
                voiceLab.stop();
                setPlayingMessageId(null);
              }
              setAutoSpeak(!autoSpeak);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              autoSpeak
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
            title="AI javob berganda avtomatik ovozda o'qib berishi"
          >
            <Volume2 className={`w-3.5 h-3.5 ${autoSpeak ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
            <span>Ovoz: {autoSpeak ? 'YOQIQ' : 'O\'CHIQ'}</span>
          </button>
          <button
            onClick={onOpenShield}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Favqulodda Raqamlar</span>
          </button>
          <button
            onClick={onOpenVoiceTab}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>VoiceLab Ovoz</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2 mb-3">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isPlaying = playingMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}
            >
              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-lg ${
                  isUser
                    ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none'
                }`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-white/10 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                    {isUser ? (
                      <span>Sizning savolingiz</span>
                    ) : (
                      <>
                        <Scale className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-300 font-bold">Adolat AI • Advokat Maslahati</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Message Body */}
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans text-slate-100">
                  {msg.text}
                </div>

                {/* Liability Callout Badge if present */}
                {(msg.text.includes('Ma\'muriy') || msg.text.includes('Jinoiy')) && !isUser && (
                  <div className="mt-2.5 p-2 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center gap-2 text-[11px] text-rose-300 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>Ushbu holat bo'yicha Ma'muriy va Jinoiy javobgarlik choralari tushuntirildi</span>
                  </div>
                )}

                {/* Cited Articles Badges */}
                {msg.articlesCited && msg.articlesCited.length > 0 && !isUser && (
                  <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-amber-400" /> Asoslangan moddalar:
                    </span>
                    {msg.articlesCited.map((art, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium"
                      >
                        {art}
                      </span>
                    ))}
                  </div>
                )}

                {/* Assistant Controls (Voice Speak, Copy) */}
                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handlePlayVoice(msg)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        isPlaying
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700'
                      }`}
                      title={isPlaying ? "Ovozni to'xtatish" : "Ovozda eshitish (Uzbek VoiceLab)"}
                    >
                      {isPlaying ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>To'xtatish</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Ovozda eshitish</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs"
                      title="Nusxa olish"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Nusxalandi</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Nusxa</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-4 max-w-sm flex items-center gap-3 text-slate-300 text-xs">
              <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span>Adolat AI tegishli qonun va moddalarni tahlil qilmoqda...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Scenarios */}
      {selectedCountry.commonScenarios.length > 0 && messages.length <= 3 && (
        <div className="mb-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Tezkor maslahat mavzulari ({selectedCountry.name}):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedCountry.commonScenarios.map((scen) => (
              <button
                key={scen.id}
                onClick={() => handleSend(scen.recommendedQuestion)}
                className="text-left p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 transition-all group"
              >
                <div className="font-semibold text-xs text-amber-300 group-hover:text-amber-200 line-clamp-1">
                  {scen.title}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {scen.problem}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box with Voice & Send */}
      <div className="relative bg-slate-900 rounded-2xl border border-slate-800 p-2 shadow-2xl focus-within:border-amber-500/60 transition-all">
        {isListening && (
          <div className="mb-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-300 animate-pulse">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Ovozingiz tinglanmoqda... (O'zbek tilida gapiring)
            </span>
            <button
              onClick={toggleListening}
              className="text-[10px] font-bold uppercase underline"
            >
              To'xtatish
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          <button
            onClick={toggleListening}
            className={`p-3 rounded-xl transition-all ${
              isListening
                ? 'bg-rose-600 text-white animate-bounce'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title={isListening ? "Ovoz yozishni to'xtatish" : "Mikrofon orqali savol berish (O'zbekcha)"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-amber-400" />}
          </button>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={`${selectedCountry.name} qonunlari bo'yicha savol bering (masalan: oylik kechikishi, shartnoma, deportatsiya...)...`}
            rows={2}
            className="flex-1 bg-transparent border-0 text-slate-100 placeholder-slate-500 text-sm focus:outline-none resize-none py-2 px-1 max-h-32"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold transition-all shadow-md shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 stroke-[2.4]" />
          </button>
        </div>

        <div className="mt-1 px-1 flex items-center justify-between text-[10px] text-slate-500">
          <span>⚖️ Adolat AI qonun moddalariga asoslangan londa va to'g'ri javob beradi.</span>
          <span>Shift+Enter yangi qator</span>
        </div>
      </div>
    </div>
  );
};
