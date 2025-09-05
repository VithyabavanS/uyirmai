import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Philosophy from "@/pages/Philosophy";
import Projects from "@/pages/Projects";
import Blog from "@/pages/Blog";
import Resources from "@/pages/Resources";
import GetInvolved from "@/pages/GetInvolved";
import Products from "@/pages/Products";
import NotFound from "./pages/NotFound";
import BlogPostPage from "./pages/BlogPostPage";
import React from "react";

const queryClient = new QueryClient();

const TinaProvider = React.lazy(() => import('./components/tina/TinaProvider'));

const App = () => {
  const isTinaEnabled = import.meta.env.TINA_PUBLIC_IS_LOCAL;

  const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/philosophy" element={<Philosophy />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/post/:slug" element={<BlogPostPage />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/get-involved" element={<GetInvolved />} />
      <Route path="/products" element={<Products />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Layout>
              {isTinaEnabled ? (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <TinaProvider>
                    <AppRoutes />
                  </TinaProvider>
                </React.Suspense>
              ) : (
                <AppRoutes />
              )}
            </Layout>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;