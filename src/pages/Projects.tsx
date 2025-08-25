import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();
  
  const projects = [
    {
      title: t('communityGarden'),
      description: t('communityGardenDesc'),
      status: "ongoing",
      location: "Chennai, Tamil Nadu",
      participants: 45,
      startDate: "January 2024",
      category: "Community Development"
    },
    {
      title: t('organicTraining'), 
      description: t('organicTrainingDesc'),
      status: "completed",
      location: "Coimbatore, Tamil Nadu", 
      participants: 120,
      startDate: "September 2023",
      category: "Education"
    },
    {
      title: t('seedLibrary'),
      description: t('seedLibraryDesc'),
      status: "upcoming",
      location: "Multiple locations",
      participants: 30,
      startDate: "May 2024",
      category: "Conservation"
    }
  ];

  const upcomingEvents = [
    {
      title: "Permaculture Design Course",
      date: "April 15-17, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Uyirmai Learning Center",
      type: "Workshop",
      spots: 20
    },
    {
      title: "Composting & Soil Health Workshop",
      date: "April 22, 2024",
      time: "2:00 PM - 6:00 PM", 
      location: "Online & On-site",
      type: "Hybrid Event",
      spots: 50
    },
    {
      title: "Sustainable Living Fair",
      date: "May 5-6, 2024",
      time: "10:00 AM - 7:00 PM",
      location: "Green Valley Exhibition Center",
      type: "Fair",
      spots: 200
    }
  ];

  const getStatusColor = (status: string) => {
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
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            {t('projectsTitle')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            {t('projectsSubtitle')}
          </p>
        </div>

        {/* Projects Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
            {t('currentProjects')}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="card-hover shadow-organic border-0 h-full hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
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
                  <CardTitle className="text-xl font-heading text-foreground line-clamp-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users size={16} />
                    <span>{project.participants} {t('participants')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
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
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
            {t('upcomingEvents')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card 
                key={index} 
                className="card-hover shadow-nature border-0 hero-fade-in"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {event.spots} {t('spotsAvailable')}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-heading text-foreground line-clamp-2">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
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

export default Projects;