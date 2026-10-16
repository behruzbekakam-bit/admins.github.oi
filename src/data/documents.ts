import { DocumentTemplate } from '../types';

export const INITIAL_TEMPLATES: DocumentTemplate[] = [
  // 1. COURT: Qarz undirish
  {
    id: 'court_debt',
    title: "Qarzni undirish to'g'risida Da'vo arizasi",
    category: 'court',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zbekiston Respublikasi Fuqarolik Kodeksining 732, 735, 736-moddalari hamda FPK 188, 189-moddalari",
    description: "Qarz berilgan pul belgilangan muddatda qaytarilmagan holatda Fuqarolik ishlari bo'yicha tumanlararo sudiga kiritiladigan rasmiy da'vo arizasi.",
    fields: [
      { id: 'courtName', label: "Sud nomi", type: 'text', required: true, defaultValue: "Fuqarolik ishlari bo'yicha Shayxontohur tumanlararo sudi" },
      { id: 'claimant', label: "Da'vogar (F.I.Sh., Manzil, Pasport, Tel)", type: 'textarea', required: true, defaultValue: "Aliyev Valijon Sobirovich, Toshkent sh., Chilonzor 5-mavze 12-uy, Tel: +998 90 123-45-67" },
      { id: 'respondent', label: "Javobgar (F.I.Sh., Manzil, Tel)", type: 'textarea', required: true, defaultValue: "Sobirov Toxir Anvarovich, Toshkent sh., Yunusobod 4-mavze 8-uy, Tel: +998 93 987-65-43" },
      { id: 'debtAmount', label: "Qarz summasi (so'm)", type: 'text', required: true, defaultValue: "25 000 000 (yigirma besh million) so'm" },
      { id: 'borrowDate', label: "Qarz berilgan sana", type: 'date', required: true, defaultValue: "2024-03-15" },
      { id: 'dueDate', label: "Qaytarish muddati", type: 'date', required: true, defaultValue: "2024-09-01" },
      { id: 'evidence', label: "Asoslovchi dalillar", type: 'textarea', required: true, defaultValue: "Yozma tilxat nusxasi, bank to'lov cheki va SMS yozishmalar" }
    ]
  },

  // 2. COURT: Aliment undirish
  {
    id: 'court_alimony',
    title: "Aliment undirish to'g'risida Sud buyrug'i arizasi",
    category: 'court',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zbekiston Respublikasi Oila Kodeksining 96, 99-moddalari va FPK 171-moddasi",
    description: "Voyaga yetmagan farzandlar ta'minoti uchun ota/onadan qisqa muddatda sud majlislarisiz aliment undirish arizasi.",
    fields: [
      { id: 'courtName', label: "Tumanlararo fuqarolik sudi", type: 'text', required: true, defaultValue: "Fuqarolik ishlari bo'yicha Mirzo Ulug'bek tumanlararo sudi" },
      { id: 'applicant', label: "Ariza beruvchi (F.I.Sh., Manzil, Tel)", type: 'textarea', required: true, defaultValue: "Karimova Zilola Akramovna, Toshkent sh., Mirzo Ulug'bek tumani, Tel: +998 91 234-56-78" },
      { id: 'debtor', label: "Qarzdor (Aliment to'lovchi F.I.Sh., Ish joyi, Tel)", type: 'textarea', required: true, defaultValue: "Karimov Botir Anvarovich, Toshkent sh., Yunusobod tumani, 'Grand Invest' MChJ xodimi" },
      { id: 'children', label: "Farzandlar (Ismi, tug'ilgan sanasi)", type: 'textarea', required: true, defaultValue: "Karimov Diyor Botir o'g'li, 2019-yil 12-mayda tug'ilgan" },
      { id: 'fraction', label: "Undiriladigan miqdor", type: 'select', required: true, options: ["1 bola uchun 1/4 qismi", "2 bola uchun 1/3 qismi", "3 va undan ortiq bola uchun 1/2 qismi"] }
    ]
  },

  // 3. COURT: Nikohni bekor qilish
  {
    id: 'court_divorce',
    title: "Nikohni bekor qilish to'g'risida Da'vo arizasi",
    category: 'court',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zbekiston Respublikasi Oila Kodeksining 37-43 moddalari, FPK 189-moddasi",
    description: "Oila saqlanib qolishi imkonsiz bo'lganda sud orqali qonuniy nikohni bekor qilish to'g'risidagi rasmiy da'vo arizasi.",
    fields: [
      { id: 'courtName', label: "Fuqarolik sudi nomi", type: 'text', required: true, defaultValue: "Fuqarolik ishlari bo'yicha Yakkasaroy tumanlararo sudi" },
      { id: 'claimant', label: "Da'vogar ma'lumotlari", type: 'textarea', required: true, defaultValue: "Nazarova Feruza Ilhomovna, Toshkent sh., Yakkasaroy tumani" },
      { id: 'respondent', label: "Javobgar ma'lumotlari", type: 'textarea', required: true, defaultValue: "Nazarov Rustam Baxtiyorovich, Toshkent sh., Chilonzor tumani" },
      { id: 'marriageDate', label: "Nikoh qayd etilgan sana va FHDYO bo'limi", type: 'text', required: true, defaultValue: "2018-yil 14-oktabrda Yakkasaroy tumani FHDYO bo'limida" },
      { id: 'childrenInfo', label: "Voyaga yetmagan bolalar", type: 'textarea', required: true, defaultValue: "1 nafar farzandimiz bor: Nazarov Asadbek Rustam o'g'li (2020-yilda tug'ilgan)" },
      { id: 'reason', label: "Ajralish sabablari", type: 'textarea', required: true, defaultValue: "Xarakterlar to'g'ri kelmasligi sababli 1 yildan buyon birga yashamaymiz, oilani tiklash imkonsiz" }
    ]
  },

  // 4. COURT: Moddiy va ma'naviy zararni undirish
  {
    id: 'court_damages',
    title: "Moddiy va Ma'naviy zararni undirish to'g'risida Da'vo arizasi",
    category: 'court',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zR Fuqarolik Kodeksining 985, 989, 1021, 1022-moddalari",
    description: "Avtohalokat (DTY), xonadonni suv bosishi yoki noqonuniy xatti-harakatlar natijasida yetkazilgan moddiy va ma'naviy zararlarni undirish da'vosi.",
    fields: [
      { id: 'courtName', label: "Fuqarolik sudi", type: 'text', required: true, defaultValue: "Fuqarolik ishlari bo'yicha Sergeli tumanlararo sudi" },
      { id: 'claimant', label: "Da'vogar (Zarar ko'rgan shaxs)", type: 'textarea', required: true, defaultValue: "Usmonov Jamshid Akmalovich, Toshkent sh., Sergeli tumani, Tel: +998 90 345-67-89" },
      { id: 'respondent', label: "Javobgar (Zarar yetkazuvchi shaxs/tashkilot)", type: 'textarea', required: true, defaultValue: "Qodirov Sardor Olimovich, Toshkent sh., Yangihayot tumani" },
      { id: 'incidentDate', label: "Hodisa ro'y bergan sana va holat", type: 'textarea', required: true, defaultValue: "2024-yil 10-iyunda javobgar boshqaruvidagi avtomobil ehtiyotsizligi oqibatida yo'l-transport hodisasi sodir bo'lgan" },
      { id: 'materialDamage', label: "Moddiy zarar summasi (Baholash xulosasi asosida)", type: 'text', required: true, defaultValue: "18 500 000 so'm" },
      { id: 'moralDamage', label: "Ma'naviy zarar summasi", type: 'text', required: true, defaultValue: "5 000 000 so'm" },
      { id: 'evidence', label: "Dalillar (YPX bayonnomasi, baholash ekspertizasi, dalolatnoma)", type: 'textarea', required: true, defaultValue: "YPX ma'muriy qarori, mustaqil baholovchi xulosasi va ta'mirlash cheklari" }
    ]
  },

  // 5. COURT: Apellyatsiya shikoyati
  {
    id: 'court_appeal',
    title: "Sud qarori ustidan Apellyatsiya Shikoyati",
    category: 'court',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zbekiston Respublikasi Fuqarolik protsessual kodeksining 383, 385, 388-moddalari",
    description: "Birinchi instansiya sudining noqonuniy yoki asossiz hal qiluv qaroridan norozi bo'lganda viloyat / Toshkent shahar sudiga kiritiladigan rasmiy shikoyat.",
    fields: [
      { id: 'appellateCourt', label: "Apellyatsiya instansiyasi sudi nomi", type: 'text', required: true, defaultValue: "Toshkent shahar sudi fuqarolik ishlari bo'yicha sudlov hay'atiga" },
      { id: 'applicant', label: "Shikoyat beruvchi (F.I.Sh., Manzil, Ishdagi maqomi)", type: 'textarea', required: true, defaultValue: "Aliyev Valijon Sobirovich (da'vogar), Toshkent sh., Chilonzor tumani" },
      { id: 'firstInstanceDecision', label: "Qaysi sudning qarori va sanasi (Ish raqami)", type: 'text', required: true, defaultValue: "FIB Mirzo Ulug'bek tumanlararo sudining 2024-yil 15-maydagi 2-1234/24-sonli hal qiluv qarori" },
      { id: 'grounds', label: "Sud qarorining noqonuniyligi asoslari", type: 'textarea', required: true, defaultValue: "Sud moddiy huquq normalarini noto'g'ri qo'llagan va ish uchun muhim bo'lgan dalillarga to'liq baho bermagan" },
      { id: 'request', label: "Apellyatsiya talabi (Bekor qilish, yangi qaror chiqarish)", type: 'text', required: true, defaultValue: "Birinchi instansiya qarorini bekor qilib, da'voni to'liq qanoatlantirish to'g'risida yangi qaror chiqarishingizni so'rayman" }
    ]
  },

  // 6. CONTRACT: Kvartira / Bino Ijara shartnomasi
  {
    id: 'contract_rent',
    title: "Turar joy (Kvartira / Hovli) Ijara Shartnomasi",
    category: 'contract',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zbekiston Respublikasi Fuqarolik Kodeksining 600-614 moddalari va Soliq kodeksi",
    description: "Ijaraga beruvchi va ijarachi o'rtasidagi rasmiy kafolatlangan turar-joy ijara shartnomasi (depozit, to'lov muddati va buzilish jarimalari bilan).",
    fields: [
      { id: 'landlord', label: "Ijaraga beruvchi (Mulkdor F.I.Sh., Pasport, Tel)", type: 'textarea', required: true, defaultValue: "Rahimov Alisher Vohidovich, Pasport: AB 7654321, Tel: +998 97 111-22-33" },
      { id: 'tenant', label: "Ijarachi (F.I.Sh., Pasport, Tel)", type: 'textarea', required: true, defaultValue: "Sultonov Murod Dilshodovich, Pasport: AC 9876543, Tel: +998 90 999-88-77" },
      { id: 'propertyAddress', label: "Xonadon manzili va xonalar soni", type: 'text', required: true, defaultValue: "Toshkent sh., Chilonzor tumani, 9-mavze, 15-uy, 24-xonadon (3 xonali)" },
      { id: 'monthlyFee', label: "Oylik ijara to'lovi (So'm)", type: 'text', required: true, defaultValue: "5 000 000 (besh million) so'm" },
      { id: 'depositAmount', label: "Kafolat depoziti (zalog)", type: 'text', required: true, defaultValue: "2 500 000 so'm" },
      { id: 'periodMonths', label: "Ijara muddati", type: 'text', required: true, defaultValue: "11 oy muddatga" }
    ]
  },

  // 7. CONTRACT: Qarz shartnomasi va Tilxat
  {
    id: 'contract_loan',
    title: "Qarz Shartnomasi va Tilxat (Notarial standart)",
    category: 'contract',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zR FK 732-736 moddalari",
    description: "Fuqarolar o'rtasida pul mablag'ini ma'lum muddatga berishni tasdiqlovchi rasmiy tilxatli qarz shartnomasi.",
    fields: [
      { id: 'lender', label: "Qarz beruvchi (F.I.Sh., Pasport, Manzil)", type: 'textarea', required: true, defaultValue: "Sharipov Anvar Karimovich, Pasport: AA 5554433, Toshkent shahar" },
      { id: 'borrower', label: "Qarz oluvchi (F.I.Sh., Pasport, Manzil)", type: 'textarea', required: true, defaultValue: "G'ofurov Oybek Akromovich, Pasport: AB 1122334, Samarqand shahar" },
      { id: 'amount', label: "Berilgan pul summasi", type: 'text', required: true, defaultValue: "30 000 000 (o'ttiz million) so'm" },
      { id: 'returnDate', label: "Qaytarishning oxirgi sanasi", type: 'date', required: true, defaultValue: "2025-01-10" },
      { id: 'penaltyPerDay', label: "Kechiktirilgan har bir kun uchun penya", type: 'text', defaultValue: "Har bir kechiktirilgan kun uchun qarz summasining 0.1% miqdorida" }
    ]
  },

  // 8. CONTRACT: Avtomobil oldi-sotdi shartnomasi
  {
    id: 'contract_car_sale',
    title: "Avtomobil Oldi-Sotdi Shartnomasi",
    category: 'contract',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zR Fuqarolik Kodeksining 386-424 moddalari",
    description: "Jismoniy shaxslar o'rtasida avtotransport vositasini sotish, mulk huquqini o'tkazish va to'lovni tasdiqlovchi shartnoma.",
    fields: [
      { id: 'seller', label: "Sotuvchi ma'lumotlari (F.I.Sh., Pasport, Manzil)", type: 'textarea', required: true, defaultValue: "Yusupov Bobur Toxirovich, Toshkent sh., Shayxontohur tumani" },
      { id: 'buyer', label: "Xaridor ma'lumotlari (F.I.Sh., Pasport, Manzil)", type: 'textarea', required: true, defaultValue: "Karimov Otabek Sodiqovich, Toshkent sh., Olmazor tumani" },
      { id: 'carDetails', label: "Avtomobil rusumi, davlat raqami, kuzov va dvigatel raqamlari", type: 'textarea', required: true, defaultValue: "Chevrolet Lacetti (Gentra), Davlat raqami: 01 A 777 BA, Kuzov raqami: XWB12345678" },
      { id: 'price', label: "Avtomobil kelishilgan bahosi (so'm)", type: 'text', required: true, defaultValue: "145 000 000 (bir yuz qirq besh million) so'm" },
      { id: 'paymentTerms', label: "To'lov shakli va topshirish muddati", type: 'text', required: true, defaultValue: "Shartnoma imzolangan paytda naqd/bank o'tkazmasi orqali to'liq to'lanadi" }
    ]
  },

  // 9. CONTRACT: Xizmat ko'rsatish shartnomasi (Frilans / Usta / Pudrat)
  {
    id: 'contract_service',
    title: "Xizmat Ko'rsatish (Pudrat / Frilans) Shartnomasi",
    category: 'contract',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zR Fuqarolik Kodeksining 631-655, 703-moddalari",
    description: "Buyurtmachi va ijrochi (usta, dasturchi, dizayner, frilanser) o'rtasida sifatli xizmat ko'rsatish va haq to'lash bo'yicha mustahkam shartnoma.",
    fields: [
      { id: 'client', label: "Buyurtmachi (Kompaniya yoki shaxs ma'lumotlari)", type: 'textarea', required: true, defaultValue: "'Smart Tech' MChJ nomidan direktor Salimov K.A." },
      { id: 'contractor', label: "Ijrochi (Mutaxassis F.I.Sh., JShShIR, Bank kartasi)", type: 'textarea', required: true, defaultValue: "Axmedov Sardor Baxtiyorovich, Pasport: AA 9988776" },
      { id: 'serviceDescription', label: "Bajariladigan ish/xizmat turi va texnik topshiriq", type: 'textarea', required: true, defaultValue: "Veb-sayt va mobil ilova dizaynini ishlab chiqish hamda texnik topshiriqqa asosan topshirish" },
      { id: 'totalCost', label: "Xizmat haqi va to'lov bosqichlari", type: 'text', required: true, defaultValue: "12 000 000 so'm (50% avans, 50% qabul dalolatnomasi imzolangach)" },
      { id: 'deadline', label: "Ishni yakunlash oxirgi muddati", type: 'date', required: true, defaultValue: "2024-12-01" }
    ]
  },

  // 10. POA: Avtotransport ishonchnomasi
  {
    id: 'poa_car',
    title: "Avtotransport vositasini boshqarish Ishonchnomasi",
    category: 'power_of_attorney',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zR Fuqarolik Kodeksining 134-144 moddalari",
    description: "Avtomashinani boshqarish, texnik ko'rikdan o'tkazish va jarimalarni to'lash bo'yicha uchinchi shaxsga beriladigan ishonchnoma.",
    fields: [
      { id: 'principal', label: "Mulkdor (F.I.Sh., Pasport, Manzil)", type: 'textarea', required: true, defaultValue: "Aliyev Valijon Sobirovich, Toshkent shahar" },
      { id: 'agent', label: "Ishonchli haydovchi (F.I.Sh., Haydovchilik guvohnomasi)", type: 'textarea', required: true, defaultValue: "Sobirov Toxir Anvarovich, Haydovchilik guvohnomasi: AF 123456" },
      { id: 'carModel', label: "Avtomobil rusumi va davlat raqami", type: 'text', required: true, defaultValue: "Chevrolet Cobalt, 01 A 777 AA" },
      { id: 'validity', label: "Amal qilish muddati", type: 'select', options: ["1 yil muddatga", "2 yil muddatga", "3 yil muddatga"] }
    ]
  },

  // 11. POA: Farzandni chet elga olib chiqish uchun Notarial Rozilik xati
  {
    id: 'poa_child_travel',
    title: "Farzandni chet elga olib chiqish uchun Otaning/Onaning Rozilik Xati",
    category: 'power_of_attorney',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zbekiston Respublikasi Oila Kodeksi va Vazirlar Mahkamasining 2020-yil 365-sonli qarori",
    description: "Voyaga yetmagan bolani chet elga (sayohat, o'qish, davolanish uchun) olib chiqishda chegara nazorati va viza markazlari talab qiladigan notarial rozilik xati.",
    fields: [
      { id: 'parentConsenting', label: "Rozilik beruvchi ota/ona (F.I.Sh., Pasport, Manzil)", type: 'textarea', required: true, defaultValue: "Mirzayev Ravshan Komilovich, Pasport: AA 3344556, Toshkent sh., Yunusobod tumani" },
      { id: 'parentAccompanying', label: "Kuzatib boruvchi shaxs (Ona yoki mas'ul shaxs)", type: 'textarea', required: true, defaultValue: "Mirzayeva Lola Baxtiyorovna (bolaning onasi), Pasport: AA 7766554" },
      { id: 'childDetails', label: "Bola ma'lumotlari (Ismi, Tug'ilgan sanasi, Qizil xorijiy pasport raqami)", type: 'textarea', required: true, defaultValue: "Mirzayev Amir Ravshan o'g'li, 2017-08-20 da tug'ilgan, Xorijiy pasport: FA 1234567" },
      { id: 'countries', label: "Qaysi davlatlarga borishga ruxsat beriladi", type: 'text', required: true, defaultValue: "Turkiya, BAA, Misr va barcha Shengen mamlakatlariga" },
      { id: 'period', label: "Ruxsat etilgan muddat", type: 'text', required: true, defaultValue: "2024-yil 1-iyuldan 2025-yil 1-iyulga qadar" }
    ]
  },

  // 12. APP: Merosga bo'lgan huquq to'g'risida Notariusga Ariza
  {
    id: 'app_inheritance',
    title: "Merosni Qabul Qilish to'g'risida Notariusga Ariza",
    category: 'application',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zbekiston Respublikasi Fuqarolik Kodeksining 1146-1150 moddalari",
    description: "Meros qoldiruvchi vafot etgandan keyin 6 oylik muddat ichida notarial idoraga merosni qabul qilish haqida topshiriladigan rasmiy ariza.",
    fields: [
      { id: 'notaryOffice', label: "Notarial idora (Tuman/Shahar)", type: 'text', required: true, defaultValue: "Toshkent shahar Mirzo Ulug'bek tumani 3-sonli davlat notarial idorasi notariusiga" },
      { id: 'heirInfo', label: "Merosxo'r (F.I.Sh., Pasport, Meros qoldiruvchiga qarindoshlik darajasi, Tel)", type: 'textarea', required: true, defaultValue: "Qosimov Jasur Alisherovich (marhumning o'g'li), Pasport: AA 1234567, Tel: +998 90 123-45-67" },
      { id: 'deceasedInfo', label: "Meros qoldiruvchi (Marhum F.I.Sh., Vafot etgan sanasi va so'nggi manzili)", type: 'textarea', required: true, defaultValue: "Qosimov Alisher Zokirovich, 2024-yil 15-martda vafot etgan, Toshkent sh., Mirzo Ulug'bek tumani" },
      { id: 'estateDescription', label: "Meros mol-mulki (Ko'chmas mulk, xonadon, avtomashina, bank hisoblari)", type: 'textarea', required: true, defaultValue: "Toshkent sh., Mirzo Ulug'bek tumani 4-mavzedagi 2 xonali kvartira va bankdagi omonat hisoblari" }
    ]
  },

  // 13. APP: YPX (GAI) nohaq jarimasi ustidan Sudga / IIBga Shikoyat
  {
    id: 'app_traffic_fine_appeal',
    title: "YPX (GAI) Radar va Jarima Qarori ustidan Shikoyat",
    category: 'application',
    jurisdiction: "O'zbekiston",
    legalBasis: "O'zbekiston Respublikasi MJtK 314, 315, 316-moddalari",
    description: "Kamera, radar xatosi yoki nohaq tuzilgan YPX bayonnomasi yuzasidan 10 kun ichida jarimani bekor qilish bo'yicha rasmiy shikoyat arizasi.",
    fields: [
      { id: 'authority', label: "Shikoyat topshiriladigan organ (Shahar YHXX yoki Jinoyat ishlari sudi)", type: 'text', required: true, defaultValue: "Toshkent shahar IIBB YHXB boshlig'iga / Tuman jinoyat ishlari sudiga" },
      { id: 'driverInfo', label: "Haydovchi (F.I.Sh., Yashash joyi, Pasport, Tel)", type: 'textarea', required: true, defaultValue: "Rustamov Elyor Faxriddinovich, Toshkent sh., Chilonzor tumani" },
      { id: 'fineDetails', label: "Qaror raqami, sana va qaysi qoidabuzarlik qo'yilgan", type: 'text', required: true, defaultValue: "2024-yil 2-maydagi AB-12345678-sonli qaror (Tezlikni oshirganlik bo'yicha)" },
      { id: 'carInfo', label: "Avtomobil rusumi va davlat raqami", type: 'text', required: true, defaultValue: "Cobalt, Davlat raqami: 01 B 123 AA" },
      { id: 'justification', label: "Jarimaning asossizligi sababi (Kamera raqamni noto'g'ri o'qigan, yo'l belgisi bo'lmagan va h.k.)", type: 'textarea', required: true, defaultValue: "Suratda ko'rsatilgan avtomobil menga tegishli emas yoki boshqa mashinaning raqami mening Cobaltim bilan adashtirib o'qilgan (texnik xato)" }
    ]
  },

  // 14. APP: MIB (Majburiy ijro byurosi) harakatsizligi ustidan Shikoyat
  {
    id: 'app_mib_complaint',
    title: "MIB Harakatsizligi (Qarz/Aliment undirilmayotganligi) ustidan Shikoyat",
    category: 'application',
    jurisdiction: "O'zbekiston",
    legalBasis: "'Sud hujjatlari va boshqa organlar hujjatlarini ijro etish to'g'risida'gi Qonunning 86-moddasi",
    description: "Sud qarori bo'yicha MIB ijrochisi aliment yoki qarzni undirmayotgan, qarzdorning hisoblarini xatlamayotgan holatda Bosh prokuraturaga / MIB boshqarmasiga shikoyat arizasi.",
    fields: [
      { id: 'mibOffice', label: "MIB boshqarmasi yoki Tuman Prokuraturasi", type: 'text', required: true, defaultValue: "O'zbekiston Respublikasi Bosh prokuraturasi huzuridagi Majburiy ijro byurosi boshlig'iga" },
      { id: 'creditor', label: "Undiruvchi (F.I.Sh., Manzil, Tel)", type: 'textarea', required: true, defaultValue: "Karimova Zilola Akramovna, Toshkent shahar" },
      { id: 'debtor', label: "Qarzdor shaxs F.I.Sh.", type: 'textarea', required: true, defaultValue: "Karimov Botir Anvarovich" },
      { id: 'writDetails', label: "Ijro hujjati raqami va sanasi", type: 'text', required: true, defaultValue: "FIB sudining 2023-yil 10-sentabrdagi 2-555-sonli ijro varaqasi" },
      { id: 'complaintReason', label: "Ijrochining harakatsizligi bayoni", type: 'textarea', required: true, defaultValue: "Sud qarori chiqqaniga 8 oy bo'lgan bo'lsa-da, davlat ijrochisi qarzdorning mol-mulkini xatlamagan, chet elga chiqishiga taqiq qo'ymagan va aliment qarzi yig'ilib bormoqda" }
    ]
  },

  // 15. MIGRANT: Rossiya - Rostrudga shikoyat
  {
    id: 'ru_rostrud',
    title: "Rossiya: To'lanmagan oylik bo'yicha Rostrudga Shikoyat",
    category: 'migrant',
    jurisdiction: "Rossiya",
    legalBasis: "Rossiya Federatsiyasi Mehnat Kodeksining 142, 236, 356-moddalari, 115-FZ",
    description: "Rossiya Federatsiyasida xorijiy fuqaroning oylik maoshi to'lanmaganligi bo'yicha Mehnat inspeksiyasiga (Государственная инспекция труда) rasmiy shikoyat arizasi.",
    fields: [
      { id: 'inspectorate', label: "Shikoyat yo'llanuvchi Mehnat inspeksiyasi", type: 'text', required: true, defaultValue: "Государственная инспекция труда в городе Москве" },
      { id: 'applicant', label: "Ariza beruvchi (F.I.O., Pasport, Registratsiya, Telefon)", type: 'textarea', required: true, defaultValue: "Алиев Валижон Собирович, Паспорт: AA 1234567, Регистрация: г. Москва" },
      { id: 'employer', label: "Ish beruvchi (Kompaniya / OOO nomi, INN, Rahbar)", type: 'textarea', required: true, defaultValue: "ООО 'СтройИнвест', ИНН: 7701234567, Генеральный директор Иванов С.П." },
      { id: 'position', label: "Bajarilgan ish va davr", type: 'text', required: true, defaultValue: "Укладка плитки и отделочные работы с 10 января по 15 апреля 2024 года" },
      { id: 'unpaidSum', label: "To'lanmagan summa (Rubl)", type: 'text', required: true, defaultValue: "120 000 (сто двадцать тысяч) рублей" }
    ]
  },

  // 16. MIGRANT: Rossiya - Kirish taqiqini (Zapret) bekor qilish da'vosi
  {
    id: 'ru_unban_entry',
    title: "Rossiya: Kirish taqiqi (Zapret na vyez)ni bekor qilish bo'yicha Sudga Da'vo",
    category: 'migrant',
    jurisdiction: "Rossiya",
    legalBasis: "114-FZ Federal Qonuni 26-27 moddalari, RF CAS (Ma'muriy sudlov kodeksi)",
    description: "Rossiya Federatsiyasiga qo'yilgan 3-5 yillik kirish taqiqini (Zapret) sud orqali bekor qilish (Rossiyada oila, farzand, nikoh yoki ta'lim borligi asosida).",
    fields: [
      { id: 'courtName', label: "Tuman sudi nomi", type: 'text', required: true, defaultValue: "Басманный районный суд города Москвы" },
      { id: 'plaintiff', label: "Da'vogar (Chet el fuqarosi F.I.Sh., Pasport, Vakili)", type: 'textarea', required: true, defaultValue: "Алиев Валижон Собирович, Гражданин Республики Узбекистан" },
      { id: 'defendant', label: "Javobgar davlat organi (GU MVD Rossii po g. Moskve)", type: 'text', required: true, defaultValue: "ГУ МВД России по городу Москве (Управление по вопросам миграции)" },
      { id: 'familyTies', label: "Rossiyadagi oilaviy / insonparvarlik asoslari", type: 'textarea', required: true, defaultValue: "Turmush o'rtog'im Rossiya fuqarosi, voyaga yetmagan farzandlarim RFda istiqomat qiladi. Taqiq oilaning buzilishiga olib kelmoqda (Konvensiya 8-moddasi)" }
    ]
  },

  // 17. MIGRANT: Turkiya - Sınır Dışı (Deport) ustidan Ma'muriy sudga e'tiroz
  {
    id: 'tr_deport_appeal',
    title: "Turkiya: Sınır Dışı (Deport) va İkamet radiga nisbatan Ma'muriy sudga e'tiroz",
    category: 'migrant',
    jurisdiction: "Turkiya",
    legalBasis: "Turkiya 6458-sayılı YUKK 53-madde va 2577-sayılı İYUK",
    description: "Turkiyada deportatsiya yoki ikamet bekor qilinganda 7 kun ichida Idare Mahkemesiga ijroni to'xtatish (Yürütmeyi Durdurma) talabi bilan beriladigan rasmiy sud arizasi.",
    fields: [
      { id: 'courtName', label: "Idare Mahkemesi (shahar)", type: 'text', required: true, defaultValue: "İstanbul Nöbetçi İdare Mahkemesi Başkanlığına" },
      { id: 'plaintiff', label: "Da'vogar (Ism, Pasport / Yabancı Kimlik No 99..., Manzil, Telefon)", type: 'textarea', required: true, defaultValue: "Valijon Aliyev, Pasaport No: AA 1234567, İstanbul" },
      { id: 'defendant', label: "Javobgar ma'muriy organ", type: 'text', required: true, defaultValue: "İstanbul İl Göç İdaresi Müdürlüğü" },
      { id: 'decisionDetails', label: "Bekor qilinishi so'ralayotgan qaror raqami va sana", type: 'text', required: true, defaultValue: "Sınır dışı etme kararı Tebliğ Tarihi: 2024-05-10" }
    ]
  },

  // 18. MIGRANT: Janubiy Koreya - Toejikgeum va oylik bo'yicha Nodongbu arizasi
  {
    id: 'kr_nodongbu',
    title: "Janubiy Koreya: Toejikgeum va oylik bo'yicha Mehnat Vazirligiga (Nodongbu) Shikoyat",
    category: 'migrant',
    jurisdiction: "Janubiy Koreya",
    legalBasis: "Janubiy Koreya Mehnat standartlari qonuni (Labor Standards Act) 36, 43-moddalari",
    description: "Koreyada 1 yildan ortiq ishlagan xodimga to'lanishi shart bo'lgan chiqish nafaqasi (Toejikgeum) va kechiktirilgan oylik bo'yicha rasmiy shikoyat arizasi.",
    fields: [
      { id: 'laborOffice', label: "Mahalliy Mehnat bo'limi (Nodongbu jisa)", type: 'text', required: true, defaultValue: "Goyang Regional Labor Office (yoki tegishli shahar)" },
      { id: 'workerInfo', label: "Ishchi ma'lumotlari (Alien Registration Number, Pasport, Telefon)", type: 'textarea', required: true, defaultValue: "Aliyev Valijon, Foreign Registration No: 920515-5123456, Tel: 010-1234-5678" },
      { id: 'companyInfo', label: "Zavod nomi, Sajangnim ismi, Korxona manzili, Telefon", type: 'textarea', required: true, defaultValue: "HanKook Manufacturing Co., Sajangnim: Kim Min-su, Gyeonggi-do, Goyang-si" },
      { id: 'unpaidAmounts', label: "To'lanmagan oylik va hisoblangan Toejikgeum miqdori (Won)", type: 'text', required: true, defaultValue: "To'lanmagan 2 oylik maosh: 6 500 000 KRW, Toejikgeum: 3 800 000 KRW" }
    ]
  }
];
