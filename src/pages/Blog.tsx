import React, { useState } from 'react';
import { Search, Calendar, User, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const Blog = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Permaculture', 'Organic Farming', 'Workshops', 'Community', 'Sustainability'];

  const blogPosts = [
    {
      title: "Starting Your First Permaculture Garden: A Complete Guide",
      excerpt: "Learn the fundamental principles of permaculture design and how to apply them in your own backyard. This comprehensive guide covers everything from soil preparation to plant selection.",
      author: "Priya Sharma",
      date: "March 15, 2024",
      category: "Permaculture",
      readTime: "8 min read",
      image: "/placeholder.svg",
      featured: true
    },
    {
      title: "Traditional Tamil Farming Meets Modern Sustainability",
      excerpt: "Exploring how ancient Tamil agricultural practices align perfectly with modern sustainable farming principles. A journey through time and technique.",
      author: "Rajesh Kumar", 
      date: "March 12, 2024",
      category: "Organic Farming",
      readTime: "6 min read",
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Community Workshop Highlights: Companion Planting Success Stories",
      excerpt: "Amazing results from our recent workshop where participants learned the art of companion planting. See the incredible transformations in their gardens.",
      author: "Meera Krishnan",
      date: "March 10, 2024", 
      category: "Workshops",
      readTime: "5 min read",
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Natural Pest Management: Chemical-Free Solutions",
      excerpt: "Discover effective organic methods to protect your crops from pests without harming the environment or beneficial insects.",
      author: "Arjun Nair",
      date: "March 8, 2024",
      category: "Organic Farming", 
      readTime: "7 min read",
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Building Resilient Communities Through Seed Sharing",
      excerpt: "How our seed library project is preserving biodiversity and strengthening community bonds across Tamil Nadu villages.",
      author: "Lakshmi Devi",
      date: "March 5, 2024",
      category: "Community",
      readTime: "4 min read", 
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Water Harvesting Techniques for Small Farms",
      excerpt: "Practical methods for collecting and conserving water on small-scale farms, reducing dependency and increasing sustainability.",
      author: "Venkat Raman",
      date: "March 3, 2024",
      category: "Sustainability",
      readTime: "6 min read",
      image: "/placeholder.svg",
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-organic">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            {t('blogTitle')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            {t('blogSubtitle')}
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
          <Card className="mb-12 overflow-hidden shadow-nature border-0 hero-fade-in">
            <div className="md:flex">
              <div className="md:w-1/2 h-64 md:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-accent text-white">Featured</Badge>
                  <Badge variant="outline">{featuredPost.category}</Badge>
                </div>
                <CardTitle className="text-2xl font-heading text-foreground mb-4 line-clamp-2">
                  {featuredPost.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                  {featuredPost.excerpt}
                </CardDescription>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{featuredPost.date}</span>
                  </div>
                  <span>{featuredPost.readTime}</span>
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
            >
              <div className="h-48 bg-muted">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    <Tag size={12} className="mr-1" />
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="font-heading text-lg line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
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

export default Blog;