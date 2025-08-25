import React from 'react';
import { Users, BookOpen, Heart, Briefcase, Calendar, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const GetInvolved = () => {
  const opportunities = [
    {
      icon: Users,
      title: "Community Volunteer",
      description: "Join our community garden projects and help establish sustainable food systems in local neighborhoods.",
      commitment: "4-8 hours/week",
      type: "Ongoing",
      benefits: ["Learn hands-on skills", "Connect with community", "Make real impact"]
    },
    {
      icon: BookOpen,
      title: "Workshop Assistant",
      description: "Support our educational workshops by helping participants learn permaculture and organic farming techniques.",
      commitment: "Weekend workshops",
      type: "Flexible",
      benefits: ["Teaching experience", "Skill development", "Event coordination"]
    },
    {
      icon: Heart,
      title: "Mentorship Program",
      description: "Guide newcomers in their sustainable living journey and share your knowledge and experience.",
      commitment: "2-3 hours/week",
      type: "Long-term",
      benefits: ["Leadership skills", "Personal growth", "Community building"]
    },
    {
      icon: Briefcase,
      title: "Professional Services",
      description: "Contribute your professional skills in areas like design, marketing, technology, or administration.",
      commitment: "Project-based",
      type: "Flexible",
      benefits: ["Portfolio building", "Networking", "Social impact"]
    }
  ];

  const courses = [
    {
      title: "Permaculture Design Certification",
      duration: "12 weeks",
      format: "Hybrid (Online + Field)",
      level: "Beginner to Advanced",
      nextSession: "May 15, 2024",
      price: "₹25,000",
      highlights: [
        "72-hour certified course",
        "Hands-on design projects", 
        "Site visits to working farms",
        "International certification"
      ]
    },
    {
      title: "Organic Farming Intensive",
      duration: "6 weeks", 
      format: "On-site practical",
      level: "All levels",
      nextSession: "April 20, 2024",
      price: "₹18,000",
      highlights: [
        "Soil health management",
        "Natural pest control",
        "Crop rotation planning",
        "Marketing organic produce"
      ]
    },
    {
      title: "Sustainable Living Workshop",
      duration: "3 days",
      format: "Weekend intensive", 
      level: "Beginner",
      nextSession: "April 5-7, 2024",
      price: "₹5,000",
      highlights: [
        "Home composting systems",
        "Water conservation",
        "Energy efficiency",
        "Zero-waste practices"
      ]
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Explore Opportunities",
      description: "Browse our volunteer roles and courses to find what matches your interests and availability."
    },
    {
      number: "02", 
      title: "Submit Application",
      description: "Fill out our application form with your details, interests, and preferred involvement level."
    },
    {
      number: "03",
      title: "Connect & Orient",
      description: "Attend an orientation session to meet the team and understand your role better."
    },
    {
      number: "04",
      title: "Start Making Impact", 
      description: "Begin your journey with us and start contributing to sustainable community development."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-organic">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            Get Involved
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            Join our mission to create sustainable communities. Whether through volunteering, 
            learning, or sharing your skills, there's a place for you in the Uyirmai family.
          </p>
        </div>

        {/* Volunteer Opportunities */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            Volunteer Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <Card 
                key={index} 
                className="card-hover shadow-organic border-0 hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-nature rounded-full flex items-center justify-center organic-float">
                      <opportunity.icon size={20} className="text-primary-foreground" />
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {opportunity.type}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="font-heading text-xl text-foreground">
                    {opportunity.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {opportunity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Time Commitment: </span>
                    <span className="text-muted-foreground">{opportunity.commitment}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">What you'll gain:</h4>
                    <ul className="space-y-1">
                      {opportunity.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center">
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
            ))}
          </div>
        </div>

        {/* Courses & Training */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            Courses & Training Programs
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card 
                key={index} 
                className="card-hover shadow-nature border-0 hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-secondary text-secondary-foreground">
                      {course.level}
                    </Badge>
                    <span className="text-lg font-bold text-primary">{course.price}</span>
                  </div>
                  <CardTitle className="font-heading text-xl text-foreground">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center space-x-4 text-sm">
                      <span>📅 {course.duration}</span>
                      <span>🎯 {course.format}</span>
                    </div>
                    <div className="text-xs">Next session: {course.nextSession}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Course Highlights:</h4>
                    <ul className="space-y-1">
                      {course.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center">
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
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            How to Get Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="text-center hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="w-16 h-16 mx-auto bg-gradient-hero rounded-full flex items-center justify-center mb-4 organic-float">
                  <span className="text-xl font-bold text-primary-foreground">{step.number}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
              <CardTitle className="font-heading text-2xl text-foreground">
                Ready to Join Us?
              </CardTitle>
              <CardDescription>
                Fill out this form and we'll get back to you within 24 hours to discuss 
                how you can get involved with Uyirmai.
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

export default GetInvolved;