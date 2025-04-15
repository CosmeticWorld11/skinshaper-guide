import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Tag, ChevronRight, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchNewsArticles, type NewsArticle } from "@/services/newsDataService";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "@/hooks/use-toast";

type BlogPostCategory = "Skincare" | "Cosmetics" | "Fashion";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: BlogPostCategory;
  coverImage: string;
  date: string;
  readTime: string;
  author: string;
  authorImage: string;
  tags: string[];
};

const fallbackImage = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

const convertToBlogPost = (article: NewsArticle, index: number): BlogPost => {
  const categoryMap: Record<string, BlogPostCategory> = {
    health: "Skincare",
    lifestyle: "Fashion",
    science: "Skincare",
    technology: "Cosmetics",
    world: "Fashion",
  };

  const getCategory = (): BlogPostCategory => {
    if (!article.category || article.category.length === 0) return "Cosmetics";
    
    for (const cat of article.category) {
      const mappedCategory = categoryMap[cat.toLowerCase()];
      if (mappedCategory) return mappedCategory;
    }
    
    return "Cosmetics";
  };

  const contentLength = article.content?.length || 0;
  const readTime = Math.max(1, Math.round(contentLength / 1000)) + " min read";

  const tags = article.category?.slice(0, 3) || ["Beauty", "Lifestyle"];

  return {
    id: index,
    title: article.title || "Untitled Article",
    excerpt: article.description || article.content?.substring(0, 150) + "..." || "No description available",
    category: getCategory(),
    coverImage: article.image_url || fallbackImage,
    date: new Date(article.pubDate || Date.now()).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readTime,
    author: article.creator?.[0] || article.source_id || "Unknown Author",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    tags,
  };
};

const CategoryBadge = ({ category }: { category: BlogPost["category"] }) => {
  const colorMap = {
    Skincare: "bg-blue-100 text-blue-800",
    Cosmetics: "bg-pink-100 text-pink-800",
    Fashion: "bg-purple-100 text-purple-800",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[category]}`}>
      {category}
    </span>
  );
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  const {
    data: newsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["newsArticles", nextPageToken],
    queryFn: () => fetchNewsArticles(nextPageToken || undefined),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error loading articles",
        description: "Failed to load blog articles. Please try again later.",
        variant: "destructive",
      });
    }
  }, [isError, error]);

  useEffect(() => {
    if (newsData) {
      setNextPageToken(newsData.nextPage || null);
    }
  }, [newsData]);

  const handleLoadMore = () => {
    if (nextPageToken) {
      refetch();
    }
  };

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search functionality",
      description: `Searching for "${searchQuery}"...`,
    });
  };

  const blogPosts: BlogPost[] = 
    newsData?.results?.map(convertToBlogPost) || [];

  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const otherPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

  return (
    <div className="min-h-screen bg-background" data-testid="blog-page">
      <Navbar />
      <BackButton />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
            Beauty & Style Journal
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the latest trends, expert advice, and insider tips on skincare, cosmetics, and fashion.
          </p>
          
          <form onSubmit={handleSearch} className="mt-8 flex max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button 
            variant={activeCategory === "All" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => handleCategoryFilter("All")}
          >
            All
          </Button>
          <Button 
            variant={activeCategory === "Skincare" ? "default" : "outline"} 
            className={`rounded-full ${activeCategory !== "Skincare" ? "bg-blue-50 text-blue-800 border-blue-200" : ""}`}
            onClick={() => handleCategoryFilter("Skincare")}
          >
            Skincare
          </Button>
          <Button 
            variant={activeCategory === "Cosmetics" ? "default" : "outline"} 
            className={`rounded-full ${activeCategory !== "Cosmetics" ? "bg-pink-50 text-pink-800 border-pink-200" : ""}`}
            onClick={() => handleCategoryFilter("Cosmetics")}
          >
            Cosmetics
          </Button>
          <Button 
            variant={activeCategory === "Fashion" ? "default" : "outline"} 
            className={`rounded-full ${activeCategory !== "Fashion" ? "bg-purple-50 text-purple-800 border-purple-200" : ""}`}
            onClick={() => handleCategoryFilter("Fashion")}
          >
            Fashion
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-destructive mb-4">Failed to load articles</p>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No articles found for this category</p>
            <Button onClick={() => setActiveCategory("All")} variant="outline">
              View All Articles
            </Button>
          </div>
        ) : (
          <>
            {featuredPost && (
              <div className="mb-16">
                <div className="relative rounded-2xl overflow-hidden glass-card">
                  <div className="md:grid md:grid-cols-2">
                    <div className="relative aspect-square md:aspect-auto">
                      <img 
                        src={featuredPost.coverImage} 
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = fallbackImage;
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <CategoryBadge category={featuredPost.category} />
                      </div>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{featuredPost.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mb-6">
                        <img 
                          src={featuredPost.authorImage} 
                          alt={featuredPost.author}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80";
                          }}
                        />
                        <span className="font-medium">{featuredPost.author}</span>
                      </div>
                      <div className="mt-auto">
                        <Button className="rounded-full" asChild>
                          <a href={newsData?.results?.[0]?.link} target="_blank" rel="noopener noreferrer">
                            Read Article
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post, index) => (
                <div key={post.id} className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative">
                    <div className="aspect-video">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = fallbackImage;
                        }}
                      />
                    </div>
                    <div className="absolute top-3 left-3">
                      <CategoryBadge category={post.category} />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={post.authorImage} 
                          alt={post.author}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80";
                          }}
                        />
                        <span className="text-xs font-medium">{post.author}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full p-0 w-8 h-8"
                        asChild
                      >
                        <a href={newsData?.results?.[index + 1]?.link} target="_blank" rel="noopener noreferrer">
                          <ChevronRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {nextPageToken && (
              <div className="mt-12 text-center">
                <Button 
                  variant="outline" 
                  className="rounded-full"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More Articles"
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
