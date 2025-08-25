import React, { useState } from 'react';
import { Download, Play, BookOpen, FileText, Video, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Guides', 'Videos', 'Documents', 'Tools'];

  const resources = [
    {
      title: "Permaculture Design Principles Guide",
      description: "Comprehensive 50-page guide covering all 12 principles of permaculture design with practical examples.",
      type: "PDF",
      category: "Guides",
      size: "2.3 MB",
      downloads: 1245,
      icon: FileText,
      featured: true
    },
    {
      title: "Organic Composting Techniques",
      description: "Step-by-step video series on creating nutrient-rich compost using organic materials.",
      type: "Video Series",
      category: "Videos", 
      duration: "45 min",
      views: 3420,
      icon: Video,
      featured: false
    },
    {
      title: "Seasonal Planting Calendar - Tamil Nadu",
      description: "Month-by-month planting guide specifically designed for Tamil Nadu's climate and soil conditions.",
      type: "PDF",
      category: "Documents",
      size: "1.8 MB", 
      downloads: 892,
      icon: FileText,
      featured: false
    },
    {
      title: "Companion Planting Chart",
      description: "Visual guide showing which plants grow best together for maximum yield and natural pest control.", 
      type: "Infographic",
      category: "Guides",
      size: "850 KB",
      downloads: 2156,
      icon: FileText,
      featured: true
    },
    {
      title: "Natural Pest Control Workshop",
      description: "Complete workshop recording covering identification and organic treatment of common garden pests.",
      type: "Video",
      category: "Videos",
      duration: "2 hours",
      views: 1876,
      icon: Video,
      featured: false
    },
    {
      title: "Seed Starting Techniques Manual",
      description: "Detailed manual on starting seeds indoors and outdoors, including timing and care instructions.",
      type: "Document",
      category: "Documents", 
      size: "1.2 MB",
      downloads: 678,
      icon: BookOpen,
      featured: false
    }
  ];

  const techniques = [
    {
      title: "Water Management",
      items: [
        "Rainwater Harvesting Systems",
        "Drip Irrigation Setup", 
        "Greywater Recycling",
        "Swales and Berms Construction"
      ]
    },
    {
      title: "Soil Health",
      items: [
        "Composting Methods",
        "Soil Testing Techniques",
        "Natural Fertilizer Recipes",
        "Mulching Strategies"
      ]
    },
    {
      title: "Plant Care",
      items: [
        "Organic Pest Management",
        "Companion Planting Guide", 
        "Pruning Techniques",
        "Disease Prevention"
      ]
    },
    {
      title: "Sustainable Practices",
      items: [
        "Energy-Efficient Greenhouse Design",
        "Zero-Waste Garden Methods",
        "Renewable Energy Integration",
        "Carbon Footprint Reduction"
      ]
    }
  ];

  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-organic">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            Resources Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            Access our comprehensive collection of guides, videos, and tools to support 
            your sustainable living and permaculture journey.
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
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.filter(r => r.featured).map((resource, index) => (
              <Card 
                key={index} 
                className="card-hover shadow-nature border-0 hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-accent text-white">Featured</Badge>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <resource.icon size={16} />
                      <span className="text-sm">{resource.type}</span>
                    </div>
                  </div>
                  <CardTitle className="font-heading text-xl text-foreground">
                    {resource.title}
                  </CardTitle>
                  <CardDescription>
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-muted-foreground">
                      {resource.size && `Size: ${resource.size}`}
                      {resource.duration && `Duration: ${resource.duration}`}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {resource.downloads && `${resource.downloads} downloads`}
                      {resource.views && `${resource.views} views`}
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-nature">
                    <Download size={16} className="mr-2" />
                    {resource.type === 'Video' || resource.type === 'Video Series' ? 'Watch' : 'Download'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
            All Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.filter(r => !r.featured).map((resource, index) => (
              <Card 
                key={index} 
                className="card-hover shadow-organic border-0 hero-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {resource.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <resource.icon size={14} />
                      <span className="text-xs">{resource.type}</span>
                    </div>
                  </div>
                  <CardTitle className="font-heading text-lg text-foreground line-clamp-2">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>
                      {resource.size && resource.size}
                      {resource.duration && resource.duration}
                    </span>
                    <span>
                      {resource.downloads && `${resource.downloads} ↓`}
                      {resource.views && `${resource.views} views`}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download size={14} className="mr-2" />
                    {resource.type.includes('Video') ? 'Watch' : 'Download'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Techniques & Guides */}
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
            Techniques & Quick Guides
          </h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="multiple" className="space-y-4">
              {techniques.map((technique, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card rounded-lg border-0 shadow-organic px-6 hero-fade-in"
                  style={{animationDelay: `${index * 0.15}s`}}
                >
                  <AccordionTrigger className="font-heading text-lg text-foreground hover:text-primary">
                    {technique.title}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {technique.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth cursor-pointer"
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

export default Resources;