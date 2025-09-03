import React, { useState } from 'react';
import { ShoppingCart, Star, Filter, Search, Package, Leaf, Award, ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTina } from 'tinacms/dist/react';
import client from '../../tina/__generated__/client';

const Products = (props) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const pageData = data.products;

  if (!pageData) {
    return <div>Loading...</div>;
  }

  const categories = ['All', ...new Set(pageData.products.map(p => p.category))];

  const allProducts = pageData.products.map((p, i) => ({ ...p, originalIndex: i }));

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = allProducts.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-48 translate-y-48" />
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-6 hero-fade-in">
            <ShoppingBag size={16} className="mr-2 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Organic Marketplace</span>
          </div>
          
          <h1 data-tina-field="title" className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 hero-fade-in">
            {pageData.title}
          </h1>
          <p data-tina-field="subtitle" className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed hero-fade-in" style={{animationDelay: '0.3s'}}>
            {pageData.subtitle}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border-gray-200 rounded-xl shadow-sm focus:shadow-md focus:border-emerald-300 transition-all duration-300"
              />
            </div>
            
            {/* Filter Section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter size={16} />
                <span className="font-medium">Category:</span>
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
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full">
              <Award size={16} className="mr-2 text-yellow-600" />
              <span className="text-yellow-700 font-medium">Featured Products</span>
            </div>
          </div>
          <h2 data-tina-field="featuredProductsTitle" className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            {pageData.featuredProductsTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Card 
                key={product.name}
                className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`products.${product.originalIndex}`}
              >
                {/* Card background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="h-56 bg-gradient-to-br from-emerald-100 to-green-100 overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-medium px-3 py-1">
                      ⭐ Featured
                    </Badge>
                    {product.organic && (
                      <Badge className="bg-emerald-600 text-white text-xs px-3 py-1">
                        <Leaf size={10} className="mr-1" />
                        Organic
                      </Badge>
                    )}
                  </div>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive" className="px-4 py-2">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle data-tina-field="name" className="font-heading text-lg line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-yellow-700 ml-1">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <p data-tina-field="description" className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span data-tina-field="price" className="text-2xl font-bold text-emerald-600">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span data-tina-field="originalPrice" className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Badge data-tina-field="category" variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                      {product.category}
                    </Badge>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105" 
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
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
              <Package size={16} className="mr-2 text-blue-600" />
              <span className="text-blue-700 font-medium">All Products</span>
            </div>
          </div>
          <h2 data-tina-field="allProductsTitle" className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            {pageData.allProductsTitle}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.filter(p => !p.featured).map((product, index) => (
              <Card 
                key={product.name} 
                className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative hero-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
                data-tina-field={`products.${product.originalIndex}`}
              >
                {/* Card background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="h-40 bg-gradient-to-br from-emerald-100 to-green-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {product.organic && (
                    <Badge className="absolute top-2 right-2 bg-emerald-600 text-white text-xs px-2 py-1">
                      <Leaf size={8} className="mr-1" />
                      Organic
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive" className="text-xs px-3 py-1">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle data-tina-field="name" className="font-heading text-base line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full w-fit">
                    <Star size={12} className="text-yellow-500 fill-current" />
                    <span className="text-xs font-medium text-yellow-700 ml-1">
                      {product.rating}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span data-tina-field="price" className="text-lg font-bold text-emerald-600">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <div data-tina-field="originalPrice" className="text-xs text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </div>
                      )}
                    </div>
                    <Badge data-tina-field="category" variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                      {product.category}
                    </Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-700 transition-all duration-300" 
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
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full">
              <CheckCircle size={16} className="mr-2 text-purple-600" />
              <span className="text-purple-700 font-medium">Professional Services</span>
            </div>
          </div>
          <h2 data-tina-field="servicesTitle" className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            {pageData.servicesTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pageData.services.map((service, index) => (
              <Card 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative overflow-hidden hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`services.${index}`}
              >
                {/* Service highlight bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600" />
                
                {/* Card background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border-0 px-3 py-1">
                      Service
                    </Badge>
                    <span data-tina-field="price" className="text-xl font-bold text-emerald-600">{service.price}</span>
                  </div>
                  <CardTitle data-tina-field="title" className="font-heading text-xl text-foreground group-hover:text-purple-700 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription data-tina-field="description" className="leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <div className="mb-6">
                    <h4 className="font-medium text-foreground mb-3 flex items-center">
                      <CheckCircle size={16} className="mr-2 text-emerald-600" />
                      What's included:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start" data-tina-field={`features.${i}`}>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-purple-50 group-hover:border-purple-200 group-hover:text-purple-700 transition-all duration-300">
                    Book Consultation
                    <ArrowRight className="ml-2" size={14} />
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

const ProductsPage = () => {
  const { language } = useLanguage();
  const [props, setProps] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.products({
          relativePath: `${language}.json`,
        });
        if (res.errors) {
          setError(res.errors);
        } else {
          setProps(res);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };
    fetchData();
  }, [language]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium">Error loading products</div>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!props) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return <Products {...props} />;
}

export default ProductsPage;