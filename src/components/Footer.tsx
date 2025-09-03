import React from 'react';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600 hover:border-blue-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600 hover:border-pink-600' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600 hover:border-red-600' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl -translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl translate-x-48 translate-y-48" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Phone size={16} className="text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">{t('contactUs')}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="group flex items-start space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300">
                <MapPin size={20} className="text-emerald-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-white font-medium mb-1">Address</p>
                  <span className="text-gray-300 text-sm leading-relaxed">{t('address')}</span>
                </div>
              </div>
              
              <div className="group flex items-start space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 cursor-pointer">
                <Phone size={20} className="text-emerald-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-white font-medium mb-1">Phone</p>
                  <span className="text-gray-300 text-sm hover:text-emerald-300 transition-colors duration-300">{t('phone')}</span>
                </div>
              </div>
              
              <div className="group flex items-start space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 cursor-pointer">
                <Mail size={20} className="text-emerald-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-white font-medium mb-1">Email</p>
                  <span className="text-gray-300 text-sm hover:text-emerald-300 transition-colors duration-300">{t('email')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Uyirmai */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Leaf size={16} className="text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">Uyirmai</h3>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-600/20 to-green-600/20 backdrop-blur-sm border border-emerald-400/30">
              <p className="text-gray-100 leading-relaxed">
                Dedicated to promoting sustainable living through permaculture, organic farming, 
                and community education. Together, we cultivate a greener future.
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Instagram size={16} className="text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">{t('followUs')}</h3>
            </div>
            
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Stay connected with our sustainable community and get the latest updates on workshops, events, and eco-friendly tips.
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="sm"
                    className={`w-12 h-12 p-0 border-white/30 bg-white/10 backdrop-blur-sm text-gray-300 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 ${social.color}`}
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-16 pt-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <p className="text-gray-300 flex items-center space-x-2">
              <span>© 2024 Uyirmai. All rights reserved. | Built with love for nature</span>
              <span className="text-emerald-400 animate-pulse">🌱</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;