import React, { useState, useEffect } from "react";
import { 
  Upload, 
  Camera, 
  Shirt, 
  TrendingUp, 
  Brush, 
  ShoppingBag,
  Check,
  Save,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { fashionAnalysisService, AnalysisResult } from "@/services/fashionAnalysisService";

const FashionAnalysisTool: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'color' | 'style' | 'trend' | 'outfit'>('color');
  const [previousAnalyses, setPreviousAnalyses] = useState<AnalysisResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      loadUserAnalyses();
    }
  }, [user, isAuthenticated]);

  const loadUserAnalyses = async () => {
    if (!user?._id) return;
    
    try {
      const analyses = await fashionAnalysisService.getUserAnalyses(user._id);
      setPreviousAnalyses(analyses);
    } catch (error) {
      console.error("Error loading previous analyses:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));

      setResult(null);
      setProgress(0);
    }
  };

  const handleCameraCapture = () => {
    toast.info("Camera functionality is currently in development.");
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload an image first");
      return;
    }

    if (!isAuthenticated) {
      toast.error("Please login to analyze images");
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);

    try {
      const img = await fashionAnalysisService.loadImage(file);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 5;
        });
      }, 200);

      const analysisResult = await fashionAnalysisService.analyzeImage(img, user!._id!);
      
      clearInterval(interval);
      setProgress(100);
      setResult(analysisResult);
      
      loadUserAnalyses();
      
      toast.success("Fashion analysis completed successfully!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadPreviousAnalysis = (analysis: AnalysisResult) => {
    setResult(analysis);
    setShowHistory(false);
  };

  const renderColorAnalysis = () => {
    if (!result) return null;
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-semibold">Your Color Palette</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Dominant Colors</h4>
            <div className="flex flex-wrap gap-2">
              {result.colorAnalysis.dominant.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: getColorCode(color) }}></div>
                  <span>{color}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Complementary Colors</h4>
            <div className="flex flex-wrap gap-2">
              {result.colorAnalysis.complementary.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: getColorCode(color) }}></div>
                  <span>{color}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Seasonal Palette</h4>
            <div className="inline-block px-3 py-1 bg-skin-100 text-skin-800 rounded-full">
              {result.colorAnalysis.seasonal}
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <h4 className="font-medium mb-2">Recommended Color Combinations</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-skin-600" />
              <span>Navy Blue + Gold for elegant evening looks</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-skin-600" />
              <span>Cream + Burgundy for sophisticated daytime outfits</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-skin-600" />
              <span>Burgundy + Forest Green for seasonal autumn/winter styles</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderStyleMatching = () => {
    if (!result) return null;
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-semibold">Your Style Profile</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Primary Style</h4>
            <div className="inline-block px-4 py-2 bg-skin-100 text-skin-800 rounded-full font-medium">
              {result.styleMatch.primaryStyle}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Secondary Styles</h4>
            <div className="flex flex-wrap gap-2">
              {result.styleMatch.secondaryStyles.map((style, index) => (
                <div key={index} className="px-3 py-1 bg-skin-50 text-skin-700 rounded-full text-sm">
                  {style}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Body Type Recommendations</h4>
            <ul className="space-y-2">
              {result.styleMatch.bodyTypeRecommendations.map((rec, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-skin-600" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-4">
          <h4 className="font-medium mb-2">Style Compatibility</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Classic Elegance</span>
              <span className="font-medium">95%</span>
            </div>
            <Progress value={95} className="h-2 bg-skin-200" indicatorClassName="bg-skin-600" />
            
            <div className="flex justify-between text-sm">
              <span>Casual Chic</span>
              <span className="font-medium">80%</span>
            </div>
            <Progress value={80} className="h-2 bg-skin-200" indicatorClassName="bg-skin-600" />
            
            <div className="flex justify-between text-sm">
              <span>Minimalist</span>
              <span className="font-medium">75%</span>
            </div>
            <Progress value={75} className="h-2 bg-skin-200" indicatorClassName="bg-skin-600" />
          </div>
        </div>
      </div>
    );
  };

  const renderTrendDetection = () => {
    if (!result) return null;
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-semibold">Trend Analysis</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Current Trends</h4>
            <div className="flex flex-wrap gap-2">
              {result.trendReport.current.map((trend, index) => (
                <div key={index} className="px-3 py-1 bg-skin-100 text-skin-800 rounded-full text-sm">
                  {trend}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Upcoming Trends</h4>
            <div className="flex flex-wrap gap-2">
              {result.trendReport.upcoming.map((trend, index) => (
                <div key={index} className="px-3 py-1 bg-blush-100 text-blush-800 rounded-full text-sm">
                  {trend}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Your Trend Compatibility</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Trend Match</span>
                <span className="font-medium">{result.trendReport.compatibility}%</span>
              </div>
              <Progress 
                value={result.trendReport.compatibility} 
                className="h-2 bg-skin-200" 
                indicatorClassName="bg-skin-600" 
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <h4 className="font-medium mb-2">Trend Recommendations</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-skin-600" />
              <span>Incorporate sustainable fabrics to align with eco-trends</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-skin-600" />
              <span>Experiment with earth tones in your accessories</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-skin-600" />
              <span>Try vintage-inspired pieces to prepare for upcoming trends</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderOutfitGeneration = () => {
    if (!result) return null;
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-semibold">Outfit Suggestions</h3>
        
        {result.outfitSuggestions.map((outfit, index) => (
          <Card key={index} className="bg-white border-skin-100">
            <CardContent className="p-4">
              <h4 className="font-medium text-lg mb-3">{outfit.occasion}</h4>
              
              <div className="space-y-3">
                {outfit.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <span className="font-medium">{item.type}:</span> {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="pt-4">
          <h4 className="font-medium mb-2">Styling Tips</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-skin-600" />
              <span>Layer the cream blouse under the burgundy dress for a unique look</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-skin-600" />
              <span>The gold pendant necklace works with both suggested outfits</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-skin-600" />
              <span>Add a burgundy lip color to tie your casual day look together</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderPreviousAnalyses = () => {
    if (previousAnalyses.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No previous analyses found</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <h4 className="font-medium text-lg">Your Analysis History</h4>
        
        {previousAnalyses.map((analysis, index) => (
          <div 
            key={index} 
            className="p-3 border rounded-lg cursor-pointer hover:bg-muted/5"
            onClick={() => loadPreviousAnalysis(analysis)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{analysis.styleMatch.primaryStyle} Style</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(analysis.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button 
                variant="ghost"
                size="sm"
                className="gap-1"
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getColorCode = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      "Navy Blue": "#1B2A41",
      "Cream": "#F8F4E3",
      "Burgundy": "#800020",
      "Gold": "#D4AF37",
      "Forest Green": "#014421",
      "Coral": "#FF7F50"
    };
    
    return colorMap[colorName] || "#CCCCCC";
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-white border-skin-100">
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-serif font-semibold">Upload Your Fashion Image</h3>
                
                {isAuthenticated && previousAnalyses.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => setShowHistory(!showHistory)}
                  >
                    <History className="h-3.5 w-3.5" />
                    History
                  </Button>
                )}
              </div>
              
              {showHistory ? (
                renderPreviousAnalyses()
              ) : (
                <>
                  {previewUrl ? (
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-4">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                      <button 
                        className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white"
                        onClick={() => {
                          setFile(null);
                          setPreviewUrl(null);
                          setResult(null);
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-skin-200 rounded-lg p-8 text-center">
                      <div className="flex justify-center mb-4">
                        <Upload className="h-10 w-10 text-skin-400" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload a photo of your outfit or clothing item
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button 
                          onClick={() => document.getElementById('file-upload')?.click()}
                          className="bg-skin-600 hover:bg-skin-700 gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Upload Image
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleCameraCapture}
                          className="gap-2"
                        >
                          <Camera className="h-4 w-4" />
                          Use Camera
                        </Button>
                        <input 
                          id="file-upload"
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  )}
                  
                  {file && !isAnalyzing && !result && (
                    <Button 
                      className="w-full bg-skin-600 hover:bg-skin-700"
                      onClick={handleAnalyze}
                      disabled={!isAuthenticated}
                    >
                      {isAuthenticated ? "Analyze Fashion" : "Login to Analyze"}
                    </Button>
                  )}
                  
                  {isAnalyzing && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Analyzing your fashion...</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress 
                        value={progress} 
                        className="h-2 bg-skin-200" 
                        indicatorClassName="bg-skin-600" 
                      />
                    </div>
                  )}
                  
                  {result && (
                    <div className="space-y-4">
                      <div className="py-2 px-3 bg-green-50 text-green-700 rounded-md text-sm flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        Analysis complete
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Style Match</span>
                          <span className="font-medium">95%</span>
                        </div>
                        <Progress value={95} className="h-2 bg-skin-200" indicatorClassName="bg-skin-600" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Color Harmony</span>
                          <span className="font-medium">88%</span>
                        </div>
                        <Progress value={88} className="h-2 bg-skin-200" indicatorClassName="bg-skin-600" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Trend Alignment</span>
                          <span className="font-medium">{result.trendReport.compatibility}%</span>
                        </div>
                        <Progress 
                          value={result.trendReport.compatibility} 
                          className="h-2 bg-skin-200" 
                          indicatorClassName="bg-skin-600" 
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {!result ? (
            <Card className="bg-white border-skin-100 h-full">
              <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
                <div className="bg-skin-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Shirt className="h-8 w-8 text-skin-600" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-3">ECO-Skin Fashion Analysis</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Upload an image of your outfit or clothing item to receive personalized fashion insights 
                  including color analysis, style matching, trend detection, and outfit suggestions.
                </p>
                
                {isAuthenticated ? (
                  <Button 
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="bg-skin-600 hover:bg-skin-700 gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Fashion Image
                  </Button>
                ) : (
                  <div className="p-4 bg-orange-50 text-orange-800 rounded-lg text-sm mb-4">
                    <p>Please login to save your fashion analysis results.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white border-skin-100">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-6 border-b border-skin-100 pb-4">
                  <Button 
                    variant={activeTab === 'color' ? 'default' : 'outline'}
                    className={activeTab === 'color' ? 'bg-skin-600 hover:bg-skin-700 gap-2' : 'gap-2'}
                    onClick={() => setActiveTab('color')}
                  >
                    <Brush className="h-4 w-4" />
                    Color Analysis
                  </Button>
                  
                  <Button 
                    variant={activeTab === 'style' ? 'default' : 'outline'}
                    className={activeTab === 'style' ? 'bg-skin-600 hover:bg-skin-700 gap-2' : 'gap-2'}
                    onClick={() => setActiveTab('style')}
                  >
                    <Shirt className="h-4 w-4" />
                    Style Matching
                  </Button>
                  
                  <Button 
                    variant={activeTab === 'trend' ? 'default' : 'outline'}
                    className={activeTab === 'trend' ? 'bg-skin-600 hover:bg-skin-700 gap-2' : 'gap-2'}
                    onClick={() => setActiveTab('trend')}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Trend Detection
                  </Button>
                  
                  <Button 
                    variant={activeTab === 'outfit' ? 'default' : 'outline'}
                    className={activeTab === 'outfit' ? 'bg-skin-600 hover:bg-skin-700 gap-2' : 'gap-2'}
                    onClick={() => setActiveTab('outfit')}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Outfit Generation
                  </Button>
                </div>
                
                {activeTab === 'color' && renderColorAnalysis()}
                {activeTab === 'style' && renderStyleMatching()}
                {activeTab === 'trend' && renderTrendDetection()}
                {activeTab === 'outfit' && renderOutfitGeneration()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FashionAnalysisTool;
