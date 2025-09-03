import React from 'react';
import { Calendar, MapPin, Users, Clock, Leaf, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTina } from 'tinacms/dist/react';
import client from '../../tina/__generated__/client';

const Projects = (props) => {
  const { t } = useLanguage();

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const pageData = data.projects;
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ongoing': return '🚀';
      case 'completed': return '✅';
      case 'upcoming': return '📅';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-48 translate-y-48" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-6 hero-fade-in">
            <Leaf size={16} className="mr-2 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Our Impact</span>
          </div>
          
          <h1 data-tina-field="title" className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            {pageData.title}
          </h1>
          <p data-tina-field="subtitle" className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            {pageData.subtitle}
          </p>
        </div>

        {/* Projects Section */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-4">
                <Sparkles size={16} className="mr-2 text-gray-600" />
                <span className="text-gray-700 font-medium">Active Projects</span>
              </div>
              <h2 data-tina-field="projectsTitle" className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                {pageData.projectsTitle}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {pageData.projects.map((project, index) => (
              <Card 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl h-full transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`projects.${index}`}
              >
                {/* Card background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={`${getStatusColor(project.status)} text-xs font-medium border px-3 py-1`}>
                      <span className="mr-1">{getStatusIcon(project.status)}</span>
                      {t(project.status)}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700 bg-emerald-50">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <CardTitle data-tina-field="title" className="text-xl font-heading text-foreground line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300 mb-3">
                    {project.title}
                  </CardTitle>
                  <CardDescription data-tina-field="description" className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4 relative z-10">
                  <div className="space-y-3">
                    <div data-tina-field="location" className="flex items-center space-x-3 text-sm text-muted-foreground group-hover:text-emerald-600 transition-colors duration-300">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                        <MapPin size={14} className="text-emerald-600" />
                      </div>
                      <span>{project.location}</span>
                    </div>
                    
                    <div data-tina-field="participants" className="flex items-center space-x-3 text-sm text-muted-foreground group-hover:text-emerald-600 transition-colors duration-300">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                        <Users size={14} className="text-blue-600" />
                      </div>
                      <span>{project.participants} {t('participants')}</span>
                    </div>
                    
                    <div data-tina-field="startDate" className="flex items-center space-x-3 text-sm text-muted-foreground group-hover:text-emerald-600 transition-colors duration-300">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                        <Calendar size={14} className="text-orange-600" />
                      </div>
                      <span>{t('started')} {project.startDate}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-6 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-700 transition-all duration-300">
                    {t('learnMore')}
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div>
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-4">
                <Calendar size={16} className="mr-2 text-blue-600" />
                <span className="text-blue-700 font-medium">Coming Soon</span>
              </div>
              <h2 data-tina-field="eventsTitle" className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                {pageData.eventsTitle}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.upcomingEvents.map((event, index) => (
              <Card 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden hero-fade-in"
                style={{animationDelay: `${index * 0.15}s`}}
                data-tina-field={`upcomingEvents.${index}`}
              >
                {/* Card background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Event highlight bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
                
                <CardHeader className="pb-3 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Badge data-tina-field="type" variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {event.type}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span data-tina-field="spots" className="text-xs text-green-700 font-medium">
                        {event.spots} {t('spotsAvailable')}
                      </span>
                    </div>
                  </div>
                  
                  <CardTitle data-tina-field="title" className="text-lg font-heading text-foreground line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4 relative z-10">
                  <div className="space-y-3">
                    <div data-tina-field="date" className="flex items-center space-x-3 text-sm text-muted-foreground group-hover:text-blue-600 transition-colors duration-300">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                        <Calendar size={14} className="text-purple-600" />
                      </div>
                      <span className="font-medium">{event.date}</span>
                    </div>
                    
                    <div data-tina-field="time" className="flex items-center space-x-3 text-sm text-muted-foreground group-hover:text-blue-600 transition-colors duration-300">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                        <Clock size={14} className="text-orange-600" />
                      </div>
                      <span>{event.time}</span>
                    </div>
                    
                    <div data-tina-field="location" className="flex items-center space-x-3 text-sm text-muted-foreground group-hover:text-blue-600 transition-colors duration-300">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                        <MapPin size={14} className="text-emerald-600" />
                      </div>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                    {t('registerNow')}
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const { language } = useLanguage();
  const [props, setProps] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.projects({
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
          <p className="text-gray-600 font-medium">Loading projects...</p>
        </div>
      </div>
    );
  }

  return <Projects {...props} />;
}

export default ProjectsPage;