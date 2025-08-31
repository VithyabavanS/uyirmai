import React from 'react';
import { ArrowRight, Leaf, Users, BookOpen, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import heroImage from '@/assets/hero-image.jpg';
import { useTina } from 'tinacms/dist/react';
import client from '../../tina/__generated__/client';

const Home = (props) => {
  const { t } = useLanguage();

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const homeData = data.home;

  const featureIcons = {
    "Sustainable Practices": Leaf,
    "Community Workshops": Users,
    "Educational Resources": BookOpen,
    "Organic Products": ShoppingBag,
  };

  const features = homeData.features.map((feature) => ({
    ...feature,
    icon: featureIcons[feature.title],
  }));

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
          <h1 data-tina-field="heroTitle" className="text-4xl md:text-6xl font-heading font-bold mb-6 hero-fade-in">
            {homeData.heroTitle}
          </h1>
          <p data-tina-field="heroSubtitle" className="text-lg md:text-xl mb-8 opacity-90 hero-fade-in" style={{animationDelay: '0.3s'}}>
            {homeData.heroSubtitle}
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-smooth hero-fade-in"
            style={{animationDelay: '0.6s'}}
            asChild
          >
            <Link to="/philosophy">
              <span data-tina-field="heroButton">{homeData.heroButton}</span>
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
            <h2 data-tina-field="featuresSection.title" className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {homeData.featuresSection.title}
            </h2>
            <p data-tina-field="featuresSection.subtitle" className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {homeData.featuresSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="card-hover bg-card border-0 shadow-organic text-center group"
                data-tina-field={`features.${index}`}
              >
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-nature rounded-full flex items-center justify-center mb-4 organic-float group-hover:scale-110 transition-smooth">
                    <feature.icon size={24} className="text-primary-foreground" />
                  </div>
                  <CardTitle data-tina-field="title" className="text-xl font-heading text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription data-tina-field="description" className="text-muted-foreground leading-relaxed">
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
          <h2 data-tina-field="cta.title" className="text-3xl md:text-4xl font-heading font-bold mb-6">
            {homeData.cta.title}
          </h2>
          <p data-tina-field="cta.subtitle" className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {homeData.cta.subtitle}
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
              className="px-8 border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary"
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

const HomePage = () => {
  const { language } = useLanguage();
  const [props, setProps] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await client.queries.home({
        relativePath: `${language}.json`,
      });
      setProps(res);
    };
    fetchData();
  }, [language]);

  return props ? <Home {...props} /> : <div>Loading...</div>;
}

export default HomePage;