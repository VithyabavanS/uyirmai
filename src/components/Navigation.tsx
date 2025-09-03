import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'philosophy', path: '/philosophy' },
    { key: 'projects', path: '/projects' },
    { key: 'blog', path: '/blog' },
    { key: 'resources', path: '/resources' },
    { key: 'getInvolved', path: '/get-involved' },
    { key: 'products', path: '/products' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 z-50 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100 group-hover:border-primary/20 transition-all duration-300">
                <img 
                  src="/F6.png" 
                  alt="Uyirmai Logo" 
                  className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 w-14 h-14 bg-primary/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-2xl font-bold text-[#492f0e] group-hover:text-primary transition-colors duration-300">
                Uyirmai
              </span>
              <span className="font-heading text-sm font-medium text-[#492f0e]/70 group-hover:text-primary/70 transition-colors duration-300 tracking-wide">
                Collective
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  <span className="relative z-10">{t(item.key)}</span>
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                  )}
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-primary/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
                </Link>
              ))}
            </div>
            
            {/* Language Toggle */}
            <div className="ml-6 pl-6 border-l border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2 h-10 px-4 border-gray-300 hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Globe size={18} className="text-gray-600" />
                <span className="font-medium text-sm">
                  {language === 'en' ? 'தமிழ்' : 'EN'}
                </span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100 border-t border-gray-200/50' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-lg mx-2 transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span>{t(item.key)}</span>
                {isActive(item.path) && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                )}
              </Link>
            ))}
            
            {/* Mobile Language Toggle */}
            <div className="px-2 pt-4 border-t border-gray-200/50 mt-4">
              <Button
                variant="outline"
                onClick={toggleLanguage}
                className="w-full flex items-center justify-center space-x-2 h-12 border-gray-300 hover:border-primary hover:bg-primary/5"
              >
                <Globe size={20} />
                <span className="font-medium">
                  {language === 'en' ? 'Switch to தமிழ்' : 'Switch to English'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;