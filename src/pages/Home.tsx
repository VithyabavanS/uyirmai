import React from 'react';
import { ArrowRight, Leaf, Users, BookOpen, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description: "Learn permaculture techniques for sustainable agriculture and environmental stewardship.",
    },
    {
      icon: Users,
      title: "Community Workshops", 
      description: "Join hands-on workshops and connect with like-minded individuals passionate about organic living.",
    },
    {
      icon: BookOpen,
      title: "Educational Resources",
      description: "Access comprehensive guides, videos, and materials for your permaculture journey.",
    },
    {
      icon: ShoppingBag,
      title: "Organic Products",
      description: "Discover our range of organic seeds, tools, and eco-friendly products.",
    },
  ];

  const latestPosts = [
    {
      title: "Starting Your First Permaculture Garden",
      excerpt: "A comprehensive guide to designing and implementing your first sustainable garden space.",
      date: "March 15, 2024",
      image: "/placeholder.svg"
    },
    {
      title: "Companion Planting Workshop Results", 
      excerpt: "Amazing outcomes from our recent workshop on companion planting techniques.",
      date: "March 10, 2024",
      image: "/placeholder.svg"
    },
    {
      title: "Organic Pest Management Techniques",
      excerpt: "Natural methods to protect your crops without harmful chemicals.",
      date: "March 8, 2024", 
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center hero-zoom"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 hero-fade-in">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 hero-fade-in" style={{animationDelay: '0.3s'}}>
            {t('heroSubtitle')}
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-smooth hero-fade-in"
            style={{animationDelay: '0.6s'}}
            asChild
          >
            <Link to="/philosophy">
              {t('heroButton')}
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-organic">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Our Mission in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how we're building sustainable communities through education, 
              practice, and shared knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="card-hover bg-card border-0 shadow-organic text-center group"
              >
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-nature rounded-full flex items-center justify-center mb-4 organic-float group-hover:scale-110 transition-smooth">
                    <feature.icon size={24} className="text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-heading text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              {t('latestUpdates')}
            </h2>
            <Button variant="outline" asChild>
              <Link to="/blog">View All Posts</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <Card key={index} className="card-hover overflow-hidden">
                <div className="h-48 bg-muted">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-heading text-lg line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <Button variant="outline" size="sm">
                    {t('readMore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-nature text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community of sustainable living enthusiasts and begin your 
            permaculture journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8"
              asChild
            >
              <Link to="/get-involved">{t('getStarted')}</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;