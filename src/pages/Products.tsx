import React, { useState } from 'react';
import { ShoppingCart, Star, Filter, Search, Package, Leaf, Award } from 'lucide-react';
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
          <h2 data-tina-field="featuredProductsTitle" className="text-2xl font-heading font-bold text-foreground mb-8">
            {pageData.featuredProductsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <Card 
                key={product.name}
                className="card-hover shadow-nature border-0 overflow-hidden hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`products.${product.originalIndex}`}
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
                  <CardTitle data-tina-field="name" className="font-heading text-lg line-clamp-2">
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
                  <p data-tina-field="description" className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span data-tina-field="price" className="text-xl font-bold text-foreground">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span data-tina-field="originalPrice" className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Badge data-tina-field="category" variant="outline" className="text-xs">{product.category}</Badge>
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
          <h2 data-tina-field="allProductsTitle" className="text-2xl font-heading font-bold text-foreground mb-8">
            {pageData.allProductsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.filter(p => !p.featured).map((product, index) => (
              <Card 
                key={product.name} 
                className="card-hover shadow-organic border-0 overflow-hidden hero-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
                data-tina-field={`products.${product.originalIndex}`}
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
                  <CardTitle data-tina-field="name" className="font-heading text-base line-clamp-2">
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
                      <span data-tina-field="price" className="text-lg font-bold text-foreground">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <div data-tina-field="originalPrice" className="text-xs text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </div>
                      )}
                    </div>
                    <Badge data-tina-field="category" variant="outline" className="text-xs">{product.category}</Badge>
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
          <h2 data-tina-field="servicesTitle" className="text-2xl font-heading font-bold text-foreground mb-8">
            {pageData.servicesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageData.services.map((service, index) => (
              <Card 
                key={index} 
                className="card-hover shadow-nature border-0 hero-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
                data-tina-field={`services.${index}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-secondary text-secondary-foreground">Service</Badge>
                    <span data-tina-field="price" className="text-lg font-bold text-primary">{service.price}</span>
                  </div>
                  <CardTitle data-tina-field="title" className="font-heading text-xl text-foreground">
                    {service.title}
                  </CardTitle>
                  <CardDescription data-tina-field="description">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2">What's included:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center" data-tina-field={`features.${i}`}>
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

const ProductsPage = () => {
  const { language } = useLanguage();
  const [props, setProps] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await client.queries.products({
        relativePath: `${language}.json`,
      });
      if (res.errors) {
        setError(res.errors);
      } else {
        setProps(res);
      }
    };
    fetchData();
  }, [language]);

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return props ? <Products {...props} /> : <div>Loading...</div>;
}

export default ProductsPage;