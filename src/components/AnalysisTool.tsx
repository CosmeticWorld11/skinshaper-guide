
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, AlertCircle, Check, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AnalysisTool = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<null | {
    skinType: string;
    concerns: string[];
    recommendations: string[];
  }>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResults(null);
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResults(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle camera access
  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  // Take photo from camera
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" });
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            stopCamera();
            setAnalysisResults(null);
          }
        }, "image/jpeg");
      }
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setShowCamera(false);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Simulate analysis
  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisResults({
              skinType: "Combination",
              concerns: ["Mild Dryness", "T-Zone Oiliness", "Fine Lines"],
              recommendations: [
                "Hydrating Serum with Hyaluronic Acid",
                "Lightweight Oil-Free Moisturizer",
                "Gentle Retinol Treatment",
                "SPF 30+ Daily Sunscreen",
              ],
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  // Reset everything
  const resetAnalysis = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResults(null);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-skin-50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Advanced Skin Analysis
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your photo or take a picture for a detailed analysis of your skin. 
            Our AI will identify your skin type and concerns to provide personalized recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-6 sm:p-8 animate-smooth-appear">
            {!showCamera ? (
              <div
                className={`border-2 border-dashed border-skin-200 rounded-xl h-80 flex flex-col items-center justify-center p-6 ${
                  previewUrl ? "border-0" : ""
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      onClick={resetAnalysis}
                      className="absolute top-2 right-2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-skin-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Upload your photo
                    </h3>
                    <p className="text-sm text-center text-muted-foreground mb-4">
                      Drag and drop your file here, or click to browse
                    </p>
                    <div className="flex gap-4">
                      <Button
                        onClick={triggerFileInput}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Browse Files
                      </Button>
                      <Button
                        onClick={startCamera}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo
                      </Button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="relative h-80 rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  <Button onClick={capturePhoto} className="bg-primary">
                    Capture
                  </Button>
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    className="bg-white/80"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {previewUrl && !analysisResults && !isAnalyzing && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={startAnalysis}
                  className="bg-primary hover:bg-primary/90"
                >
                  Start Analysis
                </Button>
              </div>
            )}

            {isAnalyzing && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Analyzing Image...</span>
                  <span className="text-sm font-medium">{Math.round(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="w-full" />
              </div>
            )}
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 animate-smooth-appear">
            {analysisResults ? (
              <div className="space-y-6">
                <div className="pb-4 border-b border-skin-100">
                  <h3 className="text-xl font-serif font-semibold mb-4">Analysis Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-skin-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-skin-700 mb-2">Skin Type</h4>
                      <p className="text-lg font-medium">{analysisResults.skinType}</p>
                    </div>
                    <div className="bg-blush-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blush-700 mb-2">Hydration</h4>
                      <p className="text-lg font-medium">Moderate</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Identified Concerns</h4>
                  <ul className="space-y-2">
                    {analysisResults.concerns.map((concern, index) => (
                      <li
                        key={index}
                        className="flex items-center p-2 bg-white/50 rounded-lg"
                      >
                        <AlertCircle className="h-4 w-4 text-primary mr-2" />
                        <span>{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-skin-100">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Recommended Products</h4>
                  <ul className="space-y-2">
                    {analysisResults.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="flex items-center p-2 bg-white/50 rounded-lg"
                      >
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex justify-center">
                  <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                    View Detailed Recommendations
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-skin-100 flex items-center justify-center mb-4">
                  <Camera className="h-8 w-8 text-skin-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Your Analysis Results</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Upload a photo of your face to receive a detailed skin analysis and personalized product recommendations.
                </p>
                <div className="space-y-4 w-full max-w-sm">
                  <div className="bg-skin-50 p-4 rounded-lg flex">
                    <div className="bg-skin-100 h-4 w-32 rounded shimmer"></div>
                  </div>
                  <div className="bg-skin-50 p-4 rounded-lg flex">
                    <div className="bg-skin-100 h-4 w-48 rounded shimmer"></div>
                  </div>
                  <div className="bg-skin-50 p-4 rounded-lg flex">
                    <div className="bg-skin-100 h-4 w-40 rounded shimmer"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisTool;
