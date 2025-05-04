import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations = {
  en: {
    // Navigation
    'navigation.back': 'Back',
    'navigation.home': 'Home',
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.roadmaps': 'Roadmaps',
    'nav.blog': 'Blog',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'Transform Your Future with CodePathway',
    'hero.subtitle': 'Join thousands of learners who have transformed their careers through our interactive, project-based learning platform.',
    'hero.start_learning': 'Start Learning Now',
    'hero.explore_roadmaps': 'Explore Roadmaps',
    'hero.developed_by': 'Developed by Amara Mehdi',
    'hero.crafted_with': 'Crafted with passion by Amara Mehdi',

    // Features
    'features.interactive_learning': 'Interactive Learning',
    'features.interactive_learning_desc': 'Learn through interactive lessons, playgrounds, and coding exercises.',
    'features.roadmaps': 'Comprehensive Roadmaps',
    'features.roadmaps_desc': 'Follow structured learning paths for various tech careers.',
    'features.playgrounds': 'Code Playgrounds',
    'features.playgrounds_desc': 'Practice your skills in our interactive code environments.',
    'features.certificates': 'Earn Certificates',
    'features.certificates_desc': 'Get recognized for your knowledge with course certificates.',

    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.theme.light': 'Light',
    'settings.theme.dark': 'Dark',
    'settings.theme.system': 'System',

    // Footer
    'footer.resources': 'Resources',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.connect': 'Connect',
    'footer.copyright': '© {year} Digital Engineer Pathway. All rights reserved.',
  },
  fr: {
    // Navigation
    'navigation.back': 'Retour',
    'navigation.home': 'Accueil',
    'nav.home': 'Accueil',
    'nav.courses': 'Cours',
    'nav.roadmaps': 'Parcours',
    'nav.blog': 'Blog',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'Transformez Votre Avenir avec CodePathway',
    'hero.subtitle': 'Rejoignez des milliers d\'apprenants qui ont transformé leur carrière grâce à notre plateforme d\'apprentissage interactive.',
    'hero.start_learning': 'Commencer à Apprendre',
    'hero.explore_roadmaps': 'Explorer les Parcours',
    'hero.developed_by': 'Développé par Amara Mehdi',
    'hero.crafted_with': 'Créé avec passion par Amara Mehdi',

    // Features
    'features.interactive_learning': 'Apprentissage Interactif',
    'features.interactive_learning_desc': 'Apprenez à travers des leçons interactives et des exercices pratiques.',
    'features.roadmaps': 'Parcours Complets',
    'features.roadmaps_desc': 'Suivez des parcours d\'apprentissage structurés pour diverses carrières tech.',
    'features.playgrounds': 'Environnements de Code',
    'features.playgrounds_desc': 'Pratiquez vos compétences dans nos environnements interactifs.',
    'features.certificates': 'Obtenez des Certificats',
    'features.certificates_desc': 'Faites reconnaître vos connaissances avec des certificats.',

    // Settings
    'settings.title': 'Paramètres',
    'settings.language': 'Langue',
    'settings.theme': 'Thème',
    'settings.theme.light': 'Clair',
    'settings.theme.dark': 'Sombre',
    'settings.theme.system': 'Système',

    // Footer
    'footer.resources': 'Ressources',
    'footer.company': 'Entreprise',
    'footer.legal': 'Mentions Légales',
    'footer.connect': 'Nous Suivre',
    'footer.copyright': '© {year} Digital Engineer Pathway. Tous droits réservés.',
  },
  ar: {
    // Navigation
    'navigation.back': 'رجوع',
    'navigation.home': 'الرئيسية',
    'nav.home': 'الرئيسية',
    'nav.courses': 'الدورات',
    'nav.roadmaps': 'المسارات',
    'nav.blog': 'المدونة',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',

    // Hero Section
    'hero.title': 'حول مستقبلك مع CodePathway',
    'hero.subtitle': 'انضم إلى آلاف المتعلمين الذين حولوا مسارهم المهني من خلال منصتنا التعليمية التفاعلية',
    'hero.start_learning': 'ابدأ التعلم الآن',
    'hero.explore_roadmaps': 'استكشف المسارات',
    'hero.developed_by': 'طُوِّر بواسطة عمارة مهدي',
    'hero.crafted_with': 'صُنع بشغف بواسطة عمارة مهدي',

    // Features
    'features.interactive_learning': 'تعلم تفاعلي',
    'features.interactive_learning_desc': 'تعلم من خلال الدروس التفاعلية والتمارين العملية',
    'features.roadmaps': 'مسارات شاملة',
    'features.roadmaps_desc': 'اتبع مسارات تعليمية منظمة لمختلف المسارات التقنية',
    'features.playgrounds': 'بيئات برمجة',
    'features.playgrounds_desc': 'مارس مهاراتك في بيئاتنا التفاعلية',
    'features.certificates': 'احصل على الشهادات',
    'features.certificates_desc': 'احصل على اعتراف بمعرفتك من خلال شهاداتنا',

    // Settings
    'settings.title': 'الإعدادات',
    'settings.language': 'اللغة',
    'settings.theme': 'المظهر',
    'settings.theme.light': 'فاتح',
    'settings.theme.dark': 'داكن',
    'settings.theme.system': 'النظام',

    // Footer
    'footer.resources': 'المصادر',
    'footer.company': 'الشركة',
    'footer.legal': 'قانوني',
    'footer.connect': 'تواصل معنا',
    'footer.copyright': '© {year} Digital Engineer Pathway. جميع الحقوق محفوظة.',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    return translation.replace('{year}', new Date().getFullYear().toString());
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 