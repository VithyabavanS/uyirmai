import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import client from '../../tina/__generated__/client';

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [props, setProps] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch from the existing blog collection
        const res = await client.queries.blog({
          relativePath: 'en.json',
        });
        
        // Find the post by slug
        const post = res.data.blog.blogPosts.find(p => generateSlug(p.title) === slug);
        
        if (post) {
          setProps(res); // Pass the entire TinaCMS response for editing
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Blog post not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-48 translate-y-48" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading Article</h2>
              <p className="text-gray-600">Please wait while we fetch the content...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-48 translate-y-48" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Tag className="text-red-500" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Sorry, we couldn't find the article you're looking for. It may have been moved or deleted.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/blog')}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-8 py-3 text-white font-semibold rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Back to Blog
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="px-8 py-3 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-full transition-all duration-300"
                >
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <BlogPost {...props} />;
};

const BlogPost = (props) => {
  const { data } = useTina(props);
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Find the specific post by slug
  const post = data.blog.blogPosts.find(p => generateSlug(p.title) === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
          <button onClick={() => navigate('/blog')} className="text-emerald-600 hover:text-emerald-700">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Function to render video if videoUrl is provided
  const renderVideo = (videoUrl) => {
    if (!videoUrl) return null;

    // Check if it's a YouTube URL
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = videoUrl.match(youtubeRegex);
    
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return (
        <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden shadow-lg mb-8">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Blog post video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    // Check if it's a Vimeo URL
    const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;
    const vimeoMatch = videoUrl.match(vimeoRegex);
    
    if (vimeoMatch) {
      const videoId = vimeoMatch[1];
      return (
        <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden shadow-lg mb-8">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://player.vimeo.com/video/${videoId}`}
            title="Blog post video"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    // For direct video URLs
    return (
      <div className="mb-8">
        <video
          className="w-full rounded-xl shadow-lg"
          controls
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-48 translate-y-48" />
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog Button */}
          <div className="mb-8">
            <Button
              onClick={() => navigate('/blog')}
              variant="outline"
              className="bg-white/80 backdrop-blur-sm hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all duration-300 shadow-sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </div>

          {/* Main Content Card */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              {/* Featured Image or Video */}
              <div className="relative">
                {post.videoUrl ? (
                  <div className="p-8 pb-0">
                    <div data-tina-field={`blogPosts.${data.blog.blogPosts.indexOf(post)}.videoUrl`}>
                      {renderVideo(post.videoUrl)}
                    </div>
                  </div>
                ) : post.image && (
                  <div className="h-96 relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                      data-tina-field={`blogPosts.${data.blog.blogPosts.indexOf(post)}.image`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}
              </div>

              {/* Article Header */}
              <div className="p-8 pb-6">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                  {post.category && (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                      <Tag size={12} className="mr-1" />
                      {post.category}
                    </Badge>
                  )}
                  
                  {post.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 font-medium">
                      ⭐ Featured
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h1 data-tina-field={`blogPosts.${data.blog.blogPosts.indexOf(post)}.title`} className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <p data-tina-field={`blogPosts.${data.blog.blogPosts.indexOf(post)}.excerpt`} className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                    {post.excerpt}
                  </p>
                )}

                {/* Author and Date Info */}
                <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200">
                  {post.author && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p data-tina-field={`blogPosts.${data.blog.blogPosts.indexOf(post)}.author`} className="font-semibold text-gray-900">{post.author}</p>
                        <p className="text-sm text-gray-500">Author</p>
                      </div>
                    </div>
                  )}
                  
                  {post.date && (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Calendar size={14} className="text-green-600" />
                      </div>
                      <span data-tina-field={`blogPosts.${data.blog.blogPosts.indexOf(post)}.date`}>
                        {typeof post.date === 'string' ? post.date : new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  )}
                  
                  {post.readTime && (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Clock size={14} className="text-purple-600" />
                      </div>
                      <span data-tina-field={`blogPosts.${data.blog.blogPosts.indexOf(post)}.readTime`}>{post.readTime}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Article Content */}
              <div className="px-8 pb-8">
                <div className="prose prose-lg prose-emerald max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-emerald-600 prose-code:bg-emerald-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700">
                  <div data-tina-field={`blogPosts.${data.blog.blogPosts.indexOf(post)}.fullContent`}>
                    {post.fullContent ? (
                      <TinaMarkdown content={post.fullContent} />
                    ) : (
                      <div>
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-8 mb-8">
                          <h3 className="text-2xl font-semibold text-emerald-800 mb-4">
                            ✏️ Ready to Add Content
                          </h3>
                          <p className="text-emerald-700 text-lg mb-4">
                            This article is ready for full content! Click the "Edit" button (✏️) at the top of your browser to add the complete article content using TinaCMS.
                          </p>
                          <div className="bg-white rounded-md p-4 border border-emerald-200">
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Current excerpt:</strong>
                            </p>
                            <p className="text-gray-800 italic">"{post.excerpt}"</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Article Footer */}
              <div className="px-8 py-6 bg-gradient-to-r from-emerald-50 to-green-50 border-t border-emerald-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-emerald-700">
                    <Tag size={16} />
                    <span className="font-medium">
                      Tagged in: {post.category || 'Uncategorized'}
                    </span>
                  </div>
                  
                  <Button
                    onClick={() => navigate('/blog')}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-6 py-2 text-white font-semibold rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 self-start sm:self-auto"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    More Articles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles or Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                Enjoyed this article?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Explore more insights on sustainable living, permaculture, and community building.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/blog')}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-8 py-3 text-white font-semibold rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  Browse All Articles
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/get-involved')}
                  className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-full transition-all duration-300"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Get Involved
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;