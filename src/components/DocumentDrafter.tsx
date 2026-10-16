import React, { useState } from 'react';
import { DocumentTemplate, CountryJurisdiction } from '../types';
import { INITIAL_TEMPLATES } from '../data/documents';
import {
  FileText,
  PlusCircle,
  Download,
  Printer,
  Copy,
  Check,
  Search,
  Sparkles,
  ArrowLeft,
  Scale,
  Zap,
  Mic,
  MicOff,
  Edit3,
  Bookmark,
  Shield,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { voiceLab } from '../utils/voiceLab';

interface DocumentDrafterProps {
  selectedCountry: CountryJurisdiction;
}

export const DocumentDrafter: React.FC<DocumentDrafterProps> = ({ selectedCountry }) => {
  const [templates, setTemplates] = useState<DocumentTemplate[]>(() => {
    const saved = localStorage.getItem('adolat_custom_templates');
    if (saved) {
      try {
        const custom = JSON.parse(saved);
        return [...INITIAL_TEMPLATES, ...custom];
      } catch (e) {
        return INITIAL_TEMPLATES;
      }
    }
    return INITIAL_TEMPLATES;
  });

  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [customPrompt, setCustomPrompt] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Quick 1-sentence prompt drafter
  const [quickPrompt, setQuickPrompt] = useState('');
  const [isQuickListening, setIsQuickListening] = useState(false);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  // New Custom Document Modal State
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<'court' | 'contract' | 'power_of_attorney' | 'migrant' | 'application' | 'custom'>('custom');
  const [newDocDescription, setNewDocDescription] = useState('');
  const [newDocLegalBasis, setNewDocLegalBasis] = useState('');
  const [newDocJurisdiction, setNewDocJurisdiction] = useState(selectedCountry.name);

  const categories = [
    { id: 'all', label: 'Barcha Hujjatlar' },
    { id: 'court', label: "Sud va Da'volar" },
    { id: 'contract', label: 'Shartnomalar' },
    { id: 'power_of_attorney', label: 'Ishonchnomalar' },
    { id: 'migrant', label: 'Musofirlar Hujjatlari' },
    { id: 'application', label: 'Arizalar' },
  ];

  const filteredTemplates = templates.filter((tpl) => {
    const matchesCat = activeCategory === 'all' || tpl.category === activeCategory;
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectTemplate = (tpl: DocumentTemplate) => {
    setSelectedTemplate(tpl);
    setGeneratedDocument('');
    // Auto populate realistic sample data so user doesn't have to start from scratch!
    autoFillSampleData(tpl);
  };

  // 1-Click Auto Fill Sample Data
  const autoFillSampleData = (tpl: DocumentTemplate) => {
    const sampleData: Record<string, string> = {};
    tpl.fields.forEach((f) => {
      if (f.id.includes('court')) {
        sampleData[f.id] = "Fuqarolik ishlari bo'yicha Shayxontohur tumanlararo sudi";
      } else if (f.id.includes('claimant') || f.id.includes('applicant') || f.id.includes('principal') || f.id.includes('employee')) {
        sampleData[f.id] = "Aliyev Valijon Sobirovich, Toshkent sh., Chilonzor 5-mavze 12-uy, Pasport: AA 1234567, Tel: +998 90 123-45-67";
      } else if (f.id.includes('respondent') || f.id.includes('debtor') || f.id.includes('employer') || f.id.includes('tenant')) {
        sampleData[f.id] = "Sobirov Tohir Anvarovich, Toshkent sh., Yunusobod 4-mavze 8-uy, Tel: +998 93 987-65-43";
      } else if (f.id.includes('Amount') || f.id.includes('amount') || f.id.includes('Fee') || f.id.includes('Sum')) {
        sampleData[f.id] = "15 000 000 (o'n besh million) so'm";
      } else if (f.id.includes('Date') || f.id.includes('date')) {
        sampleData[f.id] = new Date().toISOString().split('T')[0];
      } else if (f.id.includes('evidence')) {
        sampleData[f.id] = "2024-yil 15-martdagi qarz tilxati nusxasi, bank to'lov kvitansiyasi va yozishmalar";
      } else if (f.id.includes('children')) {
        sampleData[f.id] = "Aliyeva Madina Valijon qizi, 2019-yil 10-aprelda tug'ilgan";
      } else {
        sampleData[f.id] = f.placeholder || f.defaultValue || "Kelishilgan shartlar asosida";
      }
    });
    setFormData(sampleData);
  };

  const handleGenerate = async () => {
    if (!selectedTemplate) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/draft-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          templateTitle: selectedTemplate.title,
          fieldsData: formData,
          customPrompt,
          jurisdiction: selectedTemplate.jurisdiction || selectedCountry.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Hujjat yaratishda xatolik yuz berdi');
      }

      const data = await response.json();
      setGeneratedDocument(data.documentText || '');
    } catch (err: any) {
      alert(`Xatolik: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Quick 1-sentence prompt auto drafter
  const handleQuickCreate = () => {
    if (!quickPrompt.trim()) return;

    const lower = quickPrompt.toLowerCase();
    let matchedTemplate = templates[0];

    if (lower.includes('aliment')) {
      matchedTemplate = templates.find(t => t.id === 'court_alimony') || templates[0];
    } else if (lower.includes('ajral') || lower.includes('nikoh')) {
      matchedTemplate = templates.find(t => t.id === 'court_divorce') || templates[0];
    } else if (lower.includes('ijara') || lower.includes('kvartira') || lower.includes('uy')) {
      matchedTemplate = templates.find(t => t.id === 'contract_rent') || templates[0];
    } else if (lower.includes('mashina') || lower.includes('avto') || lower.includes('doverennost')) {
      matchedTemplate = templates.find(t => t.id === 'poa_car') || templates[0];
    } else if (lower.includes('rossiya') || lower.includes('rostrud') || lower.includes('patent')) {
      matchedTemplate = templates.find(t => t.id === 'ru_rostrud') || templates[0];
    } else {
      matchedTemplate = templates.find(t => t.id === 'court_debt') || templates[0];
    }

    setSelectedTemplate(matchedTemplate);
    autoFillSampleData(matchedTemplate);
    setCustomPrompt(quickPrompt);

    // Immediately trigger generate
    setTimeout(() => {
      handleGenerate();
    }, 100);
  };

  const toggleQuickVoice = () => {
    if (isQuickListening) {
      setIsQuickListening(false);
      return;
    }

    const recognizer = voiceLab.createSpeechRecognizer(
      (text, isFinal) => {
        setQuickPrompt(text);
        if (isFinal) {
          setIsQuickListening(false);
        }
      },
      (err) => {
        setIsQuickListening(false);
      },
      (listening) => {
        setIsQuickListening(listening);
      }
    );

    if (recognizer) {
      setIsQuickListening(true);
      recognizer.start();
    }
  };

  const handleCopy = () => {
    if (!generatedDocument) return;
    navigator.clipboard.writeText(generatedDocument);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedTemplate?.title || 'Hujjat'}</title>
          <style>
            body {
              font-family: 'Times New Roman', Times, serif;
              font-size: 14pt;
              line-height: 1.5;
              padding: 40px;
              color: #000;
              background: #fff;
            }
            pre {
              white-space: pre-wrap;
              font-family: inherit;
              font-size: inherit;
            }
          </style>
        </head>
        <body>
          <pre>${generatedDocument}</pre>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadWord = () => {
    if (!generatedDocument) return;
    const blob = new Blob([generatedDocument], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(selectedTemplate?.title || 'Hujjat').replace(/\s+/g, '_')}_Adolat_AI.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddNewCustomTemplate = () => {
    if (!newDocTitle.trim()) {
      alert("Iltimos hujjat nomini kiriting");
      return;
    }

    const newTemplate: DocumentTemplate = {
      id: `custom_${Date.now()}`,
      title: newDocTitle.trim(),
      category: newDocCategory,
      description: newDocDescription.trim() || "Foydalanuvchi tomonidan qo'shilgan maxsus rasmiy hujjat.",
      jurisdiction: newDocJurisdiction || selectedCountry.name,
      legalBasis: newDocLegalBasis.trim() || "Amaldagi qonunchilik me'yorlari",
      isCustom: true,
      fields: [
        { id: 'recipient', label: "Kimga (Sud, Notarius yoki Tashkilot nomi)", type: 'text', required: true, defaultValue: "Fuqarolik ishlari bo'yicha Shayxontohur sudi" },
        { id: 'applicant', label: "Ariza beruvchi (F.I.Sh., Manzil, Pasport, Tel)", type: 'textarea', required: true, defaultValue: "Aliyev Valijon, Toshkent sh., Tel: +998 90 123-45-67" },
        { id: 'respondent', label: "Javobgar shaxs yoki korxona ma'lumotlari", type: 'textarea', required: true, defaultValue: "Sobirov Tohir, Toshkent sh., Tel: +998 93 987-65-43" },
        { id: 'amount', label: "Talab qilinayotgan summa yoki mol-mulk", type: 'text', required: true, defaultValue: "15 000 000 so'm" },
      ],
    };

    const updated = [newTemplate, ...templates];
    setTemplates(updated);

    const customOnes = updated.filter(t => t.isCustom);
    localStorage.setItem('adolat_custom_templates', JSON.stringify(customOnes));

    setIsNewDocModalOpen(false);
    setNewDocTitle('');
    setNewDocDescription('');
    setNewDocLegalBasis('');

    handleSelectTemplate(newTemplate);
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 min-h-[calc(100vh-4rem)]">
      {/* Top Banner & Quick 1-Sentence Smart Generator */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-3xl shadow-xl mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <FileText className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Tezkor Yuridik Hujjatlar Konstruktori
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                O'zbekiston va chet eldagi musofirlar uchun sud arizalari, shartnomalar va ishonchnomalarni 1 soniyada tayyorlang.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNewDocModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all shrink-0"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.4]" />
            <span>➕ Yangi Hujjat Qo'shish</span>
          </button>
        </div>

        {/* Quick Voice / 1-Sentence Smart Drafter Input */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2 focus-within:border-amber-500/60 transition-all">
          <button
            onClick={toggleQuickVoice}
            className={`p-2.5 rounded-xl transition-all ${
              isQuickListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-800 text-amber-400 hover:text-white'
            }`}
            title="Ovozda aytish"
          >
            {isQuickListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={quickPrompt}
            onChange={(e) => setQuickPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleQuickCreate();
            }}
            placeholder="1 ta jumla bilan yozing: 'Qo'shnimdan 10 mln qarzni undirish uchun da'vo arizasi kerak'..."
            className="flex-1 bg-transparent border-0 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
          />

          <button
            onClick={handleQuickCreate}
            disabled={!quickPrompt.trim()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md disabled:opacity-30 shrink-0"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Tezkor Tuzish</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      {!selectedTemplate ? (
        // Catalog View
        <div>
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hujjat nomi bo'yicha qidiring (masalan: qarz, aliment, ijara, patent, tilxat)..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => handleSelectTemplate(tpl)}
                className="group relative bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 cursor-pointer transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                      {tpl.jurisdiction}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-current" /> 1-bosishda tayyor
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-100 group-hover:text-amber-300 text-base mb-2 line-clamp-2 transition-colors">
                    {tpl.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Scale className="w-3.5 h-3.5 text-amber-500" /> {tpl.legalBasis ? tpl.legalBasis.slice(0, 30) + '...' : 'Qonuniy asos'}
                  </span>
                  <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Tanlash &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Document Editor & Form View
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Easy Quick Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setSelectedTemplate(null)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Orqaga qaytish</span>
              </button>

              {/* 1-Click Auto Fill Button */}
              <button
                onClick={() => autoFillSampleData(selectedTemplate)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-bold hover:bg-amber-500/25 transition-all"
                title="Namunaviy ma'lumotlarni avtomatik to'ldirish"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Namuna bilan to'ldirish</span>
              </button>
            </div>

            <div className="border-b border-slate-800 pb-3 mb-4">
              <h2 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                {selectedTemplate.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{selectedTemplate.description}</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[50vh] pr-1">
              {selectedTemplate.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={formData[field.id] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.id] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Big Instant Generate Action */}
            <div className="pt-4 border-t border-slate-800 mt-4">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Hujjat tayyorlanmoqda...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Hujjatni Tayyorlash (1 Soniyada)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Live Document Preview, In-place Edit & Export */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Tayyor Rasmiy Hujjat</h3>
              </div>

              {generatedDocument && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Nusxalandi' : 'Nusxa'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                  >
                    <Printer className="w-3.5 h-3.5 text-sky-400" />
                    <span>Chop etish (PDF)</span>
                  </button>

                  <button
                    onClick={handleDownloadWord}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Word (.doc)</span>
                  </button>
                </div>
              )}
            </div>

            {generatedDocument ? (
              <div className="flex-1 flex flex-col">
                <div className="mb-2 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>✏️ Matnni bevosita shu yerda o'zgartirishingiz yoki to'ldirishingiz mumkin:</span>
                  <span className="text-emerald-400 font-semibold">Tahrirlash ochiq</span>
                </div>
                <textarea
                  value={generatedDocument}
                  onChange={(e) => setGeneratedDocument(e.target.value)}
                  className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 text-slate-200 font-serif text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-amber-500 resize-none min-h-[500px]"
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="w-16 h-16 rounded-3xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4 text-slate-500">
                  <FileText className="w-8 h-8 text-amber-500/50" />
                </div>
                <h4 className="font-bold text-slate-200 text-base mb-1">
                  Hujjat hali yaratilmadi
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mb-4">
                  Chap tarafdagi ma'lumotlarni tekshiring va pastdagi "Hujjatni Tayyorlash" tugmasini bosing.
                </p>
                <button
                  onClick={handleGenerate}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Hozir Tayyorlash</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Add Custom Document */}
      {isNewDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Yangi Hujjat Turi Qo'shish</h3>
              </div>
              <button
                onClick={() => setIsNewDocModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Hujjat Nomi <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="Masalan: Ish beruvchi nohaqligi bo'yicha e'tiroz arizasi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Kategoriya</label>
                <select
                  value={newDocCategory}
                  onChange={(e: any) => setNewDocCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="court">Sud va Da'volar</option>
                  <option value="contract">Shartnomalar</option>
                  <option value="power_of_attorney">Ishonchnomalar</option>
                  <option value="migrant">Musofirlar Hujjatlari</option>
                  <option value="application">Arizalar</option>
                  <option value="custom">Boshqa maxsus</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Qisqa ta'rifi
                </label>
                <textarea
                  value={newDocDescription}
                  onChange={(e) => setNewDocDescription(e.target.value)}
                  placeholder="Ushbu hujjat qanday vaziyatda ishlatiladi..."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsNewDocModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleAddNewCustomTemplate}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                Saqlash & Ochish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
