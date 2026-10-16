import React, { useState } from 'react';
import { CountryJurisdiction } from '../types';
import { COUNTRIES_DATA } from '../data/countries';
import {
  ShieldAlert,
  PhoneCall,
  AlertOctagon,
  Scale,
  ExternalLink,
  BookOpen,
  Send,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Globe2
} from 'lucide-react';

interface MigrantShieldProps {
  selectedCountry: CountryJurisdiction;
  setSelectedCountry: (country: CountryJurisdiction) => void;
  onAskAI: (question: string) => void;
}

export const MigrantShield: React.FC<MigrantShieldProps> = ({
  selectedCountry,
  setSelectedCountry,
  onAskAI,
}) => {
  const [activeCategory, setActiveCategory] = useState<'emergency' | 'laws' | 'hotlines'>('emergency');

  // Emergency situations tailored for foreign workers & migrants
  const emergencyTopics = [
    {
      title: "Politsiya / Militsiya / ICE to'xtatganda nima deyish kerak?",
      risk: "O'zboshimchalik, noqonuniy jarima yoki deportatsiya xavfi",
      rule: "Qonun bo'yicha xodim o'zini tanishtirishi shart. Advokatsiz hech qanday tushunarsiz qog'ozga qo'l qo'ymang!",
      actionSteps: [
        "1. O'zingizni xotirjam tuting, baqirmang va qarshilik ko'rsatmang.",
        "2. Pasport, migratsiya kartasi va to'langan patent cheklarini (yoki vizani) ko'rsating.",
        "3. Agar tilni yaxshi bilmasangiz: 'Men tarjimon va advokat talab qilaman' deb ayting.",
        "4. Telefoningiz orqali yaqinlaringizga va elchixonaga qayerdaligingiz haqida xabar bering.",
      ],
      aiQuestion: `${selectedCountry.name}da politsiya yoki migratsiya xizmati to'xtatganda chet el fuqarosining qonuniy huquqlari va o'zini tutish tartibi qanday?`
    },
    {
      title: "Ish beruvchi pasportni olib qo'ydi va bermayapti",
      risk: "Qullik va erkin harakatlanish huquqining to'liq cheklanishi",
      rule: "Dunyoning deyarli barcha davlatlarida pasportni uchinchi shaxs tomonidan olib qo'yilishi QAT'IYAN JINOYAT hisoblanadi!",
      actionSteps: [
        "1. Ish beruvchiga yozma ravishda (WhatsApp/SMS orqali) pasportingizni qaytarishni talab qiling (bu dalil bo'ladi).",
        "2. Agar bermasa, darhol mahalliy politsiyaga 'Mening pasportimni noqonuniy ushlab turishibdi' deb xabar bering.",
        "3. O'zbekistonning ushbu davlatdagi Bosh Konsulligiga qo'ng'iroq qilib, vaziyatni tushuntiring.",
      ],
      aiQuestion: `${selectedCountry.name}da korxona yoki firma pasportimni olib qo'ysa, mahalliy politsiya va prokuraturaga qanday shikoyat arizasi beriladi?`
    },
    {
      title: "Oylik maosh to'lanmayapti yoki firma qochib yuribdi",
      risk: "Oylarcha bepul ishlash va tirikchiliksiz qolish",
      rule: "Mehnat qonunlariga ko'ra, hattoki rasmiy shartnomasiz ishlagan taqdirda ham, amalda ishlagan soatlar uchun haq to'lanishi kafolatlangan!",
      actionSteps: [
        "1. Barcha isbotlarni to'plang: obyekt rasmlari, ish beruvchi bilan yozishmalar, kassa cheklari, hamkasblar ko'rsatmalari.",
        "2. Davlat Mehnat Inspeksiyasiga (Rossiyada Rostrud, Koreyada Nodongbu, Turkiyada Çalışma Bakanlığı) ariza topshiring.",
        "3. Tashqi mehnat migratsiyasi agentligi vakiliga xabar bering.",
      ],
      aiQuestion: `${selectedCountry.name}da ish beruvchi maoshimni bermayapti, barcha ishlangan pulni majburiy undirish bo'yicha qonuniy tartib qanday?`
    },
    {
      title: "Deportatsiya (Sınır Dışı / Vydvoreniye) xati kelganda",
      risk: "5-10 yilga kirish taqiqlanishi (Zapret) va chegaradan chiqarib yuborilish",
      rule: "Deportatsiya qarori ustidan belgilangan muddatda (Rossiyada 10 kun, Turkiyada 7 kun) sudga apellyatsiya berilsa, chiqib ketish to'xtatiladi!",
      actionSteps: [
        "1. Qo'lingizga berilgan qaror (Postanovleniye / Tebligat) nusxasini va sanasini aniq saqlang.",
        "2. Muddatni o'tkazib yubormasdan ma'muriy sudga 'Ijroni to'xtatish' (Yürütmeyi Durdurma) arizasini kiritish zarur.",
        "3. Agar oila a'zolaringiz, farzandlaringiz ushbu mamlakatda bo'lsa, bu deportatsiyani bekor qilish uchun eng kuchli asosdir.",
      ],
      aiQuestion: `${selectedCountry.name}da deportatsiya yoki mamlakatdan chiqarib yuborish qarorini sud orqali bekor qilish yo'llari qanday?`
    },
    {
      title: "Registratsiya yoki viza muddati o'tib ketdi",
      risk: "Noqonuniy maqomga (nelegal) tushib qolish va jarimalar",
      rule: "O'z vaqtida ixtiyoriy ravishda qonuniylashtirish yoki chiqib ketish sud orqali ushlangandan ko'ra ancha yengil oqibatlarga ega.",
      actionSteps: [
        "1. Mamlakatda amnistiya yoki legalizatsiya dasturlari borligini tekshiring.",
        "2. Jarimani bank orqali ixtiyoriy to'lab, qonuniy chiqib ketish choralari ko'riladi.",
        "3. Konsullikdan 'Vatanga qaytish guvohnomasi' olish mumkin.",
      ],
      aiQuestion: `${selectedCountry.name}da viza va registratsiya muddati o'tganda jarimalar va qonuniy yo'l bilan chiqib ketish tartibi qanday?`
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 min-h-[calc(100vh-4rem)]">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-rose-500/30 p-4 sm:p-6 rounded-2xl shadow-2xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  Musofirlar Huquqiy Qalqoni (Xalqaro Yordam)
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                  11 Davlat
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Rossiya, Turkiya, Janubiy Koreya, Qozog'iston, AQSH, Yevropa, BAA va boshqa davlatlardagi vatandoshlarimiz uchun tezkor huquqiy himoya.
              </p>
            </div>
          </div>

          {/* Current country flag badge */}
          <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-700 shrink-0">
            <span className="text-2xl">{selectedCountry.flag}</span>
            <div className="text-left">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Tanlangan Davlat</div>
              <div className="text-xs font-bold text-white">{selectedCountry.name}</div>
            </div>
          </div>
        </div>

        {/* Quick Country Pill Switchers */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs text-slate-400 font-semibold whitespace-nowrap flex items-center gap-1">
            <Globe2 className="w-3.5 h-3.5 text-amber-400" /> Davlatni tanlang:
          </span>
          {COUNTRIES_DATA.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCountry(c)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all ${
                selectedCountry.id === c.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveCategory('emergency')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'emergency'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <AlertOctagon className="w-4 h-4" />
          <span>Shoshilinch Holatlar Bo'yicha Qadamlar</span>
        </button>

        <button
          onClick={() => setActiveCategory('hotlines')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'hotlines'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>Favqulodda Konsullik & Mehnat Raqamlari</span>
        </button>

        <button
          onClick={() => setActiveCategory('laws')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'laws'
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Asosiy Qonunlar & Moddalar</span>
        </button>
      </div>

      {/* Content based on selected tab */}
      {activeCategory === 'emergency' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 hover:border-rose-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                    Xavf: {topic.risk}
                  </span>
                </div>

                <h3 className="font-extrabold text-white text-base mb-2">
                  {topic.title}
                </h3>

                <p className="text-xs text-amber-300 font-semibold mb-3 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                  ⚖️ {topic.rule}
                </p>

                <div className="space-y-1.5 mb-4">
                  {topic.actionSteps.map((step, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onAskAI(topic.aiQuestion)}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-300 text-xs font-bold border border-slate-700 hover:border-amber-500/40 transition-all flex items-center justify-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Advokat AI dan To'liq Qonuniy Reja Olish &rarr;</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {activeCategory === 'hotlines' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedCountry.hotlines.map((hotline, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30">
                  Rasmiy Aloqa Liniyasi
                </span>
                <h4 className="font-bold text-white text-base mt-2 mb-1">{hotline.title}</h4>
                <p className="text-xs text-slate-400 mb-4">{hotline.desc}</p>
              </div>

              <a
                href={`tel:${hotline.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{hotline.phone}</span>
              </a>
            </div>
          ))}
        </div>
      )}

      {activeCategory === 'laws' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>{selectedCountry.name}da Chet El Fuqarolari Uchun Asosiy Qonunlar</span>
          </h3>

          <div className="space-y-4">
            {selectedCountry.criticalLaws.map((law, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-amber-300 text-sm">{law.name}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {law.code}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  <span className="font-semibold text-slate-300">Asosiy moddalar:</span> {law.keyArticles}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
