import React from 'react';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-semibold mb-4">{t('contactUs')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-sm">{t('address')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <span className="text-sm">{t('phone')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <span className="text-sm">{t('email')}</span>
              </div>
            </div>
          </div>

          {/* About Uyirmai */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Uyirmai</h3>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              Dedicated to promoting sustainable living through permaculture, organic farming, 
              and community education. Together, we cultivate a greener future.
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">{t('followUs')}</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 border-secondary-foreground/20 hover:bg-accent hover:border-accent"
                  asChild
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-sm text-secondary-foreground/70">
            © 2024 Uyirmai. All rights reserved. | Built with love for nature 🌱
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;