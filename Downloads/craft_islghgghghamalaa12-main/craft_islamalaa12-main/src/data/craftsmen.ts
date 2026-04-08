export interface Craftsman {
  id: string;
  name: string;
  specialty: string;
  specialtyId: string;
  specialtyIcon: string;
  location: string;
  city: string;
  phone: string;
  rating: number;
  reviewCount: number;
  description: string;
  experience: number;
  gallery: string[];
  reviews: Review[];
  available: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
}

export const cities = [
  "رام الله",
  "نابلس",
  "الخليل",
  "بيت لحم",
  "جنين",
  "طولكرم",
  "قلقيلية",
  "طوباس",
  "سلفيت",
  "أريحا",
  "غزة",
];

export const serviceCategories: ServiceCategory[] = [
  { id: "painting", name: "دهان", icon: "🎨", count: 8, description: "دهانات داخلية وخارجية، ديكورات حائط" },
  { id: "tiles", name: "بلاط", icon: "🧱", count: 6, description: "سيراميك، بورسلان، رخام وجرانيت" },
  { id: "electricity", name: "كهرباء", icon: "⚡", count: 7, description: "تمديدات كهربائية، صيانة، طاقة شمسية" },
  { id: "plumbing", name: "سباكة", icon: "🔧", count: 6, description: "تمديدات مياه، صرف صحي، تدفئة" },
  { id: "construction", name: "بناء", icon: "🏗️", count: 5, description: "بناء سكني وتجاري، ترميم وتشطيبات" },
  { id: "carpentry", name: "نجارة", icon: "🪚", count: 5, description: "أثاث مخصص، مطابخ، أبواب ونوافذ" },
  { id: "welding", name: "حدادة", icon: "🔩", count: 4, description: "أبواب حديد، درابزين، هياكل معدنية" },
  { id: "ac", name: "تكييف وتبريد", icon: "❄️", count: 4, description: "تركيب وصيانة مكيفات، تبريد مركزي" },
];

export const craftsmen: Craftsman[] = [
  // === دهان (8) ===
  {
    id: "p1", name: "أحمد الخطيب", specialty: "دهان", specialtyId: "painting", specialtyIcon: "🎨",
    location: "رام الله - البيرة", city: "رام الله", phone: "0599-123-456", rating: 4.8, reviewCount: 127,
    description: "حرفي دهان محترف بخبرة تزيد عن 15 سنة في جميع أنواع الدهانات الداخلية والخارجية. متخصص في الدهانات الديكورية والتأثيرات الحديثة مثل الاستنسل والماربل.",
    experience: 15, gallery: [], available: true,
    reviews: [
      { id: "r1", author: "محمد سالم", rating: 5, comment: "عمل ممتاز واحترافي، أنصح بشدة!", date: "2024-03-15" },
      { id: "r2", author: "سارة أحمد", rating: 5, comment: "دقة في المواعيد وجودة عالية في العمل", date: "2024-02-20" },
      { id: "r3", author: "خالد عمر", rating: 4, comment: "عمل جيد جداً والأسعار مناسبة", date: "2024-01-10" },
    ],
  },
  {
    id: "p2", name: "سامي عبد الهادي", specialty: "دهان", specialtyId: "painting", specialtyIcon: "🎨",
    location: "نابلس - رفيديا", city: "نابلس", phone: "0598-111-222", rating: 4.6, reviewCount: 83,
    description: "متخصص في الدهانات الخارجية والعزل الحراري. خبرة 10 سنوات في المشاريع السكنية والتجارية.",
    experience: 10, gallery: [], available: true,
    reviews: [
      { id: "r10", author: "وليد حسن", rating: 5, comment: "دهان خارجي ممتاز وبجودة عالية", date: "2024-03-01" },
    ],
  },
  {
    id: "p3", name: "ماجد أبو صالح", specialty: "دهان", specialtyId: "painting", specialtyIcon: "🎨",
    location: "الخليل - عين سارة", city: "الخليل", phone: "0597-222-333", rating: 4.9, reviewCount: 156,
    description: "فنان دهان متخصص في الديكورات الفاخرة والتأثيرات ثلاثية الأبعاد. أعمال حائزة على إعجاب واسع.",
    experience: 20, gallery: [], available: true,
    reviews: [
      { id: "r11", author: "أمل بركات", rating: 5, comment: "فنان بمعنى الكلمة! حوّل البيت لتحفة", date: "2024-02-28" },
      { id: "r12", author: "ناصر حمد", rating: 5, comment: "أفضل دهان في الخليل بلا منازع", date: "2024-01-15" },
    ],
  },
  {
    id: "p4", name: "فادي جبر", specialty: "دهان", specialtyId: "painting", specialtyIcon: "🎨",
    location: "بيت لحم - بيت ساحور", city: "بيت لحم", phone: "0596-333-444", rating: 4.5, reviewCount: 45,
    description: "دهان محترف متخصص في الدهانات المائية والزيتية. أسعار تنافسية وخدمة سريعة.",
    experience: 8, gallery: [], available: false,
    reviews: [
      { id: "r13", author: "رنا عيسى", rating: 4, comment: "شغل نظيف وأسعار معقولة", date: "2024-03-10" },
    ],
  },
  {
    id: "p5", name: "حسام الدين", specialty: "دهان", specialtyId: "painting", specialtyIcon: "🎨",
    location: "جنين - المدينة", city: "جنين", phone: "0595-444-555", rating: 4.7, reviewCount: 72,
    description: "حرفي دهان بخبرة 12 سنة. متخصص في دهانات المباني الجديدة والترميم.",
    experience: 12, gallery: [], available: true,
    reviews: [
      { id: "r14", author: "طارق صالح", rating: 5, comment: "محترف ودقيق في مواعيده", date: "2024-02-05" },
    ],
  },
  {
    id: "p6", name: "نبيل أبو ليلى", specialty: "دهان", specialtyId: "painting", specialtyIcon: "🎨",
    location: "طولكرم - وسط المدينة", city: "طولكرم", phone: "0594-555-666", rating: 4.4, reviewCount: 38,
    description: "دهان منازل ومحلات تجارية. خدمة شاملة من اختيار الألوان للتنفيذ.",
    experience: 7, gallery: [], available: true,
    reviews: [
      { id: "r15", author: "هبة ناصر", rating: 4, comment: "عمل جيد والسعر مناسب", date: "2024-01-20" },
    ],
  },
  {
    id: "p7", name: "عصام مراد", specialty: "دهان", specialtyId: "painting", specialtyIcon: "🎨",
    location: "قلقيلية - المركز", city: "قلقيلية", phone: "0593-666-777", rating: 4.3, reviewCount: 29,
    description: "دهان بخبرة 6 سنوات. متخصص في الألوان الحديثة والتصاميم العصرية.",
    experience: 6, gallery: [], available: true,
    reviews: [],
  },
  {
    id: "p8", name: "رائد شاهين", specialty: "دهان", specialtyId: "painting", specialtyIcon: "🎨",
    location: "رام الله - الماصيون", city: "رام الله", phone: "0592-777-888", rating: 4.8, reviewCount: 95,
    description: "خبير في الدهانات الإيطالية والفينيسية. يعمل مع أفضل العلامات التجارية العالمية.",
    experience: 16, gallery: [], available: true,
    reviews: [
      { id: "r16", author: "لينا كمال", rating: 5, comment: "استخدم مواد ممتازة والنتيجة مذهلة", date: "2024-03-08" },
    ],
  },

  // === كهرباء (7) ===
  {
    id: "e1", name: "محمود الحاج", specialty: "كهرباء", specialtyId: "electricity", specialtyIcon: "⚡",
    location: "نابلس - المدينة القديمة", city: "نابلس", phone: "0598-234-567", rating: 4.9, reviewCount: 89,
    description: "فني كهرباء معتمد ومتخصص في التمديدات الكهربائية المنزلية والتجارية. خبرة واسعة في أنظمة الطاقة الشمسية.",
    experience: 12, gallery: [], available: true,
    reviews: [
      { id: "r4", author: "عبدالله نصر", rating: 5, comment: "فني ممتاز وأمين في عمله", date: "2024-03-10" },
      { id: "r5", author: "فاطمة حسين", rating: 5, comment: "سرعة في الإنجاز وجودة عالية", date: "2024-02-28" },
    ],
  },
  {
    id: "e2", name: "زياد المحتسب", specialty: "كهرباء", specialtyId: "electricity", specialtyIcon: "⚡",
    location: "الخليل - باب الزاوية", city: "الخليل", phone: "0597-888-999", rating: 4.7, reviewCount: 63,
    description: "كهربائي متخصص في الأنظمة الذكية والتحكم عن بعد. تركيب وبرمجة أنظمة إنارة حديثة.",
    experience: 14, gallery: [], available: true,
    reviews: [
      { id: "r17", author: "سمير علي", rating: 5, comment: "ركّب لنا نظام إنارة ذكي رائع", date: "2024-03-12" },
    ],
  },
  {
    id: "e3", name: "إياد سلامة", specialty: "كهرباء", specialtyId: "electricity", specialtyIcon: "⚡",
    location: "رام الله - المصيون", city: "رام الله", phone: "0596-999-111", rating: 4.5, reviewCount: 47,
    description: "فني كهرباء بخبرة 8 سنوات. صيانة وإصلاح جميع الأعطال الكهربائية المنزلية.",
    experience: 8, gallery: [], available: true,
    reviews: [],
  },
  {
    id: "e4", name: "طلال أبو حميد", specialty: "كهرباء", specialtyId: "electricity", specialtyIcon: "⚡",
    location: "بيت لحم - المدينة", city: "بيت لحم", phone: "0595-222-444", rating: 4.6, reviewCount: 52,
    description: "متخصص في تمديدات المباني الجديدة ولوحات التوزيع. عمل دقيق وآمن.",
    experience: 11, gallery: [], available: true,
    reviews: [
      { id: "r18", author: "جمال يوسف", rating: 5, comment: "شغل احترافي ونظيف", date: "2024-02-18" },
    ],
  },
  {
    id: "e5", name: "باسل خضر", specialty: "كهرباء", specialtyId: "electricity", specialtyIcon: "⚡",
    location: "جنين - وسط المدينة", city: "جنين", phone: "0594-333-555", rating: 4.8, reviewCount: 78,
    description: "فني كهرباء وطاقة شمسية. تركيب وصيانة ألواح شمسية وأنظمة طاقة بديلة.",
    experience: 9, gallery: [], available: false,
    reviews: [
      { id: "r19", author: "ريم أحمد", rating: 5, comment: "ركّب لنا ألواح شمسية بشكل ممتاز", date: "2024-03-05" },
    ],
  },
  {
    id: "e6", name: "مروان صبح", specialty: "كهرباء", specialtyId: "electricity", specialtyIcon: "⚡",
    location: "طولكرم - شويكة", city: "طولكرم", phone: "0593-444-666", rating: 4.4, reviewCount: 34,
    description: "كهربائي عام. صيانة منازل ومحلات تجارية بأسعار مناسبة.",
    experience: 6, gallery: [], available: true,
    reviews: [],
  },
  {
    id: "e7", name: "عماد الأشقر", specialty: "كهرباء", specialtyId: "electricity", specialtyIcon: "⚡",
    location: "نابلس - بلاطة", city: "نابلس", phone: "0592-555-777", rating: 4.6, reviewCount: 41,
    description: "فني كهرباء متخصص في كاميرات المراقبة وأنظمة الإنذار والحماية.",
    experience: 10, gallery: [], available: true,
    reviews: [
      { id: "r20", author: "أحمد خليل", rating: 4, comment: "ركّب كاميرات مراقبة بشكل ممتاز", date: "2024-01-25" },
    ],
  },

  // === بلاط (6) ===
  {
    id: "t1", name: "يوسف البرغوثي", specialty: "بلاط", specialtyId: "tiles", specialtyIcon: "🧱",
    location: "الخليل - وسط المدينة", city: "الخليل", phone: "0597-345-678", rating: 4.7, reviewCount: 64,
    description: "معلم بلاط محترف متخصص في جميع أنواع السيراميك والبورسلان والرخام. تصاميم عصرية وتنفيذ دقيق.",
    experience: 20, gallery: [], available: true,
    reviews: [
      { id: "r6", author: "نور الدين", rating: 5, comment: "أفضل معلم بلاط تعاملت معه", date: "2024-03-05" },
    ],
  },
  {
    id: "t2", name: "محمد أبو الرب", specialty: "بلاط", specialtyId: "tiles", specialtyIcon: "🧱",
    location: "جنين - قباطية", city: "جنين", phone: "0596-666-888", rating: 4.8, reviewCount: 91,
    description: "معلم بلاط وسيراميك بخبرة 18 سنة. متخصص في الأرضيات والجدران والديكورات الحجرية.",
    experience: 18, gallery: [], available: true,
    reviews: [
      { id: "r21", author: "سعيد حمدان", rating: 5, comment: "شغل نظيف ودقيق جداً", date: "2024-03-14" },
    ],
  },
  {
    id: "t3", name: "خالد الزعتري", specialty: "بلاط", specialtyId: "tiles", specialtyIcon: "🧱",
    location: "نابلس - عسكر", city: "نابلس", phone: "0595-777-999", rating: 4.5, reviewCount: 43,
    description: "تركيب بلاط حمامات ومطابخ. تصاميم موزاييك وزخارف شرقية.",
    experience: 12, gallery: [], available: true,
    reviews: [],
  },
  {
    id: "t4", name: "علاء شريف", specialty: "بلاط", specialtyId: "tiles", specialtyIcon: "🧱",
    location: "رام الله - بيتونيا", city: "رام الله", phone: "0594-888-111", rating: 4.6, reviewCount: 55,
    description: "متخصص في الرخام والجرانيت. تلبيس واجهات وأرضيات فاخرة.",
    experience: 15, gallery: [], available: true,
    reviews: [
      { id: "r22", author: "ديما وهبة", rating: 5, comment: "رخام البيت طلع تحفة", date: "2024-02-10" },
    ],
  },
  {
    id: "t5", name: "وسام جرار", specialty: "بلاط", specialtyId: "tiles", specialtyIcon: "🧱",
    location: "طولكرم - المدينة", city: "طولكرم", phone: "0593-999-222", rating: 4.3, reviewCount: 28,
    description: "تركيب بلاط بأسعار مناسبة. سيراميك وبورسلان لجميع المساحات.",
    experience: 7, gallery: [], available: false,
    reviews: [],
  },
  {
    id: "t6", name: "ثائر أبو غوش", specialty: "بلاط", specialtyId: "tiles", specialtyIcon: "🧱",
    location: "بيت لحم - الدهيشة", city: "بيت لحم", phone: "0592-111-333", rating: 4.7, reviewCount: 67,
    description: "معلم بلاط بخبرة واسعة في المشاريع الكبيرة. عمارات ومجمعات تجارية.",
    experience: 22, gallery: [], available: true,
    reviews: [
      { id: "r23", author: "ياسر كنعان", rating: 5, comment: "نفّذ بلاط مجمع تجاري كامل بإتقان", date: "2024-01-30" },
    ],
  },

  // === سباكة (6) ===
  {
    id: "pl1", name: "عمر المصري", specialty: "سباكة", specialtyId: "plumbing", specialtyIcon: "🔧",
    location: "بيت لحم - بيت جالا", city: "بيت لحم", phone: "0596-456-789", rating: 4.6, reviewCount: 53,
    description: "سباك محترف متخصص في صيانة وتركيب أنظمة المياه والصرف الصحي. خدمة طوارئ متاحة على مدار الساعة.",
    experience: 10, gallery: [], available: true,
    reviews: [
      { id: "r7", author: "ليلى محمد", rating: 5, comment: "جاء في الوقت المحدد وأنجز العمل بسرعة", date: "2024-03-12" },
    ],
  },
  {
    id: "pl2", name: "نضال عوض", specialty: "سباكة", specialtyId: "plumbing", specialtyIcon: "🔧",
    location: "رام الله - الإرسال", city: "رام الله", phone: "0595-123-789", rating: 4.8, reviewCount: 76,
    description: "سباك خبير في أنظمة التدفئة المركزية والطاقة الشمسية للمياه.",
    experience: 14, gallery: [], available: true,
    reviews: [
      { id: "r24", author: "نادية سعيد", rating: 5, comment: "ركّب تدفئة مركزية ممتازة", date: "2024-02-22" },
    ],
  },
  {
    id: "pl3", name: "رامي شتيه", specialty: "سباكة", specialtyId: "plumbing", specialtyIcon: "🔧",
    location: "نابلس - جبل النار", city: "نابلس", phone: "0594-234-890", rating: 4.4, reviewCount: 39,
    description: "سباك عام. تمديدات وصيانة حمامات ومطابخ بأسعار تنافسية.",
    experience: 8, gallery: [], available: true,
    reviews: [],
  },
  {
    id: "pl4", name: "أنس أبو شمسية", specialty: "سباكة", specialtyId: "plumbing", specialtyIcon: "🔧",
    location: "الخليل - الحرس", city: "الخليل", phone: "0593-345-901", rating: 4.5, reviewCount: 44,
    description: "متخصص في كشف وإصلاح تسربات المياه. أجهزة حديثة للكشف بدون تكسير.",
    experience: 11, gallery: [], available: true,
    reviews: [
      { id: "r25", author: "منى إبراهيم", rating: 5, comment: "كشف التسريب وأصلحه بدون ما يكسر شي", date: "2024-03-03" },
    ],
  },
  {
    id: "pl5", name: "غسان طوقان", specialty: "سباكة", specialtyId: "plumbing", specialtyIcon: "🔧",
    location: "جنين - يعبد", city: "جنين", phone: "0592-456-012", rating: 4.3, reviewCount: 31,
    description: "سباك ومتخصص في تركيب أطقم حمامات ومطابخ حديثة.",
    experience: 9, gallery: [], available: true,
    reviews: [],
  },
  {
    id: "pl6", name: "معتصم دراغمة", specialty: "سباكة", specialtyId: "plumbing", specialtyIcon: "🔧",
    location: "طوباس - المدينة", city: "طوباس", phone: "0591-567-123", rating: 4.6, reviewCount: 48,
    description: "سباك محترف بخبرة 13 سنة. خدمة سريعة وضمان على الأعمال.",
    experience: 13, gallery: [], available: false,
    reviews: [
      { id: "r26", author: "هاني صالح", rating: 4, comment: "شغل ممتاز وبضمان", date: "2024-01-18" },
    ],
  },

  // === نجارة (5) ===
  {
    id: "c1", name: "كريم الشيخ", specialty: "نجارة", specialtyId: "carpentry", specialtyIcon: "🪚",
    location: "جنين - وسط المدينة", city: "جنين", phone: "0595-567-890", rating: 4.9, reviewCount: 112,
    description: "نجار فنان متخصص في الأثاث المنزلي والمطابخ العصرية. تصاميم مخصصة وخشب طبيعي بجودة عالية.",
    experience: 18, gallery: [], available: true,
    reviews: [
      { id: "r8", author: "أمل خالد", rating: 5, comment: "صنع لنا مطبخ رائع بتصميم فريد", date: "2024-02-15" },
    ],
  },
  {
    id: "c2", name: "وائل حمدان", specialty: "نجارة", specialtyId: "carpentry", specialtyIcon: "🪚",
    location: "نابلس - المخفية", city: "نابلس", phone: "0594-678-901", rating: 4.7, reviewCount: 68,
    description: "نجار متخصص في الأبواب والنوافذ الخشبية. تفصيل حسب الطلب بأعلى جودة.",
    experience: 15, gallery: [], available: true,
    reviews: [
      { id: "r27", author: "حسين عمران", rating: 5, comment: "أبواب خشب ممتازة وتشطيب رائع", date: "2024-02-25" },
    ],
  },
  {
    id: "c3", name: "حازم قاسم", specialty: "نجارة", specialtyId: "carpentry", specialtyIcon: "🪚",
    location: "رام الله - البالوع", city: "رام الله", phone: "0593-789-012", rating: 4.6, reviewCount: 54,
    description: "نجار أثاث مكتبي ومنزلي. مكاتب، خزائن، أرفف بتصاميم عملية وأنيقة.",
    experience: 11, gallery: [], available: true,
    reviews: [],
  },
  {
    id: "c4", name: "صهيب النتشة", specialty: "نجارة", specialtyId: "carpentry", specialtyIcon: "🪚",
    location: "الخليل - ابن رشد", city: "الخليل", phone: "0592-890-123", rating: 4.5, reviewCount: 42,
    description: "متخصص في غرف النوم والأثاث الكلاسيكي. حفر يدوي على الخشب.",
    experience: 20, gallery: [], available: true,
    reviews: [
      { id: "r28", author: "مريم زيد", rating: 5, comment: "أثاث كلاسيكي فاخر بحفر يدوي مذهل", date: "2024-01-12" },
    ],
  },
  {
    id: "c5", name: "رشاد عنبتاوي", specialty: "نجارة", specialtyId: "carpentry", specialtyIcon: "🪚",
    location: "بيت لحم - المدينة", city: "بيت لحم", phone: "0591-901-234", rating: 4.8, reviewCount: 86,
    description: "نجار خشب زيتون. منتجات تذكارية وأثاث فني من خشب الزيتون الفلسطيني.",
    experience: 25, gallery: [], available: true,
    reviews: [
      { id: "r29", author: "كارلا سمعان", rating: 5, comment: "أعمال فنية رائعة من خشب الزيتون", date: "2024-03-01" },
    ],
  },

  // === بناء (5) ===
  {
    id: "b1", name: "باسم النجار", specialty: "بناء", specialtyId: "construction", specialtyIcon: "🏗️",
    location: "طولكرم - المدينة", city: "طولكرم", phone: "0594-678-901", rating: 4.5, reviewCount: 37,
    description: "مقاول بناء متخصص في البناء السكني والتجاري. خبرة في التصاميم المعمارية الحديثة والتشطيبات الفاخرة.",
    experience: 22, gallery: [], available: true,
    reviews: [
      { id: "r9", author: "حسام علي", rating: 4, comment: "عمل ممتاز في بناء الطابق الإضافي", date: "2024-01-20" },
    ],
  },
  {
    id: "b2", name: "نادر أبو عيشة", specialty: "بناء", specialtyId: "construction", specialtyIcon: "🏗️",
    location: "الخليل - الخليل القديمة", city: "الخليل", phone: "0593-012-345", rating: 4.7, reviewCount: 58,
    description: "متخصص في ترميم المباني القديمة والحجر الطبيعي. خبرة في البناء التراثي.",
    experience: 25, gallery: [], available: true,
    reviews: [
      { id: "r30", author: "سامح حلبي", rating: 5, comment: "رمم بيتنا القديم بشكل مذهل", date: "2024-02-08" },
    ],
  },
  {
    id: "b3", name: "فيصل عمرو", specialty: "بناء", specialtyId: "construction", specialtyIcon: "🏗️",
    location: "رام الله - سردا", city: "رام الله", phone: "0592-123-456", rating: 4.6, reviewCount: 45,
    description: "مقاول بناء وتشطيبات. فلل ومنازل حسب التصميم المطلوب.",
    experience: 17, gallery: [], available: true,
    reviews: [],
  },
  {
    id: "b4", name: "منذر جبارة", specialty: "بناء", specialtyId: "construction", specialtyIcon: "🏗️",
    location: "نابلس - حوارة", city: "نابلس", phone: "0591-234-567", rating: 4.4, reviewCount: 33,
    description: "بناء وقصارة وتشطيبات داخلية. أسعار تنافسية وعمل متقن.",
    experience: 13, gallery: [], available: false,
    reviews: [
      { id: "r31", author: "ربيع ناصر", rating: 4, comment: "شغل القصارة طلع ممتاز", date: "2024-03-09" },
    ],
  },
  {
    id: "b5", name: "أيمن الطيطي", specialty: "بناء", specialtyId: "construction", specialtyIcon: "🏗️",
    location: "بيت لحم - العبيدية", city: "بيت لحم", phone: "0590-345-678", rating: 4.8, reviewCount: 71,
    description: "مقاول بناء ومهندس. إشراف كامل من التصميم للتسليم.",
    experience: 20, gallery: [], available: true,
    reviews: [
      { id: "r32", author: "عادل شاهين", rating: 5, comment: "بنى فيلتنا من الصفر بإتقان عالي", date: "2024-02-14" },
    ],
  },

  // === حدادة (4) ===
  {
    id: "w1", name: "عبدالرحمن الحداد", specialty: "حدادة", specialtyId: "welding", specialtyIcon: "🔩",
    location: "نابلس - المنطقة الصناعية", city: "نابلس", phone: "0599-456-123", rating: 4.7, reviewCount: 56,
    description: "حداد متخصص في الأبواب والشبابيك الحديدية. درابزينات وبوابات فاخرة.",
    experience: 16, gallery: [], available: true,
    reviews: [
      { id: "r33", author: "خليل عوض", rating: 5, comment: "بوابة حديد رائعة وتشطيب فاخر", date: "2024-03-07" },
    ],
  },
  {
    id: "w2", name: "جهاد أبو سمرة", specialty: "حدادة", specialtyId: "welding", specialtyIcon: "🔩",
    location: "الخليل - المنطقة الصناعية", city: "الخليل", phone: "0598-567-234", rating: 4.5, reviewCount: 42,
    description: "حداد ولحام. هياكل معدنية، مظلات، وسلالم حديد.",
    experience: 12, gallery: [], available: true,
    reviews: [],
  },
  {
    id: "w3", name: "ياسر المدني", specialty: "حدادة", specialtyId: "welding", specialtyIcon: "🔩",
    location: "رام الله - بير زيت", city: "رام الله", phone: "0597-678-345", rating: 4.6, reviewCount: 38,
    description: "حداد فني متخصص في الأعمال الزخرفية والديكورية بالحديد المشغول.",
    experience: 14, gallery: [], available: true,
    reviews: [
      { id: "r34", author: "دانا حسين", rating: 5, comment: "درابزين حديد مشغول فني ورائع", date: "2024-01-28" },
    ],
  },
  {
    id: "w4", name: "هاني زيدان", specialty: "حدادة", specialtyId: "welding", specialtyIcon: "🔩",
    location: "جنين - المنطقة الصناعية", city: "جنين", phone: "0596-789-456", rating: 4.4, reviewCount: 29,
    description: "حداد عام. أبواب، شبابيك، وحواجز حديدية بأسعار مناسبة.",
    experience: 9, gallery: [], available: true,
    reviews: [],
  },

  // === تكييف وتبريد (4) ===
  {
    id: "ac1", name: "خالد البيطار", specialty: "تكييف وتبريد", specialtyId: "ac", specialtyIcon: "❄️",
    location: "رام الله - المنارة", city: "رام الله", phone: "0599-890-567", rating: 4.8, reviewCount: 73,
    description: "فني تكييف معتمد. تركيب وصيانة جميع أنواع المكيفات. وكيل معتمد لعدة علامات تجارية.",
    experience: 12, gallery: [], available: true,
    reviews: [
      { id: "r35", author: "سلوى أحمد", rating: 5, comment: "خدمة ممتازة وأسعار معقولة", date: "2024-03-11" },
    ],
  },
  {
    id: "ac2", name: "وليد الشلبي", specialty: "تكييف وتبريد", specialtyId: "ac", specialtyIcon: "❄️",
    location: "نابلس - المنطقة الصناعية", city: "نابلس", phone: "0598-901-678", rating: 4.6, reviewCount: 45,
    description: "متخصص في التبريد المركزي والتكييف الصناعي. مشاريع كبيرة ومتوسطة.",
    experience: 15, gallery: [], available: true,
    reviews: [],
  },
  {
    id: "ac3", name: "سامر قريع", specialty: "تكييف وتبريد", specialtyId: "ac", specialtyIcon: "❄️",
    location: "الخليل - رأس الجورة", city: "الخليل", phone: "0597-012-789", rating: 4.5, reviewCount: 37,
    description: "صيانة وتعبئة غاز مكيفات. خدمة سريعة وبأسعار تنافسية.",
    experience: 8, gallery: [], available: true,
    reviews: [
      { id: "r36", author: "نسرين كمال", rating: 4, comment: "صيانة سريعة وبسعر مناسب", date: "2024-02-19" },
    ],
  },
  {
    id: "ac4", name: "فراس حنون", specialty: "تكييف وتبريد", specialtyId: "ac", specialtyIcon: "❄️",
    location: "بيت لحم - الدوحة", city: "بيت لحم", phone: "0596-123-890", rating: 4.7, reviewCount: 51,
    description: "فني تكييف وتدفئة. تركيب وصيانة أنظمة التدفئة والتبريد المنزلية.",
    experience: 10, gallery: [], available: true,
    reviews: [
      { id: "r37", author: "عمار رشيد", rating: 5, comment: "ركّب تدفئة وتكييف مركزي بشكل رائع", date: "2024-01-05" },
    ],
  },
];
