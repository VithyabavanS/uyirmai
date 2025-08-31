import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTina } from 'tinacms/dist/react';
import client from '../../tina/__generated__/client';

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
  const regularPosts = filteredPosts.filter(post => !post.featured);

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

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input 
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category === 'All' ? t('allCategories') : category}
                </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'All' && (
          <Card 
            className="mb-12 overflow-hidden shadow-nature border-0 hero-fade-in"
            data-tina-field="featuredPost"
          >
            <div className="md:flex">
              <div className="md:w-1/2 h-64 md:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                  data-tina-field="image"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-accent text-white">Featured</Badge>
                  <Badge variant="outline" data-tina-field="category">{featuredPost.category}</Badge>
                </div>
                <CardTitle data-tina-field="title" className="text-2xl font-heading text-foreground mb-4 line-clamp-2">
                  {featuredPost.title}
                </CardTitle>
                <CardDescription data-tina-field="excerpt" className="text-muted-foreground mb-4 line-clamp-3">
                  {featuredPost.excerpt}
                </CardDescription>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span data-tina-field="author">{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span data-tina-field="date">{featuredPost.date}</span>
                  </div>
                  <span data-tina-field="readTime">{featuredPost.readTime}</span>
                </div>
                <Button className="bg-gradient-nature">
                  {t('readMore')}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <Card 
              key={index} 
              className="card-hover shadow-organic border-0 overflow-hidden h-full hero-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
              data-tina-field={`blogPosts.${index}`}
            >
              <div className="h-48 bg-muted">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                  data-tina-field="image"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    <Tag size={12} className="mr-1" />
                    <span data-tina-field="category">{post.category}</span>
                  </Badge>
                  <span data-tina-field="readTime" className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle data-tina-field="title" className="font-heading text-lg line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription data-tina-field="excerpt" className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <User size={14} />
                    <span data-tina-field="author">{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span data-tina-field="date">{post.date}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  {t('readMore')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles found matching your search criteria.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
              className="mt-4"
            >
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
      const res = await client.queries.blog({
        relativePath: `${language}.json`,
      });
      setProps(res);
    };
    fetchData();
  }, [language]);

  return props ? <Blog {...props} /> : <div>Loading...</div>;
}

export default BlogPage;