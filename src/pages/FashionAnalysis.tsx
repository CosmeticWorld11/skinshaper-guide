import React from "react";
import { Brush, Shirt, TrendingUp, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FashionAnalysisTool from "@/components/FashionAnalysisTool";

const FashionAnalysis = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-16 bg-skin-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="mb-2 inline-block">
                <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                  AI-Powered Beauty Assistant
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
                Discover Your Unique Style
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get personalized fashion and style recommendations 
                using advanced AI analysis
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="gap-2 rounded-full bg-skin-600 hover:bg-skin-700">
                  <Brush className="mr-2 h-4 w-4" />
                  Analyze My Style
                </Button>
                <Button variant="outline" className="gap-2 rounded-full">
                  Learn More
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif font-bold mb-4 text-center">AI Fashion Analysis</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">Style Analysis</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Pattern Recognition</span>
                          <span className="font-medium">98%</span>
                        </div>
                        <Progress value={98} className="h-2 bg-skin-200" indicatorClassName="bg-skin-600" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">AI Features</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Style Matching</span>
                          <span className="font-medium">95%</span>
                        </div>
                        <Progress value={95} className="h-2 bg-skin-200" indicatorClassName="bg-skin-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-medium text-foreground">AI Features</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-skin-600 mr-2"></div>
                          Color Analysis
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-skin-600 mr-2"></div>
                          Style Matching
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-medium text-foreground">AI Features</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blush-500 mr-2"></div>
                          Trend Detection
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blush-500 mr-2"></div>
                          Outfit Generation
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button className="bg-skin-600 hover:bg-skin-700 rounded-full">
                      Try AI Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <Card className="bg-white/70 backdrop-blur-sm border border-skin-100">
              <CardContent className="p-6 text-center">
                <div className="w-8 h-8 rounded-full bg-skin-100 text-skin-700 flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-serif font-medium text-lg mb-2">Advanced AI Analysis</h3>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm border border-skin-100">
              <CardContent className="p-6 text-center">
                <div className="w-8 h-8 rounded-full bg-skin-100 text-skin-700 flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-serif font-medium text-lg mb-2">Personalized Recommendations</h3>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm border border-skin-100">
              <CardContent className="p-6 text-center">
                <div className="w-8 h-8 rounded-full bg-skin-100 text-skin-700 flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-serif font-medium text-lg mb-2">Eco-Friendly Treatments</h3>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-sm border border-skin-100">
              <CardContent className="p-6 text-center">
                <div className="w-8 h-8 rounded-full bg-skin-100 text-skin-700 flex items-center justify-center mx-auto mb-4">
                  4
                </div>
                <h3 className="font-serif font-medium text-lg mb-2">Expert Support</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FashionAnalysisTool />
        </div>
      </section>
      
      <section className="py-16 bg-skin-50/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-8">Fashion & Style Updates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-skin-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-medium bg-secondary px-3 py-1 rounded-full">Technology</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5">
                      <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                    Latest Update
                  </span>
                </div>
                
                <h3 className="text-xl font-serif font-semibold mb-2">AI-Powered Personal Styling</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning algorithms revolutionizing personal style recommendations
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-skin-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-medium bg-secondary px-3 py-1 rounded-full">Eco-Fashion</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5">
                      <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                    Trending Now
                  </span>
                </div>
                
                <h3 className="text-xl font-serif font-semibold mb-2">Sustainable Fashion Trends</h3>
                <p className="text-sm text-muted-foreground">
                  Growing adoption of eco-friendly materials and ethical production methods
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-skin-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-medium bg-secondary px-3 py-1 rounded-full">Digital Fashion</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5">
                      <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                    Industry Update
                  </span>
                </div>
                
                <h3 className="text-xl font-serif font-semibold mb-2">Virtual Fashion Shows</h3>
                <p className="text-sm text-muted-foreground">
                  Digital runways and 3D fashion presentations becoming mainstream
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-skin-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-skin-600">
                <path d="m9.5 4 6 16m-1.75-2.25-4.5-1.5m4.5-14.5-4.5 1.5" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-serif font-bold text-center mb-4">Smart Style Analysis</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Our AI analyzes your style preferences and provides personalized
            recommendations based on current trends and your unique fashion sense
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-skin-50 border-skin-100">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-skin-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-skin-600" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-2">Trend Detection</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Real-time fashion trend analysis
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-skin-50 border-skin-100">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-skin-100 flex items-center justify-center">
                    <Shirt className="h-5 w-5 text-skin-600" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-2">Style Recognition</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Advanced pattern analysis
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-skin-50 border-skin-100">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-skin-100 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-skin-600" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-2">Smart Recommendations</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Personalized style tips
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-skin-50/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Our AI Fashion Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-4">
              <div className="bg-skin-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Brush className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Color Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your skin tone, hair color, and personal preferences
                to recommend the perfect color palette that complements your natural features
                and enhances your overall appearance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-skin-600"></div>
                  <span>Personalized color palette recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-skin-600"></div>
                  <span>Seasonal color analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-skin-600"></div>
                  <span>Complementary and accent color suggestions</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="bg-skin-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shirt className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Style Matching</h3>
              <p className="text-muted-foreground">
                Discover your unique style personality with our AI style matching system.
                We analyze your preferences, body type, and lifestyle to recommend 
                clothing styles that not only look great but also align with your personal aesthetic.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-skin-600"></div>
                  <span>Style personality assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-skin-600"></div>
                  <span>Body type analysis for flattering fits</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-skin-600"></div>
                  <span>Personal wardrobe compatibility checks</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="bg-skin-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Trend Detection</h3>
              <p className="text-muted-foreground">
                Stay ahead of the fashion curve with our real-time trend detection.
                Our AI constantly analyzes global fashion data to identify emerging trends
                and recommend timely style updates that keep your look fresh and current.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-skin-600"></div>
                  <span>Real-time fashion trend analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-skin-600"></div>
                  <span>Seasonal trend forecasting</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-skin-600"></div>
                  <span>Trend compatibility with your style</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="bg-skin-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Outfit Generation</h3>
              <p className="text-muted-foreground">
                Never worry about what to wear again. Our AI outfit generator creates
                stylish, occasion-appropriate outfit combinations based on your wardrobe,
                preferences, and the latest trends, ensuring you always look your best.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-skin-600"></div>
                  <span>Complete outfit recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-skin-600"></div>
                  <span>Occasion-specific styling</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-skin-600"></div>
                  <span>Mix-and-match suggestions from your wardrobe</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button className="bg-skin-600 hover:bg-skin-700 rounded-full px-8 py-6 text-lg">
              Try AI Fashion Analysis Now
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FashionAnalysis;
