import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { getInstantLegalAdvice } from './src/data/legalEngine';
import { auditContractInstantly } from './src/data/contractAuditEngine';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Shared Gemini client utility
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory admin security pin (default: "7777" or custom set)
let appAdminPin = '7777';

// API Route: Verify Admin PIN
app.post('/api/admin/verify', (req, res) => {
  const { pin } = req.body;
  if (!pin) {
    return res.status(400).json({ success: false, message: 'PIN kiritilmadi' });
  }
  if (pin === appAdminPin) {
    return res.json({ success: true, message: 'Ruxsat berildi' });
  }
  return res.status(401).json({ success: false, message: "Noto'g'ri xavfsizlik PIN kodi!" });
});

// API Route: Update Admin PIN (requires old pin)
app.post('/api/admin/change-pin', (req, res) => {
  const { oldPin, newPin } = req.body;
  if (oldPin !== appAdminPin) {
    return res.status(401).json({ success: false, message: "Eski PIN noto'g'ri!" });
  }
  if (!newPin || newPin.length < 4) {
    return res.status(400).json({ success: false, message: 'Yangi PIN kamida 4 ta belgidan iborat bo\'lishi kerak' });
  }
  appAdminPin = newPin;
  return res.json({ success: true, message: 'PIN kod muvaffaqiyatli yangilandi' });
});

// Helper: Run promise with timeout
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), ms)),
  ]);
}

// API Route: Legal Chat Consultation (Blazing fast & 100% resilient)
app.post('/api/chat', async (req, res) => {
  const { message, countryName = "O'zbekiston" } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Xabar matni kiritilishi shart' });
  }

  // Pre-generate guaranteed instant legal advice in memory
  const localAdvice = getInstantLegalAdvice(message, countryName);

  // If Gemini is available, attempt fast online reasoning
  if (ai) {
    try {
      const systemInstruction = `
Siz - "Adolat AI" (O'zbekiston va xalqaro huquq bo'yicha Oliy toifali Advokat, Yuridik fanlar doktori).
Davlat: ${countryName}.
MUHIM TALABLAR:
1. FAQAT ANIQ QONUN VA MODDA RAQAMLARINI AYTING (Masalan: O'zR FK 732-modda, Yangi MK 161-modda, Oila Kodeksi 96-modda, RF 115-FZ 13.3-modda, Koreya Mehnat qonuni 36-modda).
2. Juda ko'p suv yozmang, londa, aniq va amaliy harakatlar rejasini bering.
3. QANDAY JAVOBGARLIK KELIB CHIQISHINI MAJBURIY KO'RSATING:
   - 🚨 Ma'muriy javobgarlik (MJtK / KoAP moddasi va BHM baravari jarimasi yoki ma'muriy qamoq / deportatsiya);
   - ⛓️ Jinoiy javobgarlik (JK moddasi, axloq tuzatish ishlari yoki ozodlikdan mahrum qilish muddati);
   - 💼 Fuqarolik-moddiy javobgarlik (zararni qoplash, foizlar, hisoblarni xatlash va xorijga chiqish taqiqlari).
4. Javob oxirida "📌 Qonuniy asoslar:" bloki bilan moddalarni alohida ajrating.
`;

      const aiPromise = ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });

      const response = await withTimeout(aiPromise, 2200);
      if (response && response.text && response.text.trim().length > 30) {
        const reply = response.text.trim();
        const articleRegex = /(?:(\d+[-.]\w+|\b\d+\b)[- ]*modda|\bст(?:атья)?\.?\s*\d+|\bArticle\s*\d+|\b\d+[- ]*(?:FZ|ФЗ)|(?:FK|MK|OK|JK|FPK|KoAP|TK RF)\s*\d+)/gi;
        const matches = reply.match(articleRegex);
        const articlesCited = matches ? Array.from(new Set(matches)).slice(0, 5) : localAdvice.lawArticles.slice(0, 4);

        return res.json({
          reply,
          articlesCited,
        });
      }
    } catch (err) {
      // Gracefully fall back to local legal engine without user-facing disruption
    }
  }

  // Instant resilient response ("yashil tezligida")
  return res.json({
    reply: localAdvice.fullText,
    articlesCited: localAdvice.lawArticles.map(a => a.split('(')[0].trim()).slice(0, 5),
  });
});

// API Route: Document Generator & Custom Document Builder
app.post('/api/draft-document', async (req, res) => {
  const { templateTitle, fieldsData = {}, customPrompt, jurisdiction = "O'zbekiston" } = req.body;

  const f = fieldsData;

  // Generate structured, compliant legal document text
  const recipient = f.courtName || f.recipient || f.inspectorate || "FUQAROLIK ISHLARI BO'YICHA SUDIGA";
  const claimant = f.claimant || f.applicant || f.principal || f.employee || f.workerInfo || "Fuqaro (Da'vogar)";
  const respondent = f.respondent || f.debtor || f.employer || f.tenant || f.companyInfo || "Javobgar (Tashkilot/Shaxs)";
  const title = (templateTitle || "RASMIY DA'VO ARIZASI").toUpperCase();
  const amount = f.debtAmount || f.amount || f.unpaidSum || f.monthlyFee || f.unpaidAmounts || "kelishilgan summa";
  const date = f.borrowDate || f.workPeriod || f.lastDay || "2024-yil";
  const evidence = f.evidence || f.decisionDetails || "Tilxat, bank to'lov cheki va yozma shartnoma";

  const isContract = title.includes('SHARTNOMA') || title.includes('IJARA') || title.includes('OLDI-SOTDI') || title.includes('PUDRAT') || title.includes('XIZMAT');
  const isPOA = title.includes('ISHONCHNOMA') || title.includes('ROZILIK');

  let readyDoc = '';

  if (isContract) {
    const party1 = f.landlord || f.seller || f.client || f.lender || f.employer || "1-Taraf (Buyurtmachi/Sotuvchi)";
    const party2 = f.tenant || f.buyer || f.contractor || f.borrower || f.employee || "2-Taraf (Ijrochi/Xaridor)";
    readyDoc = `
${title}

Toshkent shahri                                                   ${new Date().toLocaleDateString('uz-UZ')}

Bir tomondan: ${party1} (keyingi o'rinlarda "1-Taraf"), va 
Ikkinchi tomondan: ${party2} (keyingi o'rinlarda "2-Taraf"),
amaldagi ${jurisdiction} Fuqarolik Kodeksining 354-moddasi (Shartnoma erkinligi) asosida mazkur shartnomani quyidagilar bo'yicha tuzdilar:

1. SHARTNOMA PREDMETI
1.1. Mazkur shartnomaga asosan, 1-Taraf 2-Tarafga tegishli shartlar asosida mol-mulkni (${f.carDetails || f.propertyAddress || f.serviceDescription || "kelishilgan obekt"}) topshiradi / xizmatni ko'rsatadi, 2-Taraf esa qabul qiladi va haqini to'laydi.
1.2. Hujjat / obekt holati: Barcha texnik va yuridik talablarga javob beradi, uchinchi shaxslar da'vosidan xoli.

2. TO'LOV MIQDORI VA HISOBLASHISH TARTIBI
2.1. Mazkur shartnoma bo'yicha jami qiymat: ${amount}.
2.2. To'lov tomonlar o'rtasida kelishilgan shaklda (naqd yoki bank o'tkazmasi orqali) amalga oshiriladi.

3. TOMONLARNING HUQUQ VA MAJBURIYATLARI
3.1. 1-Taraf majburiyati: Obektni o'z vaqtida, to'liq va soz holatda topshirish.
3.2. 2-Taraf majburiyati: Shartnoma shartlariga qat'iy rioya qilish va to'lovni o'z vaqtida amalga oshirish.

4. NIZOLARNI HAL ETISH VA JAVOBGARLIK
4.1. Majburiyatlar buzilgan taqdirda, aybdor taraf amaldagi qonunchilikka asosan moddiy javobgarlikni o'z zimmasiga oladi.
4.2. Kelishmovchiliklar muzokaralar orqali, murosa bo'lmaganda esa sud tartibida hal etiladi.

5. TOMONLARNING REKVIZITLARI VA IMZOLARI:

1-TARAF:                                           2-TARAF:
${party1}                                          ${party2}

Imzo: _____________________                        Imzo: _____________________
    `.trim();
  } else if (isPOA) {
    const principal = f.principal || f.parentConsenting || "Ishonchnoma beruvchi shaxs";
    const agent = f.agent || f.parentAccompanying || "Ishonchli vakil";
    readyDoc = `
${title}

${new Date().toLocaleDateString('uz-UZ')}                                                   Toshkent shahri

Men — fuqaro ${principal},
ushbu orqali fuqaro ${agent}ga quyidagi vakolatlarni beraman:

VAKOLATNING MOHIYATI:
- ${f.carModel || f.childDetails || "tegishli mulk yoki huquqlarni"} qonuniy boshqarish, nazorat qilish va zarur rasmiy idoralar (YHXX, Chegara xizmati, Davlat xizmatlari markazlari, Notarial idoralar) oldida mening nomimdan ishtirok etish.
- Tegishli ariza va blankalarni imzolash, davlat bojlarini to'lash hamda kerakli guvohnomalarni olish.

Amal qilish muddati: ${f.validity || f.period || "1 (bir) yil muddatga berildi"}.

Mazkur ishonchnoma o'z xohish-irodam bilan, ruhiy sog'lom va ongli holatda tuzildi.

Ishonchnoma beruvchi:
${principal} _____________________ (imzo)
    `.trim();
  } else {
    readyDoc = `
${recipient}

Da'vogar / Ariza beruvchi:
${claimant}

Javobgar / Qarzdor:
${respondent}

${title}

I. ISHNING FAKTIK HOLATLARI:
Ushbu orqali ma'lum qilamanki, ${date} holatiga ko'ra taraflar o'rtasida huquqiy munosabat vujudga kelgan.
Biroq javobgar o'z zimmasiga olgan qonuniy majburiyatlarini bajarmasdan, qarz/to'lov summasini (${amount}) asossiz ravishda to'lamasdan kelmoqda.
Keltirilgan zarar va qarz summasi: ${amount}.
Mavjud dalillar: ${evidence}.
${customPrompt ? `Qo'shimcha shart: ${customPrompt}` : ''}

II. QONUNIY ASOSLAR:
Amaldagi ${jurisdiction} qonunchiligi, Fuqarolik Kodeksining 236, 354, 732, 735-moddalari, Yangi Mehnat Kodeksi va Fuqarolik protsessual kodeksining tegishli normalariga binoan, har bir fuqaro o'zining buzilgan qonuniy manfaatlarini himoya qilish uchun sudga murojaat qilish huquqiga ega.

III. DA'VO TALABLARI:
Yuqoridagilarga asosan, Sud / Idoradan:
1. Javobgardan mening foydamga ${amount} miqdoridagi mablag'ni to'liq undirib berishingizni;
2. Mazkur ariza yuzasidan sarflangan davlat boji va sud xarajatlarini javobgar zimmasiga yuklashingizni

SO'RAYMAN:

ILOVA QILINGAN HUJJATLAR:
1. Shaxsni tasdiqlovchi hujjat (Pasport/ID) nusxasi;
2. Qarz/kelishuvni tasdiqlovchi asosiy dalillar (tilxat, shartnoma, cheklar);
3. Talabnoma yuborilganligi kvitansiyasi;
4. Ariza nusxasi javobgar uchun.

Sana: ${new Date().toLocaleDateString('uz-UZ')}
Ariza beruvchi imzo: _____________________
    `.trim();
  }

  // Try Gemini if available
  if (ai) {
    try {
      const prompt = `
Siz professional advokatsiz. Quyidagi ma'lumotlar asosida rasmiy, to'liq, mukammal yuridik hujjat (sud arizasi yoki shartnoma) yozing:
Hujjat nomi: ${templateTitle}
Davlat: ${jurisdiction}
Ma'lumotlar: ${JSON.stringify(fieldsData)}
Qo'shimcha: ${customPrompt || ''}
Faqat hujjat matnini chiqaring.
`;
      const aiPromise = ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: { temperature: 0.2 },
      });
      const response = await withTimeout(aiPromise, 2500);
      if (response && response.text && response.text.length > 100) {
        readyDoc = response.text.trim();
      }
    } catch (e) {
      // Use readyDoc fallback
    }
  }

  return res.json({ documentText: readyDoc });
});

// API Route: Document & Contract Analyzer (100% resilient & instant)
app.post('/api/analyze-document', async (req, res) => {
  const { documentText, country = "O'zbekiston" } = req.body;

  if (!documentText || documentText.trim().length < 15) {
    return res.status(400).json({ error: "Tahlil qilish uchun hujjat matni yetarli emas" });
  }

  // Instant local audit
  const localAnalysis = auditContractInstantly(documentText, country);

  // If Gemini responds quickly, try to enhance
  if (ai) {
    try {
      const prompt = `
Quyidagi shartnomani tahlil qiling va JSON formatida javob bering:
Matn: ${documentText.slice(0, 4000)}
JSON maydonlari: safetyScore (number), verdict ("safe"|"caution"|"dangerous"), verdictText (string), summary (string), risks (array of {title, riskDescription, severity, recommendation}), unfairTerms (array), illegalTerms (array), legalAdvice (array), applicableLaws (array).
`;
      const aiPromise = ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });

      const response = await withTimeout(aiPromise, 2200);
      if (response && response.text) {
        const parsed = JSON.parse(response.text);
        if (parsed && typeof parsed.safetyScore === 'number') {
          return res.json(parsed);
        }
      }
    } catch (e) {
      // fallback
    }
  }

  return res.json(localAnalysis);
});

// API Route: Uzbek Voice Synthesis (TTS)
app.post('/api/tts', async (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: "Matn kiritilmadi" });
  }

  // VoiceLab client handles synthesis seamlessly via Web Speech API
  return res.json({ success: true, mode: 'client-speech' });
});

// Serve frontend in production or via Vite middlewares in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Adolat AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
