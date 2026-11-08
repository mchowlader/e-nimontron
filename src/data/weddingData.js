// Bilingual Hindu Wedding Data Configuration
export const weddingData = {
  // Sanskrit Invocations
  sanskrit: {
    ganesha: "ॐ श्री गणेशाय नमः",
    ganeshaEnglish: "Om Sri Ganeshaya Namah",
    mainSloka: "मंगलं भगवान विष्णुः मंगलं गरुडध्वजः।\nमंगलं पुण्डरीकाक्षः मङ्गলাय তनो हरिः॥",
    mainSlokaEnglish: "Mangalam Bhagavan Vishnuh, Mangalam Garudadhwajah;\nMangalam Pundarikakshah, Mangalayatano Harih.",
    mainSlokaMeaningBn: "সর্বমঙ্গলময় শ্রীহরি এবং করুণাময় নারায়ণ সকলের কল্যাণ ও মঙ্গল বিস্তার করুন।",
    mainSlokaMeaningEn: "May the Supreme Lord Vishnu shower his divine grace and auspiciousness upon this union.",
    vivahMantra: "यदेतद्धृदयं तव तदेतद्धृदयं मम। यदिदं हृदयं मम तदिदं हृदयं तव॥",
    vivahMantraMeaningBn: "তোমার হৃদয় হোক আমার এবং আমার হৃদয় হোক তোমার—আমরা যেন চিরকাল একাত্ম হয়ে থাকি।",
    vivahMantraMeaningEn: "Let your heart be mine, and my heart be yours; may we live in eternal unison.",
    rahmanSongTitle: "মাঙ্গল্যং তন্তুনানেন (A.R. Rahman - Saathiya)",
    rahmanSongSloka: "माङ्गल्यं तन्तुनानेन मम जीवन हेतुना। कण्ठे बध्नामि शुभगे त्वं जीव शरदः शतम्॥",
    rahmanSongMeaningBn: "আমার জীবনের কল্যাণের জন্য এই মাঙ্গলিক সূত্র তোমার কণ্ঠে বাঁধছি, হে কল্যাণময়ী, তুমি শত শরৎকাল সৌভাগ্যবতী হয়ে বেঁচে থাকো।"
  },

  // Audio Music Options (Pure Studio Sanskrit Wedding Track Only)
  music: {
    titleBn: "মাঙ্গলিক সানাই ও বৈদিক সঙ্গীত",
    titleEn: "Auspicious Wedding Music",
    tracks: [
      {
        id: "mangalyam_studio",
        nameBn: "মাঙ্গল্যং তন্তুনানেন (A.R. Rahman - Saathiya)",
        nameEn: "Mangalyam Tantunanena (A.R. Rahman - Saathiya)",
        subtitleBn: "চলচ্চিত্রের মূল স্টুডিও মাস্টার সংস্করণের বিশুদ্ধ সংস্কৃত বিবাহ স্তোত্র",
        subtitleEn: "Pure Studio Master Sanskrit Wedding Song by A.R. Rahman",
        url: "./audio/mangalyam_studio.mp3"
      }
    ]
  },

  // Bride & Groom Details
  couple: {
    groom: {
      nameBn: "মিঠুন চন্দ্র হাওলাদার",
      nameEn: "Mithun Chandra Howlader",
      titleBn: "বর",
      titleEn: "The Groom",
      bioBn: "পরিবারের স্নেহের সুযোগ্য সন্তান।",
      bioEn: "Beloved son of the family.",
      image: "./images/bor_portrait.webp",
      parents: {
        fatherBn: "শ্রী রবীন্দ্র নাথ হাওলাদার",
        fatherEn: "Sri Rabindra Nath Howlader",
        motherBn: "শ্রীমতী প্রভা রানী",
        motherEn: "Smt. Prova Rani",
        blessingBn: "আমাদের স্নেহের পুত্রের জীবনের এই পরম মাঙ্গলিক লগ্নে আপনাদের সস্নেহ উপস্থিতি ও আন্তরিক আশীর্বাদ আমাদের পরম প্রাপ্তি হবে।",
        blessingEn: "With immense joy and blessings, we request the honor of your presence as our son embarks on this sacred journey of togetherness."
      }
    },
    bride: {
      nameBn: "মনস্বিতা হালদার রিংকু",
      nameEn: "Manoswita Halder Rinku",
      titleBn: "কনে",
      titleEn: "The Bride",
      bioBn: "পরিবারের স্নেহময়ী গুণবতী কন্যা।",
      bioEn: "Beloved daughter of the family.",
      image: "./images/kone_portrait.webp",
      parents: {
        fatherBn: "শ্রী রণজিৎ হালদার",
        fatherEn: "Sri Ranajit Halder",
        motherBn: "শ্রীমতী মানিকা হাওলাদার",
        motherEn: "Smt. Manika Howlader",
        blessingBn: "ভগবান শ্রীহরির কৃপায় আমাদের প্রাণাধিক কন্যার শুভ বিবাহলগ্নে আপনাদের সপরিবারে সানন্দ উপস্থিতি ও আশীর্বাদ প্রার্থনা করছি।",
        blessingEn: "By the divine grace of Almighty, we cordially invite you to bless our beloved daughter as she enters her new chapter of life."
      }
    }
  },

  // Auspicious Dates and Timings (24 Falgun 1433 = March 9, 2027)
  dates: {
    weddingTarget: "2027-03-09T18:32:00+06:00",
    displayDateBn: "২৪ ফাল্গুন, ১৪৩৩ | ৯ মার্চ, ২০২৭ (মঙ্গলবার)",
    displayDateEn: "Tuesday, March 9, 2027 (24 Falgun, 1433)",
    auspiciousLagnaBn: "শুভ বিবাহ লগ্ন: সন্ধ্যা ৬টা ৩২ মিনিট থেকে শুরু",
    auspiciousLagnaEn: "Auspicious Vivah Lagna: 6:32 PM Onwards",
  },

  // Event Schedule Details (Gaye Holud, Vivah, Boubhat)
  events: [
    {
      id: "holud",
      titleBn: "মাঙ্গলিক গায়ে হলুদ ও সঙ্গীত",
      titleEn: "Gaye Holud & Sangeet",
      dateBn: "২৩ ফাল্গুন, ১৪৩৩ | ৮ মার্চ, ২০২৭ (সোমবার)",
      dateEn: "Monday, March 8, 2027",
      timeBn: "সন্ধ্যা ৬:০০ টা থেকে রাত ১০:০০ টা",
      timeEn: "6:00 PM – 10:00 PM",
      venueBn: "বাসস্থান প্রাঙ্গণ",
      venueEn: "Family Residence Complex",
      addressBn: "বর ও কনের নিজ নিজ বাসস্থান প্রাঙ্গণ",
      addressEn: "Respective Residences of Groom & Bride",
      mapUrl: "https://maps.google.com/?q=Jhalokathi+Sadar+Barisal",
      calendarTitle: "Gaye Holud - Mithun & Manoswita",
      calendarDesc: "Join us for the vibrant Gaye Holud ceremony of Mithun Chandra Howlader & Manoswita Halder Rinku!",
      startIso: "20270308T120000Z",
      endIso: "20270308T160000Z",
      themeColor: "from-amber-700 to-yellow-600",
      icon: "Sparkles"
    },
    {
      id: "vivah",
      titleBn: "শুভ বিবাহ অনুষ্ঠান ও সপ্তপদী",
      titleEn: "Sacred Vivah Ceremony & Saptapadi",
      dateBn: "২৪ ফাল্গুন, ১৪৩৩ | ৯ মার্চ, ২০২৭ (মঙ্গলবার)",
      dateEn: "Tuesday, March 9, 2027",
      timeBn: "সন্ধ্যা ৬:৩২ মিনিট (শুভ লগ্ন) থেকে মধ্যরাত",
      timeEn: "6:32 PM (Auspicious Lagna) Onwards",
      venueBn: "বিবাহ বাসর প্রাঙ্গণ, ঝালকাঠি সদর",
      venueEn: "Wedding Pavilion, Jhalokathi Sadar",
      addressBn: "ঝালকাঠি সদর, ঝালকাঠি, বরিশাল",
      addressEn: "Jhalokathi Sadar, Jhalokathi, Barisal",
      mapUrl: "https://maps.google.com/?q=Jhalokathi+Sadar+Jhalokathi+Barisal",
      calendarTitle: "Shubh Vivah - Mithun & Manoswita",
      calendarDesc: "Sacred Vedic Wedding Ceremony of Mithun Chandra Howlader & Manoswita Halder Rinku at Jhalokathi Sadar, Barisal.",
      startIso: "20270309T123200Z",
      endIso: "20270309T180000Z",
      themeColor: "from-red-800 to-amber-700",
      icon: "Flame"
    },
    {
      id: "boubhat",
      titleBn: "প্রীতিভোজ ও শুভ বৌভাত সংবর্ধনা",
      titleEn: "Grand Boubhat & Reception Banquet",
      dateBn: "২৬ ফাল্গুন, ১৪৩৩ | ১১ মার্চ, ২০২৭ (বৃহস্পতিবার)",
      dateEn: "Thursday, March 11, 2027",
      timeBn: "দুপুর ১২:০০ টা (মধ্যাহ্নভোজ) ও সন্ধ্যা ৭:০০ টা (প্রীতিভোজ)",
      timeEn: "12:00 PM (Banquet Lunch) & 7:00 PM Onwards",
      venueBn: "হাতেমপুর বর প্রাঙ্গণ, পাথরঘাটা",
      venueEn: "Hatempur Residence, Patharghata",
      addressBn: "হাতেমপুর, পাথরঘাটা, বরগুনা, বরিশাল",
      addressEn: "Hatempur, Patharghata, Barguna, Barisal",
      mapUrl: "https://maps.google.com/?q=Hatempur+Patharghata+Barguna+Barisal",
      calendarTitle: "Boubhat Reception - Mithun & Manoswita",
      calendarDesc: "Grand wedding banquet and blessings reception for newlywed couple Mithun Chandra Howlader & Manoswita Halder Rinku at Hatempur, Patharghata.",
      startIso: "20270311T060000Z",
      endIso: "20270311T160000Z",
      themeColor: "from-rose-900 to-amber-800",
      icon: "Heart"
    }
  ],

  // Saptapadi (Seven Sacred Vows)
  saptapadi: [
    {
      step: 1,
      vowBn: "প্রথম পদ: অন্ন ও পুষ্টির জন্য পরস্পরকে সহায়তা ও সমর্থন।",
      vowEn: "First Vow: To provide nourishment and support each other's well-being.",
      icon: "Grain"
    },
    {
      step: 2,
      vowBn: "দ্বিতীয় পদ: শারীরিক, মানসিক ও আধ্যাত্মিক শক্তির বিকাশ।",
      vowEn: "Second Vow: To develop mental, physical, and spiritual strength together.",
      icon: "Shield"
    },
    {
      step: 3,
      vowBn: "তৃতীয় পদ: ধর্মসম্মত উপায়ে সমৃদ্ধি ও দায়িত্ব পালন।",
      vowEn: "Third Vow: To prosper through righteous means and shared values.",
      icon: "Coins"
    },
    {
      step: 4,
      vowBn: "চতুর্থ পদ: পরিবারের সকল সুখ-দুঃখে একাত্মতা ও পরম শ্রদ্ধা।",
      vowEn: "Fourth Vow: To uphold family harmony, mutual respect, and unconditional love.",
      icon: "Home"
    },
    {
      step: 5,
      vowBn: "পঞ্চম পদ: ভবিষ্যত প্রজন্মের কল্যাণে সৎচরিত্র ও আদর্শ প্রতিষ্ঠা।",
      vowEn: "Fifth Vow: To nurture future generations with virtue, wisdom, and compassion.",
      icon: "Users"
    },
    {
      step: 6,
      vowBn: "ষষ্ঠ পদ: জীবনের সকল ঋতুতে একসাথে আনন্দ ও প্রশান্তি উপভোগ।",
      vowEn: "Sixth Vow: To share happiness and peace through all seasons and challenges.",
      icon: "Sun"
    },
    {
      step: 7,
      vowBn: "সপ্তম পদ: আজীবন চিরন্তন বন্ধুত্ব, বিশ্বাস ও অবিচ্ছেদ্য সান্নিধ্য।",
      vowEn: "Seventh Vow: To remain true companions, best friends, and souls united forever.",
      icon: "Infinity"
    }
  ],

  // Initial Wishes (Empty by default, populated when real guests submit)
  sampleWishes: [],

  // Admin PIN (can be modified by user)
  adminPin: "1234",

  // Contact / WhatsApp for instant confirmation
  contact: {
    whatsappNumber: "+8801700000000",
    phoneDisplay: "+880 1700-000000"
  }
};
