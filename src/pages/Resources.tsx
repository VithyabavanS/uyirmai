import React, { useState } from 'react';
import { Download, Play, BookOpen, FileText, Video, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTina } from 'tinacms/dist/react';
import client from '../../tina/__generated__/client';

const Resources = (props) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const pageData = data.resources;

  const categories = ['All', ...new Set(pageData.resources.map(r => r.category))];

  const resourceIcons = {
    PDF: FileText,
    'Video Series': Video,
    Infographic: FileText,
    Video: Video,
    Document: BookOpen,
  };

  const filteredResources = selectedCategory === 'All' 
    ? pageData.resources 
    : pageData.resources.filter(resource => resource.category === selectedCategory);

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

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Resources */}
        <div className="mb-16">
          <h2 data-tina-field="featuredResourcesTitle" className="text-2xl font-heading font-bold text-foreground mb-8">
            {pageData.featuredResourcesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pageData.resources.filter(r => r.featured).map((resource, index) => {
              const Icon = resourceIcons[resource.type];
              return (
              <Card 
                key={index} 
                className="card-hover shadow-nature border-0 hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`resources.${index}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-accent text-white">Featured</Badge>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon size={16} />
                      <span data-tina-field="type" className="text-sm">{resource.type}</span>
                    </div>
                  </div>
                  <CardTitle data-tina-field="title" className="font-heading text-xl text-foreground">
                    {resource.title}
                  </CardTitle>
                  <CardDescription data-tina-field="description">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-muted-foreground">
                      {resource.size && <span data-tina-field="size">Size: {resource.size}</span>}
                      {resource.duration && <span data-tina-field="duration">Duration: {resource.duration}</span>}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {resource.downloads && <span data-tina-field="downloads">{resource.downloads} downloads</span>}
                      {resource.views && <span data-tina-field="views">{resource.views} views</span>}
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-nature">
                    <Download size={16} className="mr-2" />
                    {resource.type === 'Video' || resource.type === 'Video Series' ? t('watchVideo') : t('downloadPdf')}
                  </Button>
                </CardContent>
              </Card>
            )})
          }
          </div>
        </div>

        {/* All Resources */}
        <div className="mb-16">
          <h2 data-tina-field="allResourcesTitle" className="text-2xl font-heading font-bold text-foreground mb-8">
            {pageData.allResourcesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.filter(r => !r.featured).map((resource, index) => {
              const Icon = resourceIcons[resource.type];
              return (
              <Card 
                key={index} 
                className="card-hover shadow-organic border-0 hero-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
                data-tina-field={`resources.${index}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge data-tina-field="category" variant="outline" className="text-xs">
                      {resource.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon size={14} />
                      <span data-tina-field="type" className="text-xs">{resource.type}</span>
                    </div>
                  </div>
                  <CardTitle data-tina-field="title" className="font-heading text-lg text-foreground line-clamp-2">
                    {resource.title}
                  </CardTitle>
                  <CardDescription data-tina-field="description" className="text-sm line-clamp-2">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>
                      {resource.size && <span data-tina-field="size">{resource.size}</span>}
                      {resource.duration && <span data-tina-field="duration">{resource.duration}</span>}
                    </span>
                    <span>
                      {resource.downloads && <span data-tina-field="downloads">{resource.downloads} ↓</span>}
                      {resource.views && <span data-tina-field="views">{resource.views} views</span>}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download size={14} className="mr-2" />
                    {resource.type.includes('Video') ? t('watchVideo') : t('downloadPdf')}
                  </Button>
                </CardContent>
              </Card>
            )})
          }
          </div>
        </div>

        {/* Techniques & Guides */}
        <div>
          <h2 data-tina-field="techniquesTitle" className="text-2xl font-heading font-bold text-foreground mb-8">
            {pageData.techniquesTitle}
          </h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="multiple" className="space-y-4">
              {pageData.techniques.map((technique, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card rounded-lg border-0 shadow-organic px-6 hero-fade-in"
                  style={{animationDelay: `${index * 0.15}s`}}
                  data-tina-field={`techniques.${index}`}
                >
                  <AccordionTrigger data-tina-field="title" className="font-heading text-lg text-foreground hover:text-primary">
                    {technique.title}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {technique.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth cursor-pointer"
                          data-tina-field={`items.${itemIndex}`}
                        >
                          <BookOpen size={16} className="text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResourcesPage = () => {
  const { language } = useLanguage();
  const [props, setProps] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await client.queries.resources({
        relativePath: `${language}.json`,
      });
      setProps(res);
    };
    fetchData();
  }, [language]);

  return props ? <Resources {...props} /> : <div>Loading...</div>;
}

export default ResourcesPage;