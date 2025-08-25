import React from 'react';
import { Heart, Target, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Philosophy = () => {
  return (
    <div className="min-h-screen bg-gradient-organic">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            Uyirmai Philosophy
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            Our foundation is built on the belief that sustainable living and harmony with nature 
            are not just choices, but necessities for our planet's future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="card-hover shadow-organic border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-nature rounded-full flex items-center justify-center mb-4 organic-float">
                <Heart size={24} className="text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-heading text-foreground">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground leading-relaxed">
                To empower individuals and communities with the knowledge and tools needed 
                to practice sustainable agriculture and permaculture, fostering a deeper 
                connection with the earth and promoting ecological regeneration.
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover shadow-organic border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-earth rounded-full flex items-center justify-center mb-4 organic-float" style={{animationDelay: '0.5s'}}>
                <Eye size={24} className="text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-heading text-foreground">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground leading-relaxed">
                A world where every community thrives through sustainable practices, 
                where food systems are regenerative, and where the relationship between 
                humans and nature is one of mutual respect and benefit.
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover shadow-organic border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-hero rounded-full flex items-center justify-center mb-4 organic-float" style={{animationDelay: '1s'}}>
                <Target size={24} className="text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-heading text-foreground">Our Purpose</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground leading-relaxed">
                To bridge the gap between traditional wisdom and modern sustainable 
                practices, creating educational pathways that lead to practical, 
                actionable change in how we grow food and care for our environment.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-12">
            Our Core Values
          </h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Ecological Harmony",
                description: "We believe in working with nature's systems rather than against them, creating regenerative practices that heal the earth while providing abundance."
              },
              {
                title: "Community Empowerment", 
                description: "Every individual has the power to create positive change. We focus on education and skill-sharing to build resilient, self-sufficient communities."
              },
              {
                title: "Traditional Wisdom",
                description: "We honor and integrate time-tested agricultural practices with innovative sustainable techniques, respecting the knowledge of our ancestors."
              },
              {
                title: "Accessibility & Inclusion",
                description: "Sustainable living should be available to everyone. We strive to make our resources, workshops, and knowledge accessible to all communities."
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg p-8 shadow-nature border border-border/50 hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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

export default Philosophy;