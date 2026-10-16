import { CountryJurisdiction } from '../types';

export const COUNTRIES_DATA: CountryJurisdiction[] = [
  {
    id: 'uz',
    name: "O'zbekiston",
    flag: '🇺🇿',
    currency: "UZS (So'm)",
    code: 'UZ',
    description: "O'zbekiston Respublikasi amaldagi qonunchiligi, Konstitutsiya, Mehnat, Fuqarolik, Jinoyat va Oila kodekslari.",
    hotlines: [
      { title: "Adliya vazirligi 'Ishonch telefoni'", phone: "1008", desc: "Huquqiy maslahat va murojaatlar" },
      { title: "Bosh Prokuratura ishonch telefoni", phone: "1007", desc: "Qonun buzilishi holatlari bo'yicha" },
      { title: "Tashqi mehnat migratsiyasi agentligi", phone: "1282", desc: "Xorijdagi mehnat va huquqiy himoya" },
      { title: "Ichki ishlar vazirligi (102)", phone: "102", desc: "Shoshilinch xavfsizlik va politsiya" }
    ],
    criticalLaws: [
      { code: "O'zR FK", name: "Fuqarolik Kodeksi", keyArticles: "354-modda (Shartnoma erkinligi), 985-modda (Zararni qoplash), 732-modda (Qarz shartnomasi)" },
      { code: "O'zR MK", name: "Yangi Mehnat Kodeksi", keyArticles: "161-modda (Mehnat shartnomasini bekor qilish), 244-modda (Oylik maosh muddatlari), 332-modda (Mehnat nizolari)" },
      { code: "O'zR OK", name: "Oila Kodeksi", keyArticles: "96-modda (Aliment undirish), 37-modda (Nikohni bekor qilish), 41-modda (Mulkni bo'lish)" }
    ],
    commonScenarios: [
      {
        id: 'uz_debt',
        title: "Qarzni qaytarmayapti (Tilxat bilan yoki tilsiz)",
        problem: "Tanishimga qarz bergandim, qaytarish muddati o'tdi, qochib yuribdi.",
        solutionTips: "O'zR FK 732-736-moddalari va FPK 171-moddasiga ko'ra sud buyrug'i yoki da'vo arizasi kiritiladi. Tilxat, bank cheki yoki SMS yozishmalar isbot bo'ladi.",
        recommendedQuestion: "Qarzimni tilxat bilan qaytarmayotgan shaxsga nisbatan sudga da'vo arizasi berish tartibi qanday?"
      },
      {
        id: 'uz_work',
        title: "Ish beruvchi nohaq ishdan bo'shatdi / maosh bermadi",
        problem: "Mening roziligimsiz buyruq chiqarishdi yoki hisob-kitob qilib bermadi.",
        solutionTips: "O'zR MK 161, 172 va 244-moddalariga ko'ra kechiktirilgan har bir kun uchun kompensatsiya to'lanishi shart. Bandlik boshqarmasi va sudga 1 oy ichida murojaat qilinadi.",
        recommendedQuestion: "Ish beruvchi 2 oylik maoshimni bermayapti va ishdan bo'shatmoqchi, MK bo'yicha qanday chora ko'rishim kerak?"
      }
    ]
  },
  {
    id: 'ru',
    name: "Rossiya Federatsiyasi",
    flag: '🇷🇺',
    currency: 'RUB (Ruble)',
    code: 'RU',
    description: "Rossiya Federatsiyasi Federal qonunchiligi (115-FZ, 109-FZ), Mehnat Kodeksi, patent, registratsiya va deportatsiyadan himoyalanish.",
    hotlines: [
      { title: "Moskvadagi O'zbekiston Elchixonasi", phone: "+7 (499) 230-00-76", desc: "Favqulodda konsullik yordami" },
      { title: "Tashqi mehnat migratsiyasi RF vakolatxonasi", phone: "+7 (903) 607-77-78", desc: "Mehnat nizolari va huquqiy yordam" },
      { title: "Rossiya Mehnat Inspeksiyasi (Rostrud)", phone: "8 (800) 707-88-41", desc: "Ish beruvchi ustidan shikoyat" },
      { title: "Tezkor qutqaruv xizmati RF", phone: "112", desc: "Politsiya va favqulodda yordam" }
    ],
    criticalLaws: [
      { code: "115-FZ", name: "Xorijiy fuqarolarning huquqiy holati to'g'risida", keyArticles: "13.3-modda (Patent olish va to'lash), 5-modda (Rossiyada bo'lish muddati), 18-modda" },
      { code: "RF TK", name: "RF Mehnat Kodeksi", keyArticles: "67-modda (Mehnat shartnomasi rasmiylashtirish), 136-modda (Oylik to'lash muddatlari), 236-modda (Kechikish jarimasi)" },
      { code: "RF KoAP", name: "Ma'muriy huquqbuzarliklar kodeksi", keyArticles: "18.8-modda (Registratsiya qoidasini buzish - deport xavfi), 18.10-modda (Patentsiz ishlash)" }
    ],
    commonScenarios: [
      {
        id: 'ru_police',
        title: "Politsiya ko'chada to'xtatganda nima qilish kerak?",
        problem: "Politsiya xodimi tekshiruv bahonasida bo'limga olib ketmoqchi yoki pul talab qilyapti.",
        solutionTips: "RF 'Politsiya to'g'risida'gi qonunining 5-moddasiga ko'ra xodim o'zini tanishtirishi va xizmat guvohnomasini ko'rsatishi shart. Pasport, migratsion karta, registratsiya va to'langan patent cheklarini taqdim eting. Protokolsiz ushlab turish 3 soatdan oshmasligi kerak.",
        recommendedQuestion: "Rossiyada politsiya to'xtatganda chet el fuqarosining qonuniy huquqlari va majburiyatlari nimalardan iborat?"
      },
      {
        id: 'ru_salary',
        title: "Ish beruvchi oylik bermayapti / Pasportni olib qo'ydi",
        problem: "Obyektda ishladik, oylikni bermay haydab yuborish bilan qo'rqityapti.",
        solutionTips: "RF Jinoyat Kodeksining 145.1-moddasiga (ish haqini to'lamaslik) va 325-moddasiga (pasportni olib qo'yish taqiqlangan) asosan jinoiy javobgarlik mavjud. Prokuratura va Rostrudga shikoyat yoziladi.",
        recommendedQuestion: "Rossiyada firma ish haqimni bermasdan qo'rqityapti, prokuratura va Rostrudga shikoyat arizasi qanday yoziladi?"
      }
    ]
  },
  {
    id: 'tr',
    name: "Turkiya",
    flag: '🇹🇷',
    currency: 'TRY (Lira)',
    code: 'TR',
    description: "Turkiya Respublikasi 6458-sonli 'Chet elliklar va xalqaro himoya to'g'risida'gi qonuni, İkamet (yashash guvohnomasi) va Çalışma İzni.",
    hotlines: [
      { title: "Istanbuldagi O'zbekiston Bosh Konsulligi", phone: "+90 (212) 323-20-37", desc: "Favqulodda konsullik yordami" },
      { title: "Turkiya Migratsiya Markazi (YİMER)", phone: "157", desc: "Turk, rus, o'zbek tillarida viza va ikamet maslahati" },
      { title: "Turkiya Favqulodda qo'ng'iroq (Alo 112)", phone: "112", desc: "Politsiya, jandarma va tez tibbiy yordam" }
    ],
    criticalLaws: [
      { code: "6458-sayılı", name: "Yabancılar ve Uluslararası Koruma Kanunu", keyArticles: "31-madde (Kısa dönem ikamet), 54-madde (Sınır dışı etme kararı - Deport), 53-madde (Sudga e'tiroz)" },
      { code: "6735-sayılı", name: "Uluslararası İşgücü Kanunu", keyArticles: "Chalışma izni (mehnat ruxsati) bo'lmagan holda ishlash jarimalari va huquqiy himoya" }
    ],
    commonScenarios: [
      {
        id: 'tr_deport',
        title: "İkamet muddati tugadi yoki rad javobi berildi (Tahdit kodu)",
        problem: "İkamet berilmadi va 10 kun ichida chiqib ketish xati (Tebligat) berildi.",
        solutionTips: "6458-sonli qonunning 53-moddasiga binoan, Idare Mahkemesi (Ma'muriy sud)ga 7 kun ichida Yürütmeyi Durdurma (Ijroni to'xtatish) arizasi berilsa, sud tugaguncha Turkiya hududida qonuniy qolish mumkin.",
        recommendedQuestion: "Turkiyada ikametga rad javobi olganda deportatsiyani to'xtatish uchun sudga qanday ariza berish kerak?"
      }
    ]
  },
  {
    id: 'kr',
    name: "Janubiy Koreya",
    flag: '🇰🇷',
    currency: 'KRW (Won)',
    code: 'KR',
    description: "Janubiy Koreya Mehnat standartlari qonuni (근로기준법), E-9 EPS tizimi, G-1, H-2 viza qoidalari va noqonuniy holatdan himoya.",
    hotlines: [
      { title: "Seuldagi O'zbekiston Elchixonasi", phone: "+82 (2) 574-6554", desc: "Konsullik va fuqarolarni himoya qilish" },
      { title: "Koreya Mehnat Vazirligi maslahat markazi", phone: "1350", desc: "Oylik to'lanmaganda, jarohat olganda (chet tillarida)" },
      { title: "Koreya Immigratsiya aloqa markazi", phone: "1345", desc: "Viza, yashash muddati va qonuniy masalalar" }
    ],
    criticalLaws: [
      { code: "근로기준법", name: "Mehnat standartlari qonuni (Labor Standards Act)", keyArticles: "36-modda (Ishdan ketgach 14 kun ichida barcha hisob-kitob qilinishi), 56-modda (Qo'shimcha soatlar uchun 1.5 baravar to'lov)" },
      { code: "출입국관리법", name: "Immigratsiya nazorati qonuni", keyArticles: "Viza toifasini o'zgartirish, noqonuniy maqomdagi shaxslarning mehnat huquqlari daxlsizligi" }
    ],
    commonScenarios: [
      {
        id: 'kr_unpaid',
        title: "Xo'jayin (Sajangnim) maosh va ta'tildan chiqqan hisobni (Toejikgeum) bermayapti",
        problem: "Koreyada 1 yildan ortiq ishladim, lekin xo'jayin Toejikgeum bermasdan ket demoqda.",
        solutionTips: "Koreya qonunlariga ko'ra noqonuniy (nelegal) ishchiga ham barcha ishlangan maosh va Toejikgeum to'liq to'lanishi kafolatlangan! 노동부 (Nodongbu - Mehnat vazirligi)ga ariza topshiriladi.",
        recommendedQuestion: "Janubiy Koreyada mehnat vazirligiga (Nodongbu) to'lanmagan oylik va toejikgeum bo'yicha qanday shikoyat qilinadi?"
      }
    ]
  },
  {
    id: 'kz',
    name: "Qozog'iston",
    flag: '🇰🇿',
    currency: 'KZT (Tenge)',
    code: 'KZ',
    description: "Qozog'iston Respublikasi migratsiya qonunchiligi, YeAES tranzit qoidalari, 30 va 90 kunlik registratsiya tartibi.",
    hotlines: [
      { title: "Ostonadagi O'zbekiston Elchixonasi", phone: "+7 (7172) 95-45-87", desc: "Favqulodda konsullik yordami" },
      { title: "Olmaotadagi Bosh Konsullik", phone: "+7 (727) 291-11-21", desc: "Janubiy viloyatlar bo'yicha yordam" },
      { title: "Qozog'iston Ichki ishlar migratsiya xizmati", phone: "1414", desc: "Ro'yxatdan o'tish qoidalari" }
    ],
    criticalLaws: [
      { code: "RK Migratsiya", name: "Aholining migratsiyasi to'g'risida Qonun", keyArticles: "Vaqtinchalik yashash ruxsatnomasi (RVP), jismoniy shaxslar uchun mehnat ruxsatnomasi" },
      { code: "RK KoAP", name: "Ma'muriy javobgarlik to'g'risida kodeks", keyArticles: "517-modda (Chet elliklar tomonidan Qozog'istonda bo'lish qoidalarini buzish)" }
    ],
    commonScenarios: [
      {
        id: 'kz_reg',
        title: "Qozog'istonda 30 kundan ortiq qolish va RVP olish tartibi",
        problem: "O'zbekiston fuqarosi vizasiz 30 kun yura oladi, undan keyin qanday qonuniylashtirish kerak?",
        solutionTips: "Mehnat shartnomasi tuzib, ish beruvchi orqali E-Qonaq yoki Xalqqa xizmat ko'rsatish markazi (SON) orqali 1 yilgacha RVP rasmiylashtiriladi.",
        recommendedQuestion: "Qozog'istonda 30 kundan keyin qonuniy ishlash uchun RVP olish talablari va tartibi qanday?"
      }
    ]
  },
  {
    id: 'us',
    name: "AQSH (Amerika Qo'shma Shtatlari)",
    flag: '🇺🇸',
    currency: 'USD (Dollar)',
    code: 'US',
    description: "AQSH Immigratsiya qonunchiligi (INA), Mehnat huquqlari (FLSA), Viza turlari, B1/B2, Green Card, Siyosiy boshpana (Asylum) va ICE dan himoya.",
    hotlines: [
      { title: "Vashingtondagi O'zbekiston Elchixonasi", phone: "+1 (202) 427-4632", desc: "AQSHdagi vatandoshlar uchun tezkor liniya" },
      { title: "Nyu-Yorkdagi Bosh Konsullik", phone: "+1 (212) 754-7403", desc: "Konsullik va viza xizmatlari" },
      { title: "AQSH Favqulodda yordam xizmati", phone: "911", desc: "Politsiya va favqulodda yordam" }
    ],
    criticalLaws: [
      { code: "INA", name: "Immigration and Nationality Act", keyArticles: "Section 208 (Asylum huquqi), Section 240 (Chiqarib yuborish bo'yicha sud eshituvlari)" },
      { code: "FLSA", name: "Fair Labor Standards Act", keyArticles: "Minimal soatbay ish haqi, statusidan qat'i nazar noqonuniy ushlab qolingan ish haqini undirish" }
    ],
    commonScenarios: [
      {
        id: 'us_ice',
        title: "ICE xodimlari yoki politsiya to'xtatganda nima qilish kerak?",
        problem: "Immigratsiya xodimlari ko'chada yoki uyga kelib so'roq qilmoqchi.",
        solutionTips: "AQSH Konstitutsiyasining 5-tuzatishiga ko'ra jim turish huquqingiz bor ('I choose to remain silent'). Advokatsiz hech qanday qog'ozga qo'l qo'ymang. Sudya tomonidan imzolangan 'Search Warrant' bo'lmasa, eshikni ochmaslikka haqlisiz.",
        recommendedQuestion: "AQSHda noqonuniy holatda bo'lgan shaxs ICE bilan to'qnashganda qanday konstitutsiyaviy huquqlarga ega?"
      }
    ]
  },
  {
    id: 'uk',
    name: "Buyuk Britaniya (UK)",
    flag: '🇬🇧',
    currency: 'GBP (Funt sterling)',
    code: 'GB',
    description: "UK Home Office qoidalari, Mavsumiy qishloq xo'jaligi vizasi (Seasonal Worker Visa), Tier-2 va mehnat huquqlari (Employment Rights Act 1996).",
    hotlines: [
      { title: "Londondagi O'zbekiston Elchixonasi", phone: "+44 (207) 229-7679", desc: "Konsullik xizmati" },
      { title: "ACAS (Mehnat nizolari va arbitraj xizmati)", phone: "0300 123 1100", desc: "Ish beruvchi nohaqligi bo'yicha bepul maslahat" },
      { title: "GLAA (Mehnat ekspluatatsiyasiga qarshi organ)", phone: "0800 432 0804", desc: "Fermadagi zo'ravonlik va pasport tortib olish bo'yicha" }
    ],
    criticalLaws: [
      { code: "ERA 1996", name: "Employment Rights Act 1996", keyArticles: "Ish vaqti me'yorlari, National Minimum Wage Act (minimal ish haqi kafolatlari)" }
    ],
    commonScenarios: [
      {
        id: 'uk_farm',
        title: "Seasonal Worker fermada soat berilmayapti yoki yomon sharoit",
        problem: "Operator va'da qilgan soatlarni bermayapti yoki yashash uchun haddan tashqari ko'p pul ushlab qolyapti.",
        solutionTips: "GLAA va ACAS qoidalariga ko'ra fermer haftalik kafolatlangan soatni ta'minlashi shart. Operator (Pro-Force, Fruitful va boshqalar)ga rasmiy shikoyat xati yoziladi.",
        recommendedQuestion: "Buyuk Britaniyada mavsumiy ishchi vizasida fermada huquqlar buzilganda GLAA va ACAS ga murojaat qilish tartibi qanday?"
      }
    ]
  },
  {
    id: 'pl',
    name: "Polsha va Yevropa Ittifoqi",
    flag: '🇵🇱',
    currency: 'PLN (Zloty)',
    code: 'PL',
    description: "Polsha Kodeks pracy (Mehnat kodeksi), Karta Pobytu (yashash kartasi), Zezwolenie na pracę (ish ruxsati) va Shengen qoidalari.",
    hotlines: [
      { title: "Varshavadagi O'zbekiston Elchixonasi", phone: "+48 (22) 895-65-88", desc: "Favqulodda konsullik yordami" },
      { title: "PIP (Panstwowa Inspekcja Pracy - Mehnat inspeksiyasi)", phone: "22 111 35 29", desc: "Polshada ish beruvchi ustidan shikoyat" },
      { title: "Yevropa Favqulodda raqami", phone: "112", desc: "Tezkor politsiya va qutqaruv" }
    ],
    criticalLaws: [
      { code: "Ustawa o cudzoziemcach", name: "Polsha chet elliklar to'g'risida qonun", keyArticles: "Karta pobytu muddatlari, deportatsiya qarori ustidan Urząd do Spraw Cudzoziemców ga apellyatsiya" },
      { code: "Kodeks pracy", name: "Mehnat kodeksi", keyArticles: "Umowa o pracę shartnomasi kafolatlari, noqonuniy ishdan bo'shatishga qarshi sud" }
    ],
    commonScenarios: [
      {
        id: 'pl_karta',
        title: "Karta Pobytu muddati kechikmoqda yoki ish joyi o'zgardi",
        problem: "Voivodship arizani 8 oydan beri ko'rmayapti, pasportimda faqat qizil muhr (czerwona pieczątka) bor.",
        solutionTips: "Qizil muhr bilan Polshada qonuniy yashash va ishlash mumkin. Muddatni tezlashtirish uchun 'Ponaglenie' (rasmiy shoshiltirish xati) topshiriladi.",
        recommendedQuestion: "Polshada Karta Pobytu jarayonini tezlashtirish uchun Voivodaga Ponaglenie arizasi qanday yoziladi?"
      }
    ]
  },
  {
    id: 'ae',
    name: "BAA (Birlashgan Arab Amirliklari / Dubay)",
    flag: '🇦🇪',
    currency: 'AED (Dirham)',
    code: 'AE',
    description: "BAA Federal Mehnat Qonuni (Federal Decree-Law No. 33 of 2021), MOHRE talablari, Kafolat tizimi va pasport tortib olishga qarshi huquqlar.",
    hotlines: [
      { title: "Dubaydagi O'zbekiston Bosh Konsulligi", phone: "+971 (4) 370-6060", desc: "Konsullik va fuqarolarni himoya qilish" },
      { title: "MOHRE (Mehnat vazirligi tezkor liniyasi)", phone: "800 60", desc: "Ish beruvchilar bilan mojarolar bo'yicha 24/7 bepul aloqa" },
      { title: "Dubay Politsiyasi", phone: "999", desc: "Favqulodda vaziyatlar" }
    ],
    criticalLaws: [
      { code: "Decree-Law 33/2021", name: "Regulation of Labour Relations", keyArticles: "Article 13 (Pasportni ish beruvchi tomonidan olib qo'yilishi qat'iyan taqiqlanadi), Article 54 (Mehnat nizolari tartibi)" }
    ],
    commonScenarios: [
      {
        id: 'ae_passport',
        title: "Kompaniya pasportimni berishdan bosh tortmoqda",
        problem: "Ishga kirganimda viza qilamiz deb pasportimni olib qo'yishdi, qaytarib bermayapti.",
        solutionTips: "BAA qonunchiligiga ko'ra pasport xodimning shaxsiy mulki bo'lib, uni saqlab qolish jinoiy javobgarlikka sabab bo'ladi. Darhol MOHRE yoki Amer Center orqali shikoyat qilinadi.",
        recommendedQuestion: "Dubayda ish beruvchi pasportimni olib qo'ydi va bermayapti, MOHRE va politsiyaga qanday murojaat qilishim kerak?"
      }
    ]
  },
  {
    id: 'de',
    name: "Germaniya",
    flag: '🇩🇪',
    currency: 'EUR (Yevro)',
    code: 'DE',
    description: "Germaniya Fachkräfteeinwanderungsgesetz (Malakali mutaxassislar immigratsiyasi qonuni), Chancenkarte, Ausbildung va BGB mehnat huquqi.",
    hotlines: [
      { title: "Berlindegi O'zbekiston Elchixonasi", phone: "+49 (30) 3940980", desc: "Elchixona konsullik bo'limi" },
      { title: "Make it in Germany info liniyasi", phone: "+49 30 1815 1111", desc: "Viza va ishga joylashish bo'yicha rasmiy davlat portali" },
      { title: "Politsiya", phone: "110", desc: "Shoshilinch xizmat" }
    ],
    criticalLaws: [
      { code: "AufenthG", name: "Aufenthaltsgesetz (Yashash to'g'risida qonun)", keyArticles: "18a/18b-moddalar (Ishchi viza), 20a-modda (Chancenkarte - Imkoniyat kartasi)" },
      { code: "BGB", name: "Bürgerliches Gesetzbuch (Fuqarolik kodeksi)", keyArticles: "611a-modda (Mehnat shartnomasi), Kündigungsschutzgesetz (Ishdan bo'shatishdan himoya)" }
    ],
    commonScenarios: [
      {
        id: 'de_ausbildung',
        title: "Ausbildung yoki ish shartnomasini bekor qilish xavfi",
        problem: "Ish beruvchi sinov muddati (Probezeit) davomida yoki undan keyin shartnomani to'xtatmoqchi.",
        solutionTips: "Germaniyada Kündigung yozma bo'lishi shart. Agar Kündigung olinsa, 3 hafta ichida Arbeitsgericht (Mehnat sudi)ga murojaat qilish kerak.",
        recommendedQuestion: "Germaniyada ish beruvchi shartnomani bekor qilganda xodimning mehnat huquqlari va viza holati nima bo'ladi?"
      }
    ]
  },
  {
    id: 'jp',
    name: "Yaponiya",
    flag: '🇯🇵',
    currency: 'JPY (Iena)',
    code: 'JP',
    description: "Yaponiya Immigratsiya nazorati qonuni, Tokutei Ginou (belgilangan ko'nikmalar), TITP (texnik stajyor) va Roudou Kijunhou (Mehnat standartlari).",
    hotlines: [
      { title: "Tokiodagi O'zbekiston Elchixonasi", phone: "+81 (3) 6277-2692", desc: "Konsullik yordami" },
      { title: "OTIT (Xorijiy amaliyotchilar tashkiloti)", phone: "0120-250-168", desc: "O'zbek va rus tillarida stajyorlar uchun bepul maslahat" },
      { title: "Yaponiya politsiyasi", phone: "110", desc: "Favqulodda yordam" }
    ],
    criticalLaws: [
      { code: "労働基準法", name: "Roudou Kijunhou (Mehnat standartlari qonuni)", keyArticles: "24-modda (To'liq ish haqi to'g'ridan-to'g'ri to'lanishi), 37-modda (Ortiqcha ish haqi)" },
      { code: "出入国管理法", name: "Immigratsiya qonuni", keyArticles: "Status of Residence talablari" }
    ],
    commonScenarios: [
      {
        id: 'jp_transfer',
        title: "Tokutei Ginou bo'yicha boshqa kompaniyaga o'tish",
        problem: "Hozirgi zavodda sharoit og'ir, boshqa ishga o'tishim mumkinmi?",
        solutionTips: "Tokutei Ginou vizasida xodim boshqa kompaniyaga o'tish (Tenshoku) huquqiga ega. Buning uchun yangi ish topib, Nyukan (Immigratsiya)ga ariza beriladi.",
        recommendedQuestion: "Yaponiyada Tokutei Ginou vizasi bilan ish joyini qonuniy o'zgartirish tartibi qanday?"
      }
    ]
  }
];
