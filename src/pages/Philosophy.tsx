import React from 'react';
import { Heart, Target, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Philosophy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-organic">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            {t('philosophyTitle')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            {t('philosophySubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="card-hover shadow-organic border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-nature rounded-full flex items-center justify-center mb-4 organic-float">
                <Heart size={24} className="text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-heading text-foreground">{t('ourMission')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground leading-relaxed">
                {t('missionText')}
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover shadow-organic border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-earth rounded-full flex items-center justify-center mb-4 organic-float" style={{animationDelay: '0.5s'}}>
                <Eye size={24} className="text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-heading text-foreground">{t('ourVision')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground leading-relaxed">
                {t('visionText')}
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover shadow-organic border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-hero rounded-full flex items-center justify-center mb-4 organic-float" style={{animationDelay: '1s'}}>
                <Target size={24} className="text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-heading text-foreground">{t('ourPurpose')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground leading-relaxed">
                {t('purposeText')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-12">
            {t('coreValues')}
          </h2>
          
          <div className="space-y-8">
            {[
              {
                title: t('ecologicalHarmony'),
                description: t('ecologicalHarmonyText')
              },
              {
                title: t('communityEmpowerment'), 
                description: t('communityEmpowermentText')
              },
              {
                title: t('traditionalWisdom'),
                description: t('traditionalWisdomText')
              },
              {
                title: t('accessibilityInclusion'),
                description: t('accessibilityInclusionText')
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg p-8 shadow-nature border border-border/50 hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;