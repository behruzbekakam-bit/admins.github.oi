import { DocumentAnalysisResult } from '../types';

export function auditContractInstantly(documentText: string, country: string = "O'zbekiston"): DocumentAnalysisResult {
  const lower = documentText.toLowerCase();

  const risks: DocumentAnalysisResult['risks'] = [];
  const unfairTerms: string[] = [];
  const illegalTerms: string[] = [];
  const legalAdvice: string[] = [];
  const applicableLaws: string[] = [];

  let safetyScore = 100;

  // 1. Check for passport or ID confiscation (O'ta xavfli / Jinoiy)
  if (lower.includes('pasport') || lower.includes('паспорт') || lower.includes('hujjatni olib qo\'y') || lower.includes('seyfida saqla')) {
    safetyScore -= 35;
    illegalTerms.push("Pasport yoki shaxsni tasdiqlovchi hujjatni ish beruvchi/ijaraga beruvchiga topshirish yoki ushlab qolish sharti");
    risks.push({
      clauseNumber: "Pasport daxlsizligi",
      title: "Pasportni noqonuniy olib qo'yish xatari",
      riskDescription: "Hujjatda fuqaroning pasportini uchinchi shaxs tasarrufiga o'tkazish talabi bor. Bu xalqaro konvensiyalar va amaldagi jinoiy qonunlarga zid.",
      severity: "high",
      recommendation: "Ushbu bandni shartnomadan butunlay o'chirib tashlang. Pasport har doim o'zingizda bo'lishi shart."
    });
    applicableLaws.push("O'zR Fuqarolik Kodeksi 354-modda", "RF JK 325-modda", "BAA Decree-Law 33/2021 Article 13");
  }

  // 2. Unilateral penalties and deductions (Asossiz jarimalar)
  if (lower.includes('jarima') || lower.includes('штраф') || lower.includes('ushlab qol') || lower.includes('musodara') || lower.includes('удержание')) {
    safetyScore -= 25;
    unfairTerms.push("Sud qarorisiz bir tomonlama o'zboshimchalik bilan jarima va to'lovlarni ushlab qolish");
    risks.push({
      clauseNumber: "Moddiy javobgarlik",
      title: "Noqonuniy jarimalar va depozitni musodara qilish",
      riskDescription: "Shartnomada xodim yoki ijarachiga nisbatan asossiz katta miqdorda bir tomonlama jarimalar yuklatilgan.",
      severity: "high",
      recommendation: "Jarimalar faqat qonunda belgilangan me'yorda va sud tartibida undirilishi shartligini yozdiring."
    });
    applicableLaws.push("Mehnat Kodeksi 269-moddasi (Ish haqidan ushlab qolish chegaralari)", "Fuqarolik Kodeksi 327-moddasi");
  }

  // 3. One-sided termination / evicting without notice
  if (lower.includes('bir tomonlama') || lower.includes('ogohlantirishsiz') || lower.includes('haydab') || lower.includes('bekor qil')) {
    safetyScore -= 20;
    unfairTerms.push("Ikkinchi tarafni ogohlantirmasdan bir tomonlama shartnomani bekor qilish huquqi");
    risks.push({
      clauseNumber: "Shartnomani bekor qilish",
      title: "Bir tomonlama bekor qilish xatari",
      riskDescription: "Taraf istalgan paytda asossiz ravishda bitimni to'xtatishi mumkinligi ko'rsatilgan.",
      severity: "medium",
      recommendation: "Shartnomani bekor qilish uchun kamida 14 yoki 30 kun oldin yozma ogohlantirish muddati belgilansin."
    });
    applicableLaws.push("FK 382-modda (Shartnomani o'zgartirish va bekor qilish asoslari)");
  }

  // 4. Working hours and salary delay (Qora kassa, 12 soatlik ish)
  if (lower.includes('12 soat') || lower.includes('dam olishsiz') || lower.includes('qora kassa') || lower.includes('kechikkan taqdirda')) {
    safetyScore -= 25;
    illegalTerms.push("Kunlik ish vaqti me'yoridan ortiq ishlash va kechikish uchun da'vo qilish huquqini cheklash");
    risks.push({
      clauseNumber: "Ish vaqti va mehnat me'yori",
      title: "Qo'shimcha mehnat uchun haq to'lamaslik",
      riskDescription: "Haftalik 40 soatlik me'yordan ortiq mehnatga majburlash va qora kassa orqali hisob-kitob qilish.",
      severity: "high",
      recommendation: "Haftasiga 40 soatlik ish haftasi va ortiqcha soatlar uchun kamida 1.5 barobar haq to'lash bandini kiriting."
    });
    applicableLaws.push("Yangi Mehnat Kodeksi 181-modda (Ish vaqti davomiyligi)", "RF TK 91-modda");
  }

  // 5. Restricting court access (Sudga murojaatni taqiqlash)
  if (lower.includes('sudga murojaat') || lower.includes('haqli emas') || lower.includes('shikoyat qilish')) {
    safetyScore -= 20;
    illegalTerms.push("Fuqaroning sudga yoki davlat organlariga murojaat qilish huquqini taqiqlovchi bandlar (yuridik kuchga ega emas)");
    risks.push({
      clauseNumber: "Nizolarni hal etish",
      title: "Sudga shikoyat qilish huquqining cheklanishi",
      riskDescription: "Shartnomada nizolarni sudda ko'rish taqiqlangan yoki cheklangan. Konstitutsiyaga ko'ra bu band o'z-o'zidan haqiqiy emas.",
      severity: "medium",
      recommendation: "Barcha nizolar tomonlar o'rtasida yoki sud orqali qonuniy hal qilinishi belgilansin."
    });
    applicableLaws.push("Konstitutsiya 55-modda (Sud orqali himoyalanish huquqi)", "FPK 3-modda");
  }

  // General healthy contract check
  if (risks.length === 0) {
    safetyScore = 95;
    legalAdvice.push("Shartnomada qo'pol qonun buzilishlari aniqlanmadi.");
    legalAdvice.push("Har bir sahifaga tomonlar shaxsan imzo qo'yishi va har ikki tarafda bittadan asl nusxa saqlanishi shart.");
    legalAdvice.push("To'lovlarni amalga oshirganda doimo bank cheki yoki imzolangan tilxat oling.");
    applicableLaws.push("O'zR Fuqarolik Kodeksi 354-moddasi (Shartnoma erkinligi)");
  } else {
    legalAdvice.push("Ushbu shartnomani hozirgi holatida IMZOLAMANG!");
    legalAdvice.push("Yuqorida aniqlangan qonunga zid bandlarni o'chirish yoki o'zgartirish bo'yicha ikkinchi tarafga rasmiy talab bering.");
    legalAdvice.push("Agar qarshi taraf rozi bo'lmasa, shubhali shartnomadan butunlay voz kechishingiz tavsiya etiladi.");
  }

  safetyScore = Math.max(safetyScore, 20);

  const verdict = safetyScore >= 80 ? 'safe' : safetyScore >= 50 ? 'caution' : 'dangerous';
  const verdictText =
    verdict === 'safe'
      ? "Hujjat qonuniy talablarga javob beradi va nisbatan xavfsiz."
      : verdict === 'caution'
      ? "Hujjatda ehtiyotkorlik talab etuvchi bir tomonlama bandlar bor."
      : "DIQQAT: Ushbu hujjatda sizning huquqlaringizni poymol qiluvchi jiddiy yuridik tuzoqlar aniqlandi! Imzolash xavflidir.";

  const summary = `Ushbu hujjat yuzasidan o'tkazilgan tahlil natijasida ${risks.length} ta yuridik xatar aniqlandi. Xavfsizlik indeksi ${safetyScore} foizni tashkil etadi.`;

  return {
    safetyScore,
    verdict,
    verdictText,
    summary,
    risks,
    unfairTerms,
    illegalTerms,
    legalAdvice,
    applicableLaws
  };
}
