import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Tag, Leaf, BookOpen, ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTina } from 'tinacms/dist/react';
import client from '../../tina/__generated__/client';

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const Blog = (props) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const pageData = data.blog;
  const categories = ['All', ...new Set(pageData.blogPosts.map(post => post.category))];

  const filteredPosts = pageData.blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = pageData.blogPosts.find(post => post.featured);
  const featuredIndex = pageData.blogPosts.findIndex(p => p.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-48 translate-y-48" />
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-6 hero-fade-in">
            <BookOpen size={16} className="mr-2 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Knowledge Hub</span>
          </div>
          
          <h1 data-tina-field="title" className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            {pageData.title}
          </h1>
          <p data-tina-field="subtitle" className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            {pageData.subtitle}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border-gray-200 rounded-xl shadow-sm focus:shadow-md focus:border-emerald-300 transition-all duration-300"
              />
            </div>
            
            {/* Filter Section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter size={16} />
                <span className="font-medium">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`text-xs px-4 py-2 rounded-full transition-all duration-300 ${
                        selectedCategory === category 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md' 
                          : 'bg-white/80 backdrop-blur-sm hover:bg-emerald-50 hover:border-emerald-200 text-gray-700'
                      }`}
                    >
                      {category === 'All' ? t('allCategories') : category}
                    </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'All' && (
          <Card 
            className="mb-16 overflow-hidden shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hero-fade-in group"
            data-tina-field={`blogPosts.${featuredIndex}`}
          >
            <div className="md:flex">
              <div className="md:w-1/2 h-80 md:h-auto relative overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  data-tina-field={`blogPosts.${featuredIndex}.image`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="md:w-1/2 p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 font-medium">
                    ⭐ Featured
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200" data-tina-field={`blogPosts.${featuredIndex}.category`}>
                    {featuredPost.category}
                  </Badge>
                </div>
                
                <CardTitle data-tina-field={`blogPosts.${featuredIndex}.title`} className="text-2xl md:text-3xl font-heading text-foreground mb-4 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
                  {featuredPost.title}
                </CardTitle>
                <CardDescription data-tina-field={`blogPosts.${featuredIndex}.excerpt`} className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed text-base">
                  {featuredPost.excerpt}
                </CardDescription>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={14} className="text-blue-600" />
                    </div>
                    <span data-tina-field={`blogPosts.${featuredIndex}.author`} className="font-medium">{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar size={14} className="text-green-600" />
                    </div>
                    <span data-tina-field={`blogPosts.${featuredIndex}.date`}>{featuredPost.date}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <span data-tina-field={`blogPosts.${featuredIndex}.readTime`}>{featuredPost.readTime}</span>
                  </Badge>
                </div>
                
                <Link to={`/blog/post/${generateSlug(featuredPost.title)}`}>
                  <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 group">
                    {t('readMore')}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-tina-field="blogPosts">
          {regularPosts.map((post, index) => {
            const originalIndex = pageData.blogPosts.findIndex(p => p === post);
            return (
            <Card 
              key={index} 
              className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl overflow-hidden h-full transition-all duration-500 hover:-translate-y-2 hover:scale-105 hero-fade-in relative"
              style={{animationDelay: `${index * 0.1}s`}}
              data-tina-field={`blogPosts.${originalIndex}`}
            >
              {/* Card background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="h-48 bg-gradient-to-br from-emerald-100 to-green-100 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  data-tina-field={`blogPosts.${originalIndex}.image`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Read time badge */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                  <span data-tina-field={`blogPosts.${originalIndex}.readTime`}>{post.readTime}</span>
                </div>
              </div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                    <Tag size={12} className="mr-1" />
                    <span data-tina-field={`blogPosts.${originalIndex}.category`}>{post.category}</span>
                  </Badge>
                </div>
                <CardTitle data-tina-field={`blogPosts.${originalIndex}.title`} className="font-heading text-lg line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
                  {post.title}
                </CardTitle>
                <CardDescription data-tina-field={`blogPosts.${originalIndex}.excerpt`} className="line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={12} className="text-blue-600" />
                    </div>
                    <span data-tina-field={`blogPosts.${originalIndex}.author`} className="text-xs">{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar size={12} className="text-green-600" />
                    </div>
                    <span data-tina-field={`blogPosts.${originalIndex}.date`} className="text-xs">{post.date}</span>
                  </div>
                </div>
                <Link to={`/blog/post/${generateSlug(post.title)}`} className="block">
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-700 transition-all duration-300">
                    {t('readMore')}
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
          })}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
              No articles found matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
              className="px-6 py-2 hover:bg-emerald-50 hover:border-emerald-200 transition-colors duration-300"
            >
              <ArrowRight className="mr-2" size={16} />
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const BlogPage = () => {
  const { language } = useLanguage();
  const [props, setProps] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.blog({
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
          <p className="text-gray-600 font-medium">Loading articles...</p>
        </div>
      </div>
    );
  }

  return <Blog {...props} />;
}

export default BlogPage;