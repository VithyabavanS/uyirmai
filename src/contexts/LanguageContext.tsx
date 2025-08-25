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