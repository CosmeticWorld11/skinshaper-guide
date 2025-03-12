
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Tag, ChevronRight } from "lucide-react";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: "Skincare" | "Cosmetics" | "Fashion";
  coverImage: string;
  date: string;
  readTime: string;
  author: string;
  authorImage: string;
  tags: string[];
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of Sustainable Beauty: How Green Products Are Changing the Industry",
    excerpt: "Discover how eco-friendly beauty products are reshaping the cosmetics industry and why consumers are demanding more sustainable options.",
    category: "Cosmetics",
    coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "May 15, 2023",
    readTime: "8 min read",
    author: "Emma Watson",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    tags: ["Sustainable", "Green Beauty", "Eco-Friendly"]
  },
  {
    id: 2,
    title: "Hyaluronic Acid: The Hydration Superhero Your Skin Needs",
    excerpt: "Learn why hyaluronic acid has become the gold standard ingredient for skin hydration and how to incorporate it into your routine.",
    category: "Skincare",
    coverImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "April 23, 2023",
    readTime: "6 min read",
    author: "Dr. Sarah Chen",
    authorImage: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    tags: ["Hydration", "Ingredients", "Anti-Aging"]
  },
  {
    id: 3,
    title: "Dopamine Dressing: How Colors Affect Your Mood and Confidence",
    excerpt: "Explore the psychology of color in fashion and how choosing certain hues can boost your mood, energy, and self-esteem.",
    category: "Fashion",
    coverImage: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "May 2, 2023",
    readTime: "5 min read",
    author: "Alex Rodriguez",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    tags: ["Color Psychology", "Fashion Trends", "Mood Enhancement"]
  },
  {
    id: 4,
    title: "The Skin Barrier: Understanding and Repairing Your Skin's Defense System",
    excerpt: "Why a healthy skin barrier is crucial for beautiful skin and the best practices to maintain and repair it for optimal skin health.",
    category: "Skincare",
    coverImage: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "April 10, 2023",
    readTime: "7 min read",
    author: "Dr. Maya Johnson",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    tags: ["Skin Health", "Repair", "Sensitive Skin"]
  },
  {
    id: 5,
    title: "Clean Beauty vs. Clinical Skincare: Finding Your Perfect Balance",
    excerpt: "Navigate the debate between natural ingredients and science-backed formulations to create the ideal skincare routine for your needs.",
    category: "Skincare",
    coverImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "May 8, 2023",
    readTime: "9 min read",
    author: "Jennifer Kim",
    authorImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    tags: ["Clean Beauty", "Science-Based", "Ingredients"]
  },
  {
    id: 6,
    title: "Sustainable Fashion: From Runway to Everyday Wear",
    excerpt: "How the fashion industry is embracing sustainability and ways you can build an eco-friendly wardrobe without sacrificing style.",
    category: "Fashion",
    coverImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "April 28, 2023",
    readTime: "6 min read",
    author: "Zoe Martinez",
    authorImage: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    tags: ["Sustainable Fashion", "Eco-Friendly", "Ethical"]
  }
];

const featuredPost = blogPosts[0];
const otherPosts = blogPosts.slice(1);

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
  return (
    <div className="min-h-screen bg-background" data-testid="blog-page">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
            Beauty & Style Journal
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the latest trends, expert advice, and insider tips on skincare, cosmetics, and fashion.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden glass-card">
            <div className="md:grid md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto">
                <img 
                  src={featuredPost.coverImage} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
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
                  />
                  <span className="font-medium">{featuredPost.author}</span>
                </div>
                <div className="mt-auto">
                  <Button className="rounded-full">
                    Read Article
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button variant="outline" className="rounded-full bg-background">All</Button>
          <Button variant="outline" className="rounded-full bg-blue-50 text-blue-800 border-blue-200">Skincare</Button>
          <Button variant="outline" className="rounded-full bg-pink-50 text-pink-800 border-pink-200">Cosmetics</Button>
          <Button variant="outline" className="rounded-full bg-purple-50 text-purple-800 border-purple-200">Fashion</Button>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <div key={post.id} className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="relative">
                <div className="aspect-video">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover"
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
                    />
                    <span className="text-xs font-medium">{post.author}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-full p-0 w-8 h-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" className="rounded-full">
            Load More Articles
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
