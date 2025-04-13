
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Search, Calendar, CalendarPlus, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-serif font-semibold tracking-tight transition-colors"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-skin-600 to-blush-600">
                ECO Skin
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/analysis"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Skin Analysis
            </Link>
            <Link
              to="/recommendations"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Recommendations
            </Link>
            <Link
              to="/fashion"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Fashion Analysis
            </Link>
            <Link
              to="/blog"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/eco-beauty-guide"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Eco Guide
            </Link>
            <Link
              to="/skincare-planner"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Planner
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              aria-label="Search"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              aria-label="Account"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <User className="h-5 w-5" />
            </button>
            <Button
              size="sm"
              className="bg-skin-600 hover:bg-skin-700 text-white rounded-full px-5"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/analysis"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Skin Analysis
            </Link>
            <Link
              to="/recommendations"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Recommendations
            </Link>
            <Link
              to="/fashion"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fashion Analysis
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/eco-beauty-guide"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Eco Guide
            </Link>
            <Link
              to="/skincare-planner"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Planner
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Button
              className="w-full mt-4 bg-skin-600 hover:bg-skin-700 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
