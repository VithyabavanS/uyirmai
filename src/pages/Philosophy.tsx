import React from 'react';
import { Heart, Target, Eye, Leaf, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTina } from 'tinacms/dist/react';
import client from '../../tina/__generated__/client';

const Philosophy = (props) => {
  const { t } = useLanguage();

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const pageData = data.philosophy;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-48 translate-y-48" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          {/* Philosophy badge */}
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-6 hero-fade-in">
            <Leaf size={16} className="mr-2 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Our Philosophy</span>
          </div>
          
          <h1 data-tina-field="title" className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            {pageData.title}
          </h1>
          <p data-tina-field="subtitle" className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            {pageData.subtitle}
          </p>
        </div>

        {/* Mission, Vision, Purpose Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl text-center transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden" data-tina-field="mission">
            {/* Card background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="text-center relative z-10">
              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-red-500/25 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                  <Heart size={28} className="text-white" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-20 h-20 mx-auto bg-red-400 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>
              <CardTitle data-tina-field="title" className="text-2xl font-heading text-foreground group-hover:text-red-700 transition-colors duration-300">
                {pageData.mission.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <p data-tina-field="text" className="text-muted-foreground leading-relaxed">
                {pageData.mission.text}
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl text-center transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden" data-tina-field="vision">
            {/* Card background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="text-center relative z-10">
              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-blue-500/25 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500" style={{animationDelay: '0.5s'}}>
                  <Eye size={28} className="text-white" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-20 h-20 mx-auto bg-blue-400 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>
              <CardTitle data-tina-field="title" className="text-2xl font-heading text-foreground group-hover:text-blue-700 transition-colors duration-300">
                {pageData.vision.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <p data-tina-field="text" className="text-muted-foreground leading-relaxed">
                {pageData.vision.text}
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl text-center transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden" data-tina-field="purpose">
            {/* Card background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="text-center relative z-10">
              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-emerald-500/25 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500" style={{animationDelay: '1s'}}>
                  <Target size={28} className="text-white" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-20 h-20 mx-auto bg-emerald-400 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>
              <CardTitle data-tina-field="title" className="text-2xl font-heading text-foreground group-hover:text-emerald-700 transition-colors duration-300">
                {pageData.purpose.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <p data-tina-field="text" className="text-muted-foreground leading-relaxed">
                {pageData.purpose.text}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values Section */}
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-6">
              <Sparkles size={16} className="mr-2 text-gray-600" />
              <span className="text-gray-700 font-medium">Core Values</span>
            </div>
            
            <h2 data-tina-field="coreValuesTitle" className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-4">
              {pageData.coreValuesTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our every action and decision in building sustainable communities.
            </p>
          </div>
          
          <div className="space-y-6">
            {pageData.coreValues.map((value, index) => (
              <div 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl border border-gray-200/50 hover:border-emerald-200 transition-all duration-500 hover:-translate-y-1 hero-fade-in relative overflow-hidden"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`coreValues.${index}`}
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start space-x-4">
                    {/* Index number */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">{(index + 1).toString().padStart(2, '0')}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 data-tina-field="title" className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p data-tina-field="description" className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <Leaf size={32} className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const PhilosophyPage = () => {
  const { language } = useLanguage();
  const [props, setProps] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.philosophy({
          relativePath: `${language}.json`,
        });
        setProps(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [language]);

  if (!props) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading philosophy...</p>
        </div>
      </div>
    );
  }

  return <Philosophy {...props} />;
}

export default PhilosophyPage;