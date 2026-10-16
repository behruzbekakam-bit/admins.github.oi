import React, { useState } from 'react';
import { CountryJurisdiction, DocumentAnalysisResult } from '../types';
import {
  FileSearch,
  Upload,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  CheckCircle,
  FileText,
  Sparkles,
  Printer,
  Copy,
  Check,
  Scale,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

interface DocumentAnalyzerProps {
  selectedCountry: CountryJurisdiction;
}

export const DocumentAnalyzer: React.FC<DocumentAnalyzerProps> = ({ selectedCountry }) => {
  const [documentText, setDocumentText] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DocumentAnalysisResult | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Sample dangerous contracts for instant user testing
  const sampleContracts = [
    {
      title: "Xavfli Rossiya Mehnat Shartnomasi (Namuna)",
      text: `TRUDOVOY DOGOVOR (NAMUNA)
1. Xodim haftasiga 6 kun, kunlik 12 soatdan ishlashga rozi bo'ladi.
2. Ish beruvchi xodimning chet el pasportini va patentini xavfsizlik maqsadida o'z seyfida saqlaydi.
3. Agar xodim muddatidan oldin ishdan ketmoqchi bo'lsa, korxonaga 50 000 rubl jarima to'laydi.
4. Oylik maosh qora kassa orqali har oyning 30-sanasida beriladi. Kechikkan taqdirda xodim shikoyat qilishga haqli emas.
5. Ish joyida ro'y bergan baxtsiz hodisalar uchun to'liq javobgarlik xodimning o'z zimmasiga yuklatiladi.`
    },
    {
      title: "Bir tomonlama Kvartira Ijara Shartnomasi (Namuna)",
      text: `IJARA SHARTNOMASI
1. Ijaraga beruvchi istalgan vaqtda ogohlantirishsiz xonadonga kirish va tekshirish huquqiga ega.
2. Agar ijarachi ijara to'lovini 1 kun kechiktirsa, depozit to'liq musodara qilinadi va 24 soat ichida narsalari bilan ko'chaga chiqariladi.
3. Kvartiradagi barcha texnik nosozliklar, shu jumladan eski quvurlar yorilishi ham ijarachining hisobidan qoplanadi.
4. Nizolar yuzaga kelganda ijarachi sudga murojaat qilish huquqidan voz kechadi.`
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDocumentTitle(file.name);

    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDocumentText(event.target?.result as string || '');
      };
      reader.readAsText(file);
    } else {
      // For binary files, inform the user or read plain text
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        // Simple extraction for demonstration
        setDocumentText(text || '');
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = async () => {
    if (!documentText.trim() || documentText.trim().length < 20) {
      alert("Iltimos, tahlil qilish uchun shartnoma yoki hujjat matnini kiriting!");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText,
          documentTitle: documentTitle || "Mijoz Hujjati",
          country: selectedCountry.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Ekspertiza jarayonida xatolik yuz berdi');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      alert(`Xatolik: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyReport = () => {
    if (!result) return;
    const text = `
YURIDIK EKSPERTIZA XULOSASI:
Xavfsizlik darajasi: ${result.safetyScore}% (${result.verdictText})
Xulosa: ${result.summary}

XATARLAR VA TUZOQLAR:
${result.risks.map(r => `- [${r.severity.toUpperCase()}] ${r.title}: ${r.riskDescription} (Tavsiya: ${r.recommendation})`).join('\n')}

QONUNGA ZID BANDLAR:
${result.illegalTerms.map(t => `- ${t}`).join('\n')}

ADVOKAT MASLAHATLARI:
${result.legalAdvice.map(a => `- ${a}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 min-h-[calc(100vh-4rem)]">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl shadow-xl mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <FileSearch className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Shartnomalar va Hujjatlarni Yuridik Tahlil Qilish (Audit)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Imzolashdan oldin shartnomangizni tekshiring! AI advokat yashirin tuzoqlarni, nohaq jarimalarni va qonunga zid bandlarni aniqlab beradi.
            </p>
          </div>
        </div>

        {/* Quick sample chips */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Tezkor sinash uchun namunalar:</span>
          {sampleContracts.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDocumentTitle(sample.title);
                setDocumentText(sample.text);
              }}
              className="text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 transition-colors"
            >
              📄 {sample.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input text or File Upload */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Hujjat yoki Shartnoma Matni</span>
              </label>

              {/* Upload file trigger */}
              <label className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 cursor-pointer bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Fayl yuklash</span>
                <input
                  type="file"
                  accept=".txt,.doc,.docx,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {documentTitle && (
              <div className="mb-2 text-xs font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                <span>Yuklangan fayl: {documentTitle}</span>
              </div>
            )}

            <textarea
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              placeholder="Shartnoma, bitim, ariza yoki tilxat matnini shu yerga nusxalab joylashtiring (Paste)..."
              rows={14}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono leading-relaxed resize-none"
            />

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !documentText.trim()}
              className="mt-4 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>AI Yuridik Ekspertiza O'tkazmoqda...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Yuridik Ekspertizadan O'tkazish</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Comprehensive Audit Results */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-4">
              {/* Verdict Header Card */}
              <div
                className={`p-5 rounded-2xl border shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  result.verdict === 'safe'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                    : result.verdict === 'caution'
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-100'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shrink-0 ${
                      result.verdict === 'safe'
                        ? 'bg-emerald-500 text-slate-950'
                        : result.verdict === 'caution'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-rose-600 text-white'
                    }`}
                  >
                    {result.safetyScore}%
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-black/30 border border-white/10">
                        {result.verdict === 'safe'
                          ? '✅ Xavfsiz Hujjat'
                          : result.verdict === 'caution'
                          ? '⚠️ Ehtiyotkorlik Talab Qilinadi'
                          : '🚫 O\'ta Xavfli / Imzolamang!'}
                      </span>
                    </div>
                    <p className="text-sm font-bold mt-1">{result.verdictText}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={handleCopyReport}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-semibold"
                    title="Xulosadan nusxa olish"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handlePrintReport}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-semibold"
                    title="Hisobotni chop etish"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-400" /> Hujjat Mohiyati
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">{result.summary}</p>
              </div>

              {/* Identified Risks & Traps */}
              {result.risks && result.risks.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
                  <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Aniqlangan Yuridik Xatarlar va Tuzoqlar ({result.risks.length})
                  </h3>

                  <div className="space-y-3">
                    {result.risks.map((risk, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-200 flex items-center gap-2">
                            {risk.clauseNumber && (
                              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 text-[10px]">
                                {risk.clauseNumber}
                              </span>
                            )}
                            {risk.title}
                          </span>
                          <span
                            className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                              risk.severity === 'high'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {risk.severity === 'high' ? 'O\'ta Yuqori Xavf' : 'O\'rta Xavf'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400">{risk.riskDescription}</p>

                        <div className="text-[11px] text-emerald-400 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 mt-1">
                          <span className="font-semibold">Advokat tavsiyasi:</span> {risk.recommendation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Illegal or Unfair Clauses */}
              {(result.illegalTerms?.length > 0 || result.unfairTerms?.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.illegalTerms?.length > 0 && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
                      <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" /> Qonunga Zid Bandlar
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {result.illegalTerms.map((term, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{term}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.unfairTerms?.length > 0 && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Huquqni Cheklovchi Bandlar
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {result.unfairTerms.map((term, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{term}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Legal Advice & Applicable Laws */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Scale className="w-4 h-4" /> Mustaqil Advokat Tavsiyalari
                </h3>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {result.legalAdvice?.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>

                {result.applicableLaws?.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-semibold">Tegishli qonuniy normalar:</span>
                    {result.applicableLaws.map((law, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {law}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4 text-slate-500">
                <FileSearch className="w-8 h-8 text-amber-500/50" />
              </div>
              <h3 className="font-bold text-slate-200 text-base mb-1">
                Tahlil natijalari shu yerda ko'rinadi
              </h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Chap tomonga shartnoma matnini kiriting yoki fayl yuklang, so'ngra "Yuridik Ekspertizadan O'tkazish" tugmasini bosing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
