import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: "Home",
    philosophy: "Uyirmai Philosophy", 
    projects: "Projects & Events",
    blog: "Blog",
    resources: "Resources",
    getInvolved: "Get Involved",
    products: "Products & Services",
    
    // Home page
    heroTitle: "Cultivating Life Through Permaculture",
    heroSubtitle: "Join us in creating sustainable communities through organic farming, education, and mindful living practices.",
    heroButton: "Explore Our Mission",
    latestUpdates: "Latest Updates",
    featuredWorkshops: "Featured Workshops",
    learnMore: "Learn More",
    
    // Philosophy page
    philosophyTitle: "Uyirmai Philosophy",
    philosophySubtitle: "Our foundation is built on the belief that sustainable living and harmony with nature are not just choices, but necessities for our planet's future.",
    ourMission: "Our Mission",
    missionText: "To empower individuals and communities with the knowledge and tools needed to practice sustainable agriculture and permaculture, fostering a deeper connection with the earth and promoting ecological regeneration.",
    ourVision: "Our Vision",
    visionText: "A world where every community thrives through sustainable practices, where food systems are regenerative, and where the relationship between humans and nature is one of mutual respect and benefit.",
    ourPurpose: "Our Purpose",
    purposeText: "To bridge the gap between traditional wisdom and modern sustainable practices, creating educational pathways that lead to practical, actionable change in how we grow food and care for our environment.",
    coreValues: "Our Core Values",
    ecologicalHarmony: "Ecological Harmony",
    ecologicalHarmonyText: "We believe in working with nature's systems rather than against them, creating regenerative practices that heal the earth while providing abundance.",
    communityEmpowerment: "Community Empowerment",
    communityEmpowermentText: "Every individual has the power to create positive change. We focus on education and skill-sharing to build resilient, self-sufficient communities.",
    traditionalWisdom: "Traditional Wisdom",
    traditionalWisdomText: "We honor and integrate time-tested agricultural practices with innovative sustainable techniques, respecting the knowledge of our ancestors.",
    accessibilityInclusion: "Accessibility & Inclusion",
    accessibilityInclusionText: "Sustainable living should be available to everyone. We strive to make our resources, workshops, and knowledge accessible to all communities.",
    
    // Projects page
    projectsTitle: "Projects & Events",
    projectsSubtitle: "Discover our ongoing initiatives and join upcoming events that are shaping sustainable communities across Tamil Nadu.",
    currentProjects: "Current Projects",
    upcomingEvents: "Upcoming Events",
    communityGarden: "Community Garden Initiative",
    communityGardenDesc: "Establishing sustainable community gardens in urban areas to promote local food production and community bonding.",
    organicTraining: "Organic Farming Training Program",
    organicTrainingDesc: "Comprehensive 6-month program teaching sustainable farming techniques to local farmers.",
    seedLibrary: "Seed Library Project",
    seedLibraryDesc: "Creating a community seed bank to preserve native varieties and promote biodiversity.",
    ongoing: "Ongoing",
    completed: "Completed",
    upcoming: "Upcoming",
    participants: "participants",
    started: "Started:",
    spotsAvailable: "spots available",
    registerNow: "Register Now",
    
    // Blog page
    blogTitle: "Blog & Articles",
    blogSubtitle: "Stay updated with the latest insights, tips, and stories from our permaculture journey.",
    searchPlaceholder: "Search articles...",
    allCategories: "All Categories",
    featuredPosts: "Featured Posts",
    recentPosts: "Recent Posts",
    
    // Resources page
    resourcesTitle: "Resources & Learning",
    resourcesSubtitle: "Access our comprehensive collection of guides, videos, and educational materials for sustainable living.",
    downloadableGuides: "Downloadable Guides",
    videoTutorials: "Video Tutorials",
    techniques: "Techniques & Methods",
    downloadPdf: "Download PDF",
    watchVideo: "Watch Video",
    
    // Get Involved page
    getInvolvedTitle: "Get Involved",
    getInvolvedSubtitle: "Join our community and make a difference through volunteering, learning, and participating in our programs.",
    volunteerOpportunities: "Volunteer Opportunities",
    coursesTraining: "Courses & Training",
    applyNow: "Apply Now",
    enrollNow: "Enroll Now",
    
    // Products page
    productsTitle: "Products & Services",
    productsSubtitle: "Discover our range of organic products and professional consulting services for sustainable agriculture.",
    organicProducts: "Organic Products",
    consultingServices: "Consulting Services",
    addToCart: "Add to Cart",
    bookConsultation: "Book Consultation",
    
    // Common
    readMore: "Read More",
    contactUs: "Contact Us",
    getStarted: "Get Started",
    
    // Footer
    followUs: "Follow Us",
    address: "123 Organic Lane, Green Valley, Tamil Nadu 600001",
    phone: "+91 98765 43210",
    email: "hello@uyirmai.org"
  },
  ta: {
    // Navigation
    home: "முகப்பு",
    philosophy: "உயிர்மை தத்துவம்",
    projects: "திட்டங்கள் & நிகழ்வுகள்",
    blog: "வலைப்பதிவு",
    resources: "வளங்கள்",
    getInvolved: "பங்கேற்க",
    products: "தயாரிப்புகள் & சேவைகள்",
    
    // Home page
    heroTitle: "பெர்மாகல்ச்சர் மூலம் வாழ்வைப் பயிரிடுதல்",
    heroSubtitle: "இயற்கை விவசாயம், கல்வி மற்றும் நினைவுப்பூர்வமான வாழ்க்கை முறைகள் மூலம் நிலையான சமூகங்களை உருவாக்குவதில் எங்களுடன் சேருங்கள்.",
    heroButton: "எங்கள் நோக்கத்தை ஆராயுங்கள்",
    latestUpdates: "சமீபத்திய புதுப்பிப்புகள்",
    featuredWorkshops: "சிறப்பு பட்டறைகள்",
    learnMore: "மேலும் அறிய",
    
    // Philosophy page
    philosophyTitle: "உயிர்மை தத்துவம்",
    philosophySubtitle: "நிலையான வாழ்க்கை மற்றும் இயற்கையுடனான இணக்கம் வெறும் தேர்வுகள் அல்ல, மாறாக நமது கிரகத்தின் எதிர்காலத்திற்கான அவசியங்கள் என்ற நம்பிக்கையின் அடிப்படையில் எங்கள் அடித்தளம் கட்டப்பட்டுள்ளது.",
    ourMission: "எங்கள் நோக்கம்",
    missionText: "நிலையான விவசாயம் மற்றும் பெர்மாகல்ச்சர் நடைமுறைகளுக்கு தேவையான அறிவு மற்றும் கருவிகளை தனிநபர்கள் மற்றும் சமூகங்களுக்கு வழங்குவது, பூமியுடன் ஆழமான தொடர்பை வளர்ப்பது மற்றும் சுற்றுச்சூழல் மீளுருவாக்கத்தை ஊக்குவிப்பது.",
    ourVision: "எங்கள் பார்வை",
    visionText: "ஒவ்வொரு சமூகமும் நிலையான நடைமுறைகளின் மூலம் செழித்து வளரும் உலகம், உணவு அமைப்புகள் மீளுருவாக்கமாக இருக்கும், மற்றும் மனிதர்களுக்கும் இயற்கைக்கும் இடையிலான உறவு பரஸ்பர மரியாதை மற்றும் நன்மையின் அடிப்படையில் அமையும்.",
    ourPurpose: "எங்கள் நோக்கம்",
    purposeText: "பாரம்பரிய ஞானத்திற்கும் நவீன நிலையான நடைமுறைகளுக்கும் இடையிலான இடைவெளியை குறைப்பது, நாம் உணவு வளர்ப்பதில் மற்றும் நமது சுற்றுச்சூழலை கவனித்துக்கொள்வதில் நடைமுறை, செயல்படக்கூடிய மாற்றங்களுக்கு வழிவகுக்கும் கல்வி பாதைகளை உருவாக்குவது.",
    coreValues: "எங்கள் முக்கிய மதிப்புகள்",
    ecologicalHarmony: "சுற்றுச்சூழல் இணக்கம்",
    ecologicalHarmonyText: "இயற்கையின் அமைப்புகளுக்கு எதிராக அல்லாமல் அவற்றுடன் இணைந்து செயல்படுவதில் நாங்கள் நம்புகிறோம், பூமியை குணப்படுத்தும் அதே நேரத்தில் செழிப்பை வழங்கும் மீளுருவாக்க நடைமுறைகளை உருவாக்குகிறோம்.",
    communityEmpowerment: "சமூக அதிகாரம்",
    communityEmpowermentText: "ஒவ்வொரு தனிநபரும் நேர்மறையான மாற்றத்தை உருவாக்கும் சக்தியைக் கொண்டுள்ளனர். நாங்கள் கல்வி மற்றும் திறன் பகிர்வில் கவனம் செலுத்தி, தன்னிறைவுள்ள, தன்னிறைவு மிக்க சமூகங்களை உருவாக்குகிறோம்.",
    traditionalWisdom: "பாரம்பரிய ஞானம்",
    traditionalWisdomText: "நாங்கள் நமது முன்னோர்களின் அறிவை மதித்து, காலத்தால் நிரூபிக்கப்பட்ட விவசாய நடைமுறைகளை புதுமையான நிலையான தொழில்நுட்பங்களுடன் ஒருங்கிணைக்கிறோம்.",
    accessibilityInclusion: "அணுகல் & உள்ளடக்கம்",
    accessibilityInclusionText: "நிலையான வாழ்க்கை அனைவருக்கும் கிடைக்க வேண்டும். எங்கள் வளங்கள், பட்டறைகள் மற்றும் அறிவை அனைத்து சமூகங்களுக்கும் அணுகக்கூடியதாக மாற்ற நாங்கள் முயற்சி செய்கிறோம்.",
    
    // Projects page
    projectsTitle: "திட்டங்கள் & நிகழ்வுகள்",
    projectsSubtitle: "தமிழ்நாடு முழுவதும் நிலையான சமூகங்களை வடிவமைக்கும் எங்கள் தற்போதைய முயற்சிகளைக் கண்டறிந்து, வரவிருக்கும் நிகழ்வுகளில் சேருங்கள்.",
    currentProjects: "தற்போதைய திட்டங்கள்",
    upcomingEvents: "வரவிருக்கும் நிகழ்வுகள்",
    communityGarden: "சமூக தோட்ட முயற்சி",
    communityGardenDesc: "உள்ளூர் உணவு உற்பத்தி மற்றும் சமூக பிணைப்பை ஊக்குவிக்க நகர்ப்புற பகுதிகளில் நிலையான சமூக தோட்டங்களை நிறுவுதல்.",
    organicTraining: "இயற்கை விவசாய பயிற்சி திட்டம்",
    organicTrainingDesc: "உள்ளூர் விவசாயிகளுக்கு நிலையான விவசாய நுட்பங்களை கற்பிக்கும் விரிவான 6 மாத திட்டம்.",
    seedLibrary: "விதை நூலக திட்டம்",
    seedLibraryDesc: "பூர்வீக வகைகளைப் பாதுகாக்கவும் பல்லுயிரியத்தை ஊக்குவிக்கவும் சமூக விதை வங்கியை உருவாக்குதல்.",
    ongoing: "நடைபெறும்",
    completed: "நிறைவு",
    upcoming: "வரவிருக்கும்",
    participants: "பங்கேற்பாளர்கள்",
    started: "தொடங்கப்பட்டது:",
    spotsAvailable: "இடங்கள் உள்ளன",
    registerNow: "இப்போது பதிவு செய்யுங்கள்",
    
    // Blog page
    blogTitle: "வலைப்பதிவு & கட்டுரைகள்",
    blogSubtitle: "எங்கள் பெர்மாகல்ச்சர் பயணத்தின் சமீபத்திய நுண்ணறிவுகள், குறிப்புகள் மற்றும் கதைகளுடன் புதுப்பிக்கப்பட்டு இருங்கள்.",
    searchPlaceholder: "கட்டுரைகளைத் தேடுங்கள்...",
    allCategories: "அனைத்து பிரிவுகள்",
    featuredPosts: "சிறப்பு இடுகைகள்",
    recentPosts: "சமீபத்திய இடுகைகள்",
    
    // Resources page
    resourcesTitle: "வளங்கள் & கற்றல்",
    resourcesSubtitle: "நிலையான வாழ்க்கைக்கான எங்கள் விரிவான வழிகாட்டிகள், வீடியோக்கள் மற்றும் கல்வி பொருட்களின் தொகுப்பை அணுகவும்.",
    downloadableGuides: "பதிவிறக்கக்கூடிய வழிகாட்டிகள்",
    videoTutorials: "வீடியோ பயிற்சி",
    techniques: "நுட்பங்கள் & முறைகள்",
    downloadPdf: "PDF பதிவிறக்கம்",
    watchVideo: "வீடியோ பார்க்க",
    
    // Get Involved page
    getInvolvedTitle: "பங்கேற்க",
    getInvolvedSubtitle: "எங்கள் சமூகத்தில் சேர்ந்து தன்னார்வத்தின் மூலமாகவும், கற்றலின் மூலமாகவும், எங்கள் திட்டங்களில் பங்கேற்பதன் மூலமாகவும் மாற்றத்தை ஏற்படுத்துங்கள்.",
    volunteerOpportunities: "தன்னார்வ வாய்ப்புகள்",
    coursesTraining: "படிப்புகள் & பயிற்சி",
    applyNow: "இப்போது விண்ணப்பிக்கவும்",
    enrollNow: "இப்போது சேருங்கள்",
    
    // Products page
    productsTitle: "தயாரிப்புகள் & சேவைகள்",
    productsSubtitle: "நிலையான விவசாயத்திற்கான எங்கள் இயற்கை தயாரிப்புகள் மற்றும் தொழில்முறை ஆலோசனை சேவைகளின் வரம்பைக் கண்டறியுங்கள்.",
    organicProducts: "இயற்கை தயாரிப்புகள்",
    consultingServices: "ஆலோசனை சேவைகள்",
    addToCart: "கார்ட்டில் சேர்க்கவும்",
    bookConsultation: "ஆலோசனை பதிவு செய்யுங்கள்",
    
    // Common
    readMore: "மேலும் படிக்க",
    contactUs: "எங்களை தொடர்பு கொள்ளுங்கள்",
    getStarted: "தொடங்குங்கள்",
    
    // Footer
    followUs: "எங்களைப் பின்தொடருங்கள்",
    address: "123 ஆர்கானிக் லேன், கிரீன் வேலி, தமிழ்நாடு 600001",
    phone: "+91 98765 43210",
    email: "hello@uyirmai.org"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('uyirmai-language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ta')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('uyirmai-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};