import React from 'react';
import { Users, BookOpen, Heart, Briefcase, Calendar, Mail, Leaf, HandHeart, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';
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

  const pageData = data?.get_involved;

  const opportunityIcons = {
    "Community Volunteer": Users,
    "Workshop Assistant": BookOpen,
    "Mentorship Program": Heart,
    "Professional Services": Briefcase,
    "New Opportunity": Briefcase,
  };

  // Add loading state if data is not available
  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-48 translate-y-48" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-6 hero-fade-in">
            <HandHeart size={16} className="mr-2 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Join Our Community</span>
          </div>
          
          <h1 data-tina-field="title" className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            {pageData.title}
          </h1>
          <p data-tina-field="subtitle" className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            {pageData.subtitle}
          </p>
        </div>

        {/* Volunteer Opportunities */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
              <Users size={16} className="mr-2 text-purple-600" />
              <span className="text-purple-700 font-medium">Volunteer Opportunities</span>
            </div>
            <h2 data-tina-field="volunteerOpportunitiesTitle" className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {pageData.volunteerOpportunitiesTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Make a meaningful impact in your community while learning new skills and connecting with like-minded individuals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pageData.volunteerOpportunities?.map((opportunity, index) => {
              const Icon = opportunityIcons[opportunity.title];
              return (
              <Card 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`volunteerOpportunities.${index}`}
              >
                {/* Card background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                        <Icon size={24} className="text-white" />
                      </div>
                      <div className="absolute inset-0 w-16 h-16 bg-purple-400 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    </div>
                    <div className="text-right">
                      <Badge data-tina-field={`volunteerOpportunities.${index}.type`} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                        {opportunity.type}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle data-tina-field={`volunteerOpportunities.${index}.title`} className="font-heading text-xl text-foreground group-hover:text-purple-700 transition-colors duration-300">
                    {opportunity.title}
                  </CardTitle>
                  <CardDescription data-tina-field={`volunteerOpportunities.${index}.description`} className="text-muted-foreground leading-relaxed">
                    {opportunity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-foreground">Time Commitment: </span>
                    <span data-tina-field={`volunteerOpportunities.${index}.commitment`} className="text-emerald-600 font-medium">{opportunity.commitment}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center">
                      <CheckCircle size={16} className="mr-2 text-emerald-600" />
                      What you'll gain:
                    </h4>
                    <div className="text-sm text-muted-foreground" data-tina-field={`volunteerOpportunities.${index}.benefitsText`}>
                      {opportunity.benefitsText}
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                    Apply Now
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            )})}
          </div>
        </div>

        {/* Courses & Training */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <GraduationCap size={16} className="mr-2 text-blue-600" />
              <span className="text-blue-700 font-medium">Learning & Development</span>
            </div>
            <h2 data-tina-field="coursesTitle" className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {pageData.coursesTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deepen your knowledge and skills with our comprehensive training programs designed for all experience levels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pageData.courses?.map((course, index) => (
              <Card 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative overflow-hidden hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`courses.${index}`}
              >
                {/* Course highlight bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
                
                {/* Card background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Badge data-tina-field={`courses.${index}.level`} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-0">
                      {course.level}
                    </Badge>
                    <span data-tina-field={`courses.${index}.price`} className="text-xl font-bold text-emerald-600">{course.price}</span>
                  </div>
                  <CardTitle data-tina-field={`courses.${index}.title`} className="font-heading text-xl text-foreground group-hover:text-blue-700 transition-colors duration-300">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} className="text-orange-600" />
                        <span data-tina-field={`courses.${index}.duration`}>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span data-tina-field={`courses.${index}.format`}>{course.format}</span>
                      </div>
                    </div>
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <div data-tina-field={`courses.${index}.nextSession`} className="text-xs font-medium text-emerald-700">
                        Next session: {course.nextSession}
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center">
                      <BookOpen size={16} className="mr-2 text-blue-600" />
                      Course Highlights:
                    </h4>
                    <ul className="space-y-2">
                      {course.highlights?.map((highlight, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start" data-tina-field={`courses.${index}.highlights.${i}`}>
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-700 transition-all duration-300">
                    Learn More & Enroll
                    <ArrowRight className="ml-2" size={14} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Get Started */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
              <ArrowRight size={16} className="mr-2 text-green-600" />
              <span className="text-green-700 font-medium">Getting Started</span>
            </div>
            <h2 data-tina-field="howToGetStartedTitle" className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {pageData.howToGetStartedTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to begin your journey with our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pageData.steps?.map((step, index) => (
              <div 
                key={index} 
                className="text-center hero-fade-in group"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`steps.${index}`}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/25 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    <span data-tina-field={`steps.${index}.number`} className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 mx-auto bg-emerald-400 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  
                  {/* Connection line (except for last item) */}
                  {index < (pageData.steps?.length || 0) - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-transparent" />
                  )}
                </div>
                <h3 data-tina-field={`steps.${index}.title`} className="font-heading text-lg font-semibold text-foreground mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                  {step.title}
                </h3>
                <p data-tina-field={`steps.${index}.description`} className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl hero-fade-in relative overflow-hidden">
            {/* Form highlight bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-600" />
            
            <CardHeader className="text-center relative z-10">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Mail size={24} className="text-white" />
              </div>
              <CardTitle data-tina-field="contactFormTitle" className="font-heading text-2xl text-foreground mb-2">
                {pageData.contactFormTitle}
              </CardTitle>
              <CardDescription data-tina-field="contactFormDescription" className="leading-relaxed">
                {pageData.contactFormDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Full Name *
                  </label>
                  <Input 
                    placeholder="Your full name" 
                    className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email Address *
                  </label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com"
                    className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Phone Number
                </label>
                <Input 
                  placeholder="+91 98765 43210"
                  className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 transition-all duration-300"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Interest Area *
                </label>
                <Input 
                  placeholder="e.g., Volunteering, Permaculture Course, Workshop Assistant"
                  className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 transition-all duration-300"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Tell us about yourself
                </label>
                <Textarea 
                  placeholder="Share your background, interests, and what motivates you to get involved with sustainable living..."
                  rows={4}
                  className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 transition-all duration-300"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-lg py-4 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
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
      try {
        const res = await client.queries.get_involved({
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
          <p className="text-gray-600 font-medium">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  return <GetInvolved {...props} />;
}

export default GetInvolvedPage;