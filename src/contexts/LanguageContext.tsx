import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to dynamically import and merge translation files
const loadTranslations = async (lang: Language): Promise<Record<string, string>> => {
  const translationFiles = [
    'navigation', 'home', 'philosophy', 'projects', 'blog',
    'resources', 'getInvolved', 'products', 'common', 'footer'
  ];

  try {
    const modules = await Promise.all(
      translationFiles.map(file => import(`../translations/${lang}/${file}.json`))
    );

    // Merge all JSON modules into a single translation object
    return modules.reduce((acc, module) => ({ ...acc, ...module.default }), {});
  } catch (error) {
    console.error(`Failed to load translations for language: ${lang}`, error);
    return {}; // Return an empty object in case of an error
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On initial load, check for a saved language in localStorage
    const savedLang = localStorage.getItem('uyirmai-language') as Language;
    if (savedLang && ['en', 'ta'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    // Load translations whenever the language changes
    setIsLoading(true);
    loadTranslations(language).then(loadedTranslations => {
      setTranslations(loadedTranslations);
      setIsLoading(false);
    });
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('uyirmai-language', lang);
  };

  const t = (key: string): string => {
    // Return the translated string, or the key itself if not found
    return translations[key] || key;
  };
  
  // You can optionally return a loading indicator while translations are being fetched
  if (isLoading) {
    return null; // Or a loading spinner component
  }

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