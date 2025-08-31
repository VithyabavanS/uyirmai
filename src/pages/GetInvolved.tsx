import React from 'react';
import { Users, BookOpen, Heart, Briefcase, Calendar, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTina } from 'tinacms/dist/react';
import client from '../../tina/__generated__/client';

const GetInvolved = (props) => {
  const { t } = useLanguage();

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const pageData = data.get_involved;

  const opportunityIcons = {
    "Community Volunteer": Users,
    "Workshop Assistant": BookOpen,
    "Mentorship Program": Heart,
    "Professional Services": Briefcase,
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

        {/* Volunteer Opportunities */}
        <div className="mb-20">
          <h2 data-tina-field="volunteerOpportunitiesTitle" className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            {pageData.volunteerOpportunitiesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pageData.opportunities.map((opportunity, index) => {
              const Icon = opportunityIcons[opportunity.title];
              return (
              <Card 
                key={index} 
                className="card-hover shadow-organic border-0 hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`opportunities.${index}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-nature rounded-full flex items-center justify-center organic-float">
                      <Icon size={20} className="text-primary-foreground" />
                    </div>
                    <div className="text-right">
                      <Badge data-tina-field="type" variant="outline" className="text-xs">
                        {opportunity.type}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle data-tina-field="title" className="font-heading text-xl text-foreground">
                    {opportunity.title}
                  </CardTitle>
                  <CardDescription data-tina-field="description" className="text-muted-foreground">
                    {opportunity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Time Commitment: </span>
                    <span data-tina-field="commitment" className="text-muted-foreground">{opportunity.commitment}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">What you'll gain:</h4>
                    <ul className="space-y-1">
                      {opportunity.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center" data-tina-field={`benefits.${i}`}>
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-gradient-nature">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            )})}
          </div>
        </div>

        {/* Courses & Training */}
        <div className="mb-20">
          <h2 data-tina-field="coursesTitle" className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            {pageData.coursesTitle}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pageData.courses.map((course, index) => (
              <Card 
                key={index} 
                className="card-hover shadow-nature border-0 hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`courses.${index}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge data-tina-field="level" className="bg-secondary text-secondary-foreground">
                      {course.level}
                    </Badge>
                    <span data-tina-field="price" className="text-lg font-bold text-primary">{course.price}</span>
                  </div>
                  <CardTitle data-tina-field="title" className="font-heading text-xl text-foreground">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center space-x-4 text-sm">
                      <span data-tina-field="duration">📅 {course.duration}</span>
                      <span data-tina-field="format">🎯 {course.format}</span>
                    </div>
                    <div data-tina-field="nextSession" className="text-xs">Next session: {course.nextSession}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Course Highlights:</h4>
                    <ul className="space-y-1">
                      {course.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center" data-tina-field={`highlights.${i}`}>
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full">
                    Learn More & Enroll
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Get Started */}
        <div className="mb-20">
          <h2 data-tina-field="howToGetStartedTitle" className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            {pageData.howToGetStartedTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageData.steps.map((step, index) => (
              <div 
                key={index} 
                className="text-center hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`steps.${index}`}
              >
                <div className="w-16 h-16 mx-auto bg-gradient-hero rounded-full flex items-center justify-center mb-4 organic-float">
                  <span data-tina-field="number" className="text-xl font-bold text-primary-foreground">{step.number}</span>
                </div>
                <h3 data-tina-field="title" className="font-heading text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p data-tina-field="description" className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-nature border-0 hero-fade-in">
            <CardHeader className="text-center">
              <CardTitle data-tina-field="contactFormTitle" className="font-heading text-2xl text-foreground">
                {pageData.contactFormTitle}
              </CardTitle>
              <CardDescription data-tina-field="contactFormDescription">
                {pageData.contactFormDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Full Name *
                  </label>
                  <Input placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email Address *
                  </label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Phone Number
                </label>
                <Input placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Interest Area *
                </label>
                <Input placeholder="e.g., Volunteering, Permaculture Course, Workshop Assistant" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Tell us about yourself
                </label>
                <Textarea 
                  placeholder="Share your background, interests, and what motivates you to get involved with sustainable living..."
                  rows={4}
                />
              </div>
              <Button className="w-full bg-gradient-nature text-lg py-3">
                <Mail className="mr-2" size={20} />
                Send Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const GetInvolvedPage = () => {
  const { language } = useLanguage();
  const [props, setProps] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await client.queries.get_involved({
        relativePath: `${language}.json`,
      });
      setProps(res);
    };
    fetchData();
  }, [language]);

  return props ? <GetInvolved {...props} /> : <div>Loading...</div>;
}

export default GetInvolvedPage;