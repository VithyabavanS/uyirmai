import React from 'react';
import { Heart, Target, Eye } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-organic">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 data-tina-field="title" className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            {pageData.title}
          </h1>
          <p data-tina-field="subtitle" className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            {pageData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="card-hover shadow-organic border-0" data-tina-field="mission">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-nature rounded-full flex items-center justify-center mb-4 organic-float">
                <Heart size={24} className="text-primary-foreground" />
              </div>
              <CardTitle data-tina-field="title" className="text-2xl font-heading text-foreground">{pageData.mission.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p data-tina-field="text" className="text-muted-foreground leading-relaxed">
                {pageData.mission.text}
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover shadow-organic border-0" data-tina-field="vision">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-earth rounded-full flex items-center justify-center mb-4 organic-float" style={{animationDelay: '0.5s'}}>
                <Eye size={24} className="text-primary-foreground" />
              </div>
              <CardTitle data-tina-field="title" className="text-2xl font-heading text-foreground">{pageData.vision.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p data-tina-field="text" className="text-muted-foreground leading-relaxed">
                {pageData.vision.text}
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover shadow-organic border-0" data-tina-field="purpose">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-hero rounded-full flex items-center justify-center mb-4 organic-float" style={{animationDelay: '1s'}}>
                <Target size={24} className="text-primary-foreground" />
              </div>
              <CardTitle data-tina-field="title" className="text-2xl font-heading text-foreground">{pageData.purpose.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p data-tina-field="text" className="text-muted-foreground leading-relaxed">
                {pageData.purpose.text}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="max-w-4xl mx-auto">
          <h2 data-tina-field="coreValuesTitle" className="text-3xl font-heading font-bold text-center text-foreground mb-12">
            {pageData.coreValuesTitle}
          </h2>
          
          <div className="space-y-8">
            {pageData.coreValues.map((value, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg p-8 shadow-nature border border-border/50 hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`coreValues.${index}`}
              >
                <h3 data-tina-field="title" className="text-xl font-heading font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p data-tina-field="description" className="text-muted-foreground leading-relaxed">
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

const PhilosophyPage = () => {
  const { language } = useLanguage();
  const [props, setProps] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await client.queries.philosophy({
        relativePath: `${language}.json`,
      });
      setProps(res);
    };
    fetchData();
  }, [language]);

  return props ? <Philosophy {...props} /> : <div>Loading...</div>;
}

export default PhilosophyPage;