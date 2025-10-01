import React from 'react';
import { ArrowRight, Leaf, Users, BookOpen, ShoppingBag, Sparkles, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import heroImage from '@/assets/hero-image.jpg';
import { useTina } from 'tinacms/dist/react';
import client from '../../tina/__generated__/client';

const Home = (props) => {
  const { t } = useLanguage();
  const { language } = useLanguage();
  const [blogData, setBlogData] = React.useState(null);

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const homeData = data?.home;

  if (!homeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  React.useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await client.queries.blog({
          relativePath: `${language}.json`,
        });
        setBlogData(res.data.blog);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
    fetchBlogData();
  }, [language]);

  const featureIcons = {
    "Sustainable Practices": Leaf,
    "Community Workshops": Users,
    "Educational Resources": BookOpen,
    "Organic Products": ShoppingBag,
    "New Feature": Sparkles,
  };

  const features = (homeData.features || []).map((feature) => ({
    ...feature,
    icon: featureIcons[feature.title] || Sparkles,
  }));

  const latestPosts = blogData?.blogPosts
    ?.sort((a, b) => new Date(b.date) - new Date(a.date))
    ?.slice(0, 3) || [];

  return (
    <div className="space-y-0 overflow-hidden">
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
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-36 -translate-y-36" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-36 translate-y-36" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            {/* Section badge */}
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-6">
              <Leaf size={16} className="mr-2 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Our Core Values</span>
            </div>
            
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
                className="group bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl text-center transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden"
                data-tina-field={`features.${index}`}
              >
                {/* Card background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-emerald-500/25 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                      <feature.icon size={24} className="text-white" />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-16 h-16 mx-auto bg-emerald-400 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  </div>
                  <CardTitle data-tina-field="title" className="text-xl font-heading text-foreground group-hover:text-emerald-700 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
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
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-4">
                <BookOpen size={16} className="mr-2 text-gray-600" />
                <span className="text-gray-700 font-medium">Latest Insights</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                {t('latestUpdates')}
              </h2>
            </div>
            <Button variant="outline" className="hover:bg-emerald-50 hover:border-emerald-200 transition-colors duration-300" asChild>
              <Link to="/blog">
                View All Posts
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogData ? latestPosts.map((post, index) => {
              const generateSlug = (title) => {
                return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              };
              
              return (
                <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
                  <div className="h-48 bg-gradient-to-br from-emerald-100 to-green-100 overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar size={14} />
                      <CardDescription className="text-sm text-muted-foreground">
                        {post.date}
                      </CardDescription>
                    </div>
                    <CardTitle className="font-heading text-lg line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <Link to={`/blog/post/${generateSlug(post.title)}`}>
                      <Button variant="outline" size="sm" className="group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors duration-300">
                        {t('readMore')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            }) : (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 text-primary-foreground relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full" />
          <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full" />
          <div className="absolute bottom-20 left-1/3 w-24 h-24 border border-white/20 rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <Sparkles size={18} className="mr-2" />
            <span className="font-medium">Join Our Growing Community</span>
          </div>
          
          <h2 data-tina-field="cta.title" className="text-3xl md:text-4xl font-heading font-bold mb-6">
            {homeData.cta.title}
          </h2>
          <p data-tina-field="cta.subtitle" className="text-lg mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            {homeData.cta.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="group bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              asChild
            >
              <Link to="/get-involved">
                <span>{t('getStarted')}</span>
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-3 rounded-full border-2 border-white/30 text-black hover:bg-white hover:text-emerald-700 backdrop-blur-sm transition-all duration-300 hover:scale-105"
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
      try {
        const res = await client.queries.home({
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
          <p className="text-gray-600 font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return <Home {...props} />;
}

export default HomePage;