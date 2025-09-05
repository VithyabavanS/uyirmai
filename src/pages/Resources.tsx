import React, { useState } from 'react';
import { Download, Play, BookOpen, FileText, Video, Link as LinkIcon, Leaf, Library, Filter } from 'lucide-react';
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

  // ✅ Button logic with original design styling
  const renderResourceButton = (resource, isFeatured = false) => {
    const buttonClass = isFeatured 
      ? "w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
      : "w-full group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-700 transition-all duration-300";

    if (resource.type.includes("Video") && resource.videoFile) {
      return (
        <a href={resource.videoFile} target="_blank" rel="noopener noreferrer" className="block">
          <Button className={buttonClass} variant={isFeatured ? "default" : "outline"} size={isFeatured ? "default" : "sm"}>
            <Play size={isFeatured ? 16 : 14} className="mr-2" />
            {t("watchVideo")}
          </Button>
        </a>
      );
    }
    if (resource.pdfFile) {
      return (
        <a href={resource.pdfFile} target="_blank" rel="noopener noreferrer" className="block">
          <Button className={buttonClass} variant={isFeatured ? "default" : "outline"} size={isFeatured ? "default" : "sm"}>
            <Download size={isFeatured ? 16 : 14} className="mr-2" />
            {t("downloadPdf")}
          </Button>
        </a>
      );
    }
    return (
      <Button disabled className={`w-full opacity-60 ${isFeatured ? '' : 'text-sm'}`} variant={isFeatured ? "default" : "outline"} size={isFeatured ? "default" : "sm"}>
        <Download size={isFeatured ? 16 : 14} className="mr-2" />
        {t("NotAvailable")}
      </Button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-48 translate-y-48" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-6 hero-fade-in">
            <Library size={16} className="mr-2 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Resource Library</span>
          </div>
          
          <h1 data-tina-field="title" className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            {pageData.title}
          </h1>
          <p data-tina-field="subtitle" className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            {pageData.subtitle}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter size={16} />
              <span className="font-medium">Filter by category:</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md' 
                    : 'bg-white/80 backdrop-blur-sm hover:bg-emerald-50 hover:border-emerald-200 text-gray-700'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Resources */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full">
              <span className="text-yellow-700 font-medium">⭐ Featured Content</span>
            </div>
          </div>
          <h2 data-tina-field="featuredResourcesTitle" className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            {pageData.featuredResourcesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pageData.resources.filter(r => r.featured).map((resource, index) => {
              const Icon = resourceIcons[resource.type];
              return (
              <Card 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`resources.${index}`}
              >
                {/* Card background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 font-medium">
                      Featured
                    </Badge>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                        <Icon size={16} className="text-emerald-600" />
                      </div>
                      <span data-tina-field="type" className="text-sm font-medium">{resource.type}</span>
                    </div>
                  </div>
                  <CardTitle data-tina-field="title" className="font-heading text-xl text-foreground group-hover:text-emerald-700 transition-colors duration-300">
                    {resource.title}
                  </CardTitle>
                  <CardDescription data-tina-field="description" className="leading-relaxed">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">
                      {resource.size && <span data-tina-field="size" className="font-medium">Size: {resource.size}</span>}
                      {resource.duration && <span data-tina-field="duration" className="font-medium">Duration: {resource.duration}</span>}
                    </div>
                    <div className="text-sm text-emerald-600 font-medium">
                      {resource.downloads && <span data-tina-field="downloads">{resource.downloads} downloads</span>}
                      {resource.views && <span data-tina-field="views">{resource.views} views</span>}
                    </div>
                  </div>
                  {renderResourceButton(resource, true)}
                </CardContent>
              </Card>
            )})
          }
          </div>
        </div>

        {/* All Resources */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
              <BookOpen size={16} className="mr-2 text-blue-600" />
              <span className="text-blue-700 font-medium">All Resources</span>
            </div>
          </div>
          <h2 data-tina-field="allResourcesTitle" className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            {pageData.allResourcesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.filter(r => !r.featured).map((resource, index) => {
              const Icon = resourceIcons[resource.type];
              return (
              <Card 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative overflow-hidden hero-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
                data-tina-field={`resources.${index}`}
              >
                {/* Card background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="pb-3 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Badge data-tina-field="category" variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                      {resource.category}
                    </Badge>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                        <Icon size={12} className="text-blue-600" />
                      </div>
                      <span data-tina-field="type" className="text-xs font-medium">{resource.type}</span>
                    </div>
                  </div>
                  <CardTitle data-tina-field="title" className="font-heading text-lg text-foreground line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
                    {resource.title}
                  </CardTitle>
                  <CardDescription data-tina-field="description" className="text-sm line-clamp-2 leading-relaxed">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 p-2 bg-gray-50/50 rounded-lg">
                    <span className="font-medium">
                      {resource.size && <span data-tina-field="size">{resource.size}</span>}
                      {resource.duration && <span data-tina-field="duration">{resource.duration}</span>}
                    </span>
                    <span className="text-emerald-600 font-medium">
                      {resource.downloads && <span data-tina-field="downloads">{resource.downloads} ↓</span>}
                      {resource.views && <span data-tina-field="views">{resource.views} views</span>}
                    </span>
                  </div>
                  {renderResourceButton(resource, false)}
                </CardContent>
              </Card>
            )})
          }
          </div>
        </div>

        {/* Techniques & Guides */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full">
              <Leaf size={16} className="mr-2 text-purple-600" />
              <span className="text-purple-700 font-medium">Techniques & Guides</span>
            </div>
          </div>
          <h2 data-tina-field="techniquesTitle" className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            {pageData.techniquesTitle}
          </h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="multiple" className="space-y-4">
              {pageData.techniques.map((technique, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white/80 backdrop-blur-sm rounded-xl border-0 shadow-lg hover:shadow-xl px-6 transition-all duration-300 hero-fade-in"
                  style={{animationDelay: `${index * 0.15}s`}}
                  data-tina-field={`techniques.${index}`}
                >
                  <AccordionTrigger data-tina-field="title" className="font-heading text-lg text-foreground hover:text-emerald-700 transition-colors duration-300">
                    {technique.title}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {technique.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex}
                          className="group flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 transition-all duration-300 cursor-pointer border border-emerald-100 hover:border-emerald-200 hover:scale-105"
                          data-tina-field={`items.${itemIndex}`}
                        >
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                            <BookOpen size={14} className="text-emerald-600" />
                          </div>
                          <span className="text-sm text-foreground font-medium group-hover:text-emerald-700 transition-colors duration-300">{item}</span>
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
      try {
        const res = await client.queries.resources({
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
          <p className="text-gray-600 font-medium">Loading resources...</p>
        </div>
      </div>
    );
  }

  return <Resources {...props} />;
}

export default ResourcesPage;