import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
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
      case 'ongoing': return 'bg-accent';
      case 'completed': return 'bg-primary';
      case 'upcoming': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

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

        {/* Projects Section */}
        <div className="mb-20">
          <h2 data-tina-field="projectsTitle" className="text-3xl font-heading font-bold text-foreground mb-8">
            {pageData.projectsTitle}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {pageData.projects.map((project, index) => (
              <Card 
                key={index} 
                className="card-hover shadow-organic border-0 h-full hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`projects.${index}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`${getStatusColor(project.status)} text-white text-xs`}>
                      {t(project.status)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle data-tina-field="title" className="text-xl font-heading text-foreground line-clamp-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription data-tina-field="description" className="text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div data-tina-field="location" className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    <span>{project.location}</span>
                  </div>
                  <div data-tina-field="participants" className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users size={16} />
                    <span>{project.participants} {t('participants')}</span>
                  </div>
                  <div data-tina-field="startDate" className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    <span>{t('started')} {project.startDate}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    {t('learnMore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div>
          <h2 data-tina-field="eventsTitle" className="text-3xl font-heading font-bold text-foreground mb-8">
            {pageData.eventsTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageData.upcomingEvents.map((event, index) => (
              <Card 
                key={index} 
                className="card-hover shadow-nature border-0 hero-fade-in"
                style={{animationDelay: `${index * 0.15}s`}}
                data-tina-field={`upcomingEvents.${index}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge data-tina-field="type" variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                    <span data-tina-field="spots" className="text-xs text-muted-foreground">
                      {event.spots} {t('spotsAvailable')}
                    </span>
                  </div>
                  <CardTitle data-tina-field="title" className="text-lg font-heading text-foreground line-clamp-2">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div data-tina-field="date" className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div data-tina-field="time" className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div data-tina-field="location" className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-nature">
                    {t('registerNow')}
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
      const res = await client.queries.projects({
        relativePath: `${language}.json`,
      });
      setProps(res);
    };
    fetchData();
  }, [language]);

  return props ? <Projects {...props} /> : <div>Loading...</div>;
}

export default ProjectsPage;