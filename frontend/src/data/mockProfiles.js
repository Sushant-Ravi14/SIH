// Demo Personas for Quick Hackathon Showcase & Testing
export const DEMO_PERSONAS = [
  {
    id: "persona_1",
    name: "Ramesh Kumar",
    iconName: "User",
    age: 28,
    district: "Varanasi, UP",
    profile: {
      education_level: "10th Grade",
      traditional_trade: "Tailoring",
      current_livelihood: "Local Garment Shop Helper",
      mobility_km: 10,
      preference: "Wage Employment"
    },
    sampleQuery: "I have studied up to 10th grade and I work as a tailor in a local shop. I want wage employment within 10 km.",
    hindiQuery: "मैंने 10वीं तक पढ़ाई की है और सिलाई का काम करता हूँ। मुझे 10 किमी के अंदर नौकरी चाहिए।"
  },
  {
    id: "persona_2",
    name: "Sunita Devi",
    iconName: "Zap",
    age: 24,
    district: "Ranchi, Jharkhand",
    profile: {
      education_level: "12th Pass",
      traditional_trade: "Electrical & Technical",
      current_livelihood: "Apprentice",
      mobility_km: 25,
      preference: "Wage Employment"
    },
    sampleQuery: "I passed 12th grade and am interested in Solar Panel technician job. I can travel up to 25 km.",
    hindiQuery: "मैं 12वीं पास हूँ और सोलर पैनल इंस्टॉलेशन सीखना चाहती हूँ। 25 किमी तक जा सकती हूँ।"
  },
  {
    id: "persona_3",
    name: "Anita Kumari",
    iconName: "Sparkles",
    age: 22,
    district: "Patna, Bihar",
    profile: {
      education_level: "8th Pass",
      traditional_trade: "Beauty & Wellness",
      current_livelihood: "Home-based Parlour",
      mobility_km: 5,
      preference: "Self-Employment"
    },
    sampleQuery: "I studied till 8th grade and run a small home parlour. I want self-employment support in beauty therapy.",
    hindiQuery: "मैंने 8वीं तक पढ़ाई की है और घर पर ब्यूटी पार्लर चलाती हूँ। मुझे स्वरोजगार के लिए सहायता चाहिए।"
  },
  {
    id: "persona_4",
    name: "Mohan Lal",
    iconName: "Sprout",
    age: 35,
    district: "Bhopal, MP",
    profile: {
      education_level: "5th Pass",
      traditional_trade: "Farming",
      current_livelihood: "Marginal Farmer",
      mobility_km: 15,
      preference: "Self-Employment"
    },
    sampleQuery: "I am a traditional farmer with 5th standard education. I want to learn organic farming and start a cooperative.",
    hindiQuery: "मैं 5वीं पास किसान हूँ। जैविक खेती (Organic Farming) सीखकर अपना काम बढ़ाना चाहता हूँ।"
  }
];

// Rich NSQF Packs Data with Skill Gap Analysis, Stipends, Modules & Centers
export const ENRICHED_NSQF_CATALOG = [
  {
    nsqf_pack_name: "Sewing Machine Operator",
    level: 3,
    sector: "Apparel & Garments",
    duration: "300 Hours (3 Months)",
    matchScore: 96,
    badgeColor: "emerald",
    skill_gap_analysis: "High match with tailoring background. Needs formal training on computerized single needle lockstitch machines, industrial quality checks, and safety ergonomics.",
    modules: [
      "Operating single needle industrial lockstitch machines",
      "Stitching components according to tech-pack",
      "Fabric defect identification & batch sorting",
      "Health, hygiene & industrial compliance"
    ],
    stipend: "₹1,500 / month (PM-AJAY Direct DBT)",
    toolkit_grant: "Free Industrial Tool Kit & Sewing Machine subsidy (up to ₹15,000)",
    job_roles: ["Sample Maker", "Assembly Line Tailor", "Quality Inspector"],
    avg_salary: "₹12,000 - ₹18,000 / month",
    local_centers: [
      { name: "PM-AJAY Pradhan Mantri Kaushal Kendra (PMKK), City Center", distance: "4.2 km", phone: "+91 98765 43210", seats: 18 },
      { name: "Apparel Training & Design Centre (ATDC)", distance: "8.5 km", phone: "+91 98765 43211", seats: 12 },
      { name: "Rural Self Employment Training Institute (RSETI)", distance: "11.0 km", phone: "+91 98765 43212", seats: 25 }
    ]
  },
  {
    nsqf_pack_name: "Solar Panel Installation Technician",
    level: 4,
    sector: "Green Jobs & Renewable Energy",
    duration: "400 Hours (4 Months)",
    matchScore: 92,
    badgeColor: "amber",
    skill_gap_analysis: "Technical aptitude present. Training required in rooftop PV civil mounting, DC inverter wiring, safety harness rigging, and grid sync protocols.",
    modules: [
      "Solar PV array site survey & shading analysis",
      "Mechanical structure installation on RCC & tin roofs",
      "Electrical junction box and micro-inverter wiring",
      "Testing, commissioning and grid export meters"
    ],
    stipend: "₹2,000 / month (Suryamitra Scheme + PM-AJAY)",
    toolkit_grant: "Complete Solar Multimeter & Safety Rigging Toolkit",
    job_roles: ["Rooftop Solar Technician", "O&M Service Engineer", "Field Assistant"],
    avg_salary: "₹16,000 - ₹24,000 / month",
    local_centers: [
      { name: "National Institute of Solar Energy Training Hub", distance: "6.8 km", phone: "+91 98111 22334", seats: 14 },
      { name: "District Industrial Training Institute (ITI) Campus", distance: "12.4 km", phone: "+91 98222 33445", seats: 20 }
    ]
  },
  {
    nsqf_pack_name: "Beauty Therapist & Cosmetologist",
    level: 3,
    sector: "Beauty & Wellness",
    duration: "360 Hours (3.5 Months)",
    matchScore: 94,
    badgeColor: "saffron",
    skill_gap_analysis: "Solid traditional grasp of skin and hair grooming. Requires specialized training in hygienic skincare tools, bridal makeup styling, and salon business bookkeeping.",
    modules: [
      "Advanced skin analysis and facial treatments",
      "Depilation, threading and waxing ergonomics",
      "Hair styling, coloring and keratin therapies",
      "Micro-enterprise financial literacy & digital UPI"
    ],
    stipend: "₹1,500 / month (PM-AJAY Stipend)",
    toolkit_grant: "Full Professional Salon Starter Kit (Valued at ₹12,000)",
    job_roles: ["Certified Beauty Therapist", "Bridal Makeup Artist", "Salon Owner"],
    avg_salary: "₹14,000 - ₹25,000 / month",
    local_centers: [
      { name: "Jan Shikshan Sansthan (JSS) Skill Center", distance: "3.1 km", phone: "+91 94567 89012", seats: 22 },
      { name: "MSME Beauty & Wellness Development Hub", distance: "7.0 km", phone: "+91 94567 89013", seats: 15 }
    ]
  },
  {
    nsqf_pack_name: "Organic Grower & Bio-Fertilizer Producer",
    level: 4,
    sector: "Agriculture & Allied",
    duration: "250 Hours (2.5 Months)",
    matchScore: 90,
    badgeColor: "emerald",
    skill_gap_analysis: "Farming base confirmed. Gap in NPOP certification standards, vermicomposting unit setup, pest management using botanical extracts, and FPO aggregation.",
    modules: [
      "Preparation of Jeevamrit and Bio-fertilizers",
      "Crop rotation and companion planting techniques",
      "Organic certification & soil testing compliance",
      "Direct-to-market linkage via e-NAM platform"
    ],
    stipend: "₹1,500 / month (PM-AJAY Skill Stipend)",
    toolkit_grant: "Soil Health Testing Kit + Vermicompost Bed Setup Grant",
    job_roles: ["Certified Organic Grower", "Bio-input Producer", "FPO Lead"],
    avg_salary: "₹15,000 - ₹30,000 / month (Yield Boost)",
    local_centers: [
      { name: "Krishi Vigyan Kendra (KVK) Regional Campus", distance: "9.5 km", phone: "+91 91234 56780", seats: 30 },
      { name: "National Centre of Organic Farming Training Unit", distance: "14.2 km", phone: "+91 91234 56781", seats: 16 }
    ]
  }
];

// Indian Languages Supported
export const SUPPORTED_LANGUAGES = [
  { code: "hi", name: "हिन्दी (Hindi)", short: "HI" },
  { code: "en", name: "English", short: "EN" },
  { code: "bn", name: "বাংলা (Bengali)", short: "BN" },
  { code: "te", name: "తెలుగు (Telugu)", short: "TE" },
  { code: "ta", name: "தமிழ் (Tamil)", short: "TA" },
  { code: "mr", name: "मराठी (Marathi)", short: "MR" },
  { code: "gu", name: "ગુજરાતી (Gujarati)", short: "GU" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)", short: "KN" }
];

// Quick Voice Prompts for instant testing with icon indicators
export const QUICK_PROMPTS = [
  {
    icon: "Scissors",
    label: "10th Pass + Tailoring (Wage)",
    text: "I have studied up to 10th grade and work as a tailor. I am looking for a wage job within 10 km."
  },
  {
    icon: "Sun",
    label: "12th Pass + Solar Tech",
    text: "I passed 12th grade and want to get trained as a Solar Panel installation technician."
  },
  {
    icon: "Sparkles",
    label: "8th Pass + Beauty Care (Self-Emp)",
    text: "I completed 8th standard and have basic salon experience. I want self-employment support."
  },
  {
    icon: "Sprout",
    label: "Farmer + Organic Cultivation",
    text: "I am a traditional farmer looking for training in organic growing and bio-fertilizer production."
  }
];

// PM-AJAY Scheme Components
export const SCHEME_COMPONENTS = [
  {
    title: "Skill Development Training",
    subtitle: "Free NSQF-aligned training with ₹1,000–₹2,000/mo DBT stipend and certified assessment.",
    icon: "GraduationCap",
    tag: "100% Funded"
  },
  {
    title: "Income Generating Assistance",
    subtitle: "Financial subsidy up to ₹50,000 (or 50% of project cost) for individual micro-enterprises.",
    icon: "Coins",
    tag: "Grant Subsidy"
  },
  {
    title: "Free Modern Toolkits",
    subtitle: "Trade-specific toolkits (Sewing machine, Solar Multimeter, Parlour kits) distributed upon graduation.",
    icon: "Wrench",
    tag: "Physical Toolkit"
  },
  {
    title: "MUDRA & Stand-Up India Linkage",
    subtitle: "Collateral-free micro-credit bank linkage assistance for setting up scalable self-employment units.",
    icon: "Building2",
    tag: "Credit Guarantee"
  }
];
