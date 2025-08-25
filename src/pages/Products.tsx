import React, { useState } from 'react';
import { ShoppingCart, Star, Filter, Search, Package, Leaf, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const Products = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Seeds', 'Tools', 'Fertilizers', 'Pest Control', 'Books', 'Kits'];

  const products = [
    {
      id: 1,
      name: "Organic Heirloom Tomato Seeds Collection",
      price: 450,
      originalPrice: 550,
      image: "/placeholder.svg",
      category: "Seeds",
      rating: 4.8,
      reviews: 124,
      inStock: true,
      featured: true,
      organic: true,
      description: "Premium collection of 5 heirloom tomato varieties, perfect for organic gardening.",
      features: ["Non-GMO", "Organic certified", "High germination rate", "Tamil Nadu adapted"]
    },
    {
      id: 2,
      name: "Bamboo Garden Tool Set",
      price: 1200,
      originalPrice: 1500,
      image: "/placeholder.svg",
      category: "Tools", 
      rating: 4.6,
      reviews: 89,
      inStock: true,
      featured: false,
      organic: false,
      description: "Sustainable bamboo handles with durable steel heads. Perfect for organic gardening.",
      features: ["Eco-friendly", "Ergonomic design", "Rust resistant", "Includes 5 tools"]
    },
    {
      id: 3,
      name: "Vermicompost Premium Grade",
      price: 320,
      originalPrice: 400,
      image: "/placeholder.svg",
      category: "Fertilizers",
      rating: 4.9,
      reviews: 267,
      inStock: true,
      featured: true,
      organic: true,
      description: "Pure earthworm castings rich in nutrients, perfect for all plants and vegetables.",
      features: ["100% organic", "Nutrient rich", "pH balanced", "5kg pack"]
    },
    {
      id: 4,
      name: "Neem Oil Natural Pesticide",
      price: 280,
      originalPrice: 350,
      image: "/placeholder.svg",
      category: "Pest Control",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      featured: false,
      organic: true,
      description: "Cold-pressed neem oil for natural pest and disease control without harmful chemicals.",
      features: ["Chemical-free", "Multi-purpose", "Biodegradable", "500ml bottle"]
    },
    {
      id: 5,
      name: "Permaculture Design Manual",
      price: 850,
      originalPrice: 1000,
      image: "/placeholder.svg",
      category: "Books",
      rating: 4.9,
      reviews: 78,
      inStock: true,
      featured: false,
      organic: false,
      description: "Comprehensive guide to permaculture principles with local case studies from India.",
      features: ["350 pages", "Color illustrations", "Local examples", "Bilingual content"]
    },
    {
      id: 6,
      name: "Beginner's Organic Garden Kit",
      price: 1800,
      originalPrice: 2200,
      image: "/placeholder.svg",
      category: "Kits",
      rating: 4.8,
      reviews: 95,
      inStock: true,
      featured: true,
      organic: true,
      description: "Complete starter kit with seeds, tools, fertilizer, and instruction manual.",
      features: ["Everything included", "Beginner friendly", "Organic certified", "Step-by-step guide"]
    },
    {
      id: 7,
      name: "Companion Planting Seed Mix",
      price: 380,
      originalPrice: 450,
      image: "/placeholder.svg", 
      category: "Seeds",
      rating: 4.5,
      reviews: 142,
      inStock: false,
      featured: false,
      organic: true,
      description: "Carefully selected seed varieties that grow well together and support each other.",
      features: ["Companion plants", "Pest deterrent", "Nitrogen fixing", "Easy to grow"]
    },
    {
      id: 8,
      name: "Bio-Enzyme Cleaning Concentrate",
      price: 225,
      originalPrice: 275,
      image: "/placeholder.svg",
      category: "Pest Control",
      rating: 4.4,
      reviews: 67,
      inStock: true,
      featured: false,
      organic: true,
      description: "Natural enzyme-based concentrate for soil health and plant disease prevention.",
      features: ["Probiotic action", "Soil health", "Disease prevention", "250ml concentrate"]
    }
  ];

  const services = [
    {
      title: "Garden Design Consultation",
      price: "₹2,500/session",
      description: "Personalized permaculture design consultation for your space.",
      features: ["Site analysis", "Custom design", "Plant recommendations", "Implementation plan"]
    },
    {
      title: "Organic Farm Setup",
      price: "₹15,000+",
      description: "Complete organic farm setup with training and ongoing support.",
      features: ["Soil preparation", "Infrastructure setup", "Training program", "6-month support"]
    },
    {
      title: "Maintenance & Care Service",
      price: "₹1,200/month", 
      description: "Monthly garden maintenance service with organic care practices.",
      features: ["Regular visits", "Organic treatments", "Pruning & care", "Progress monitoring"]
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-gradient-organic">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            {t('productsTitle')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            {t('productsSubtitle')}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input 
              placeholder="Search products..."
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
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="card-hover shadow-nature border-0 overflow-hidden hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="relative">
                  <div className="h-48 bg-muted">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-accent text-white text-xs">Featured</Badge>
                    {product.organic && (
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        <Leaf size={10} className="mr-1" />
                        Organic
                      </Badge>
                    )}
                  </div>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-lg line-clamp-2">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm text-muted-foreground ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-foreground">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">{product.category}</Badge>
                  </div>
                  <Button 
                    className="w-full bg-gradient-nature" 
                    disabled={!product.inStock}
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Notify When Available'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
            All Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.filter(p => !p.featured).map((product, index) => (
              <Card 
                key={product.id} 
                className="card-hover shadow-organic border-0 overflow-hidden hero-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative">
                  <div className="h-40 bg-muted">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.organic && (
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">
                      <Leaf size={8} className="mr-1" />
                      Organic
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-base line-clamp-2">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center">
                    <Star size={12} className="text-yellow-500 fill-current" />
                    <span className="text-xs text-muted-foreground ml-1">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-foreground">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <div className="text-xs text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">{product.category}</Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    disabled={!product.inStock}
                  >
                    <ShoppingCart size={14} className="mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Notify Me'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
            Professional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="card-hover shadow-nature border-0 hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-secondary text-secondary-foreground">Service</Badge>
                    <span className="text-lg font-bold text-primary">{service.price}</span>
                  </div>
                  <CardTitle className="font-heading text-xl text-foreground">
                    {service.title}
                  </CardTitle>
                  <CardDescription>
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2">What's included:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full">
                    Book Consultation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;