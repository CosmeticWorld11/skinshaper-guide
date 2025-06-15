
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'skincare' | 'products' | 'routines' | 'account' | 'general';
  tags: string[];
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I determine my skin type?',
      answer: 'To determine your skin type, observe your skin after cleansing without applying any products for about an hour. Normal skin feels balanced, dry skin feels tight, oily skin appears shiny especially in the T-zone, combination skin has both oily and dry areas, and sensitive skin may feel irritated or react to products.',
      category: 'skincare',
      tags: ['skin type', 'assessment', 'analysis']
    },
    {
      id: '2',
      question: 'What ingredients should I avoid if I have sensitive skin?',
      answer: 'If you have sensitive skin, avoid fragrances, alcohol-based products, sulfates, parabens, retinoids (start slowly), alpha and beta hydroxy acids (start slowly), and essential oils. Always patch test new products and introduce them one at a time.',
      category: 'skincare',
      tags: ['sensitive skin', 'ingredients', 'allergies']
    },
    {
      id: '3',
      question: 'How often should I update my skincare routine?',
      answer: 'Review your skincare routine seasonally (every 3-4 months) as your skin needs change with weather, age, and lifestyle. However, don\'t change everything at once - introduce new products gradually and give each product at least 4-6 weeks to show results.',
      category: 'routines',
      tags: ['routine', 'frequency', 'updates']
    },
    {
      id: '4',
      question: 'Are eco-friendly beauty products as effective as conventional ones?',
      answer: 'Yes! Many eco-friendly products are equally or more effective than conventional ones. They often contain high-quality natural ingredients and avoid harsh chemicals. Look for products with proven active ingredients and read reviews to ensure effectiveness.',
      category: 'products',
      tags: ['eco-friendly', 'effectiveness', 'natural']
    },
    {
      id: '5',
      question: 'How do I build a skincare routine as a beginner?',
      answer: 'Start with the basics: gentle cleanser, moisturizer, and SPF for morning; cleanser and moisturizer for evening. Once your skin adjusts (2-4 weeks), you can gradually add targeted treatments like serums. Always introduce one new product at a time.',
      category: 'routines',
      tags: ['beginner', 'routine', 'basics']
    },
    {
      id: '6',
      question: 'Can I use multiple serums in my routine?',
      answer: 'Yes, but layer them correctly! Apply from thinnest to thickest consistency. Wait 2-3 minutes between applications. Avoid mixing certain ingredients like vitamin C with retinol, or niacinamide with vitamin C (though newer formulations are more compatible).',
      category: 'skincare',
      tags: ['serums', 'layering', 'application']
    },
    {
      id: '7',
      question: 'How do I save products to my wishlist?',
      answer: 'Click the heart icon on any product card to add it to your wishlist. You can view your saved products in your account settings. Your wishlist is automatically saved and synced across devices.',
      category: 'account',
      tags: ['wishlist', 'favorites', 'account']
    },
    {
      id: '8',
      question: 'What does the match percentage mean?',
      answer: 'The match percentage indicates how well a product or routine aligns with your skin type, concerns, preferences, and budget. Higher percentages mean the recommendation is more personalized to your specific needs and goals.',
      category: 'general',
      tags: ['recommendations', 'matching', 'algorithm']
    },
    {
      id: '9',
      question: 'How often should I exfoliate my skin?',
      answer: 'For most skin types, exfoliate 2-3 times per week. Sensitive skin should start with once per week. Oily skin can handle more frequent exfoliation. Use chemical exfoliants (AHA/BHA) rather than physical scrubs for gentler, more even results.',
      category: 'skincare',
      tags: ['exfoliation', 'frequency', 'AHA', 'BHA']
    },
    {
      id: '10',
      question: 'Can I use the same routine year-round?',
      answer: 'Your skin needs change with seasons. Summer may require lighter, oil-free products and stronger SPF, while winter often needs richer, more hydrating formulas. Adjust your routine based on climate, humidity, and how your skin feels.',
      category: 'routines',
      tags: ['seasonal', 'adjustments', 'climate']
    },
    {
      id: '11',
      question: 'How do I know if a product is working?',
      answer: 'Give products 4-6 weeks to show results, except for immediate effects like hydration. Look for gradual improvements in texture, tone, and specific concerns. Take photos to track progress. If you experience irritation or worsening, discontinue use.',
      category: 'products',
      tags: ['results', 'timeline', 'effectiveness']
    },
    {
      id: '12',
      question: 'What\'s the difference between morning and night routines?',
      answer: 'Morning routines focus on protection (antioxidants, SPF) and preparation for the day. Night routines emphasize repair and renewal (retinoids, AHAs) when skin naturally regenerates. Some ingredients like retinol are photosensitive and should only be used at night.',
      category: 'routines',
      tags: ['morning', 'evening', 'timing']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', count: faqItems.length },
    { value: 'skincare', label: 'Skincare', count: faqItems.filter(item => item.category === 'skincare').length },
    { value: 'products', label: 'Products', count: faqItems.filter(item => item.category === 'products').length },
    { value: 'routines', label: 'Routines', count: faqItems.filter(item => item.category === 'routines').length },
    { value: 'account', label: 'Account', count: faqItems.filter(item => item.category === 'account').length },
    { value: 'general', label: 'General', count: faqItems.filter(item => item.category === 'general').length }
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <HelpCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        </div>
        <p className="text-muted-foreground">
          Find answers to common questions about skincare, products, and routines
        </p>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Badge
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label} ({category.count})
            </Badge>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filter
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map(item => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleExpanded(item.id)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                  {expandedItems.has(item.id) ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                  {item.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              {expandedItems.has(item.id) && (
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>

      <div className="text-center mt-8 p-6 bg-muted/50 rounded-lg">
        <h3 className="font-semibold mb-2">Still have questions?</h3>
        <p className="text-muted-foreground mb-4">
          Chat with our AI beauty assistant for personalized advice and recommendations
        </p>
        <Badge variant="outline" className="text-primary">
          💬 Open Chat Assistant
        </Badge>
      </div>
    </div>
  );
};

export default FAQ;
