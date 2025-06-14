
import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show the back button on the homepage
  if (location.pathname === "/") {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-white/80 backdrop-blur-sm hover:bg-white"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back
    </Button>
  );
};

export default BackButton;
