
import React from "react";
import { Link } from "react-router-dom";
import { Book, Leaf, Calendar, CalendarPlus } from "lucide-react";

const FeatureNavigation = () => {
  const features = [
    {
      title: "Blog",
      description: "Explore beauty trends and tips",
      icon: <Book className="h-8 w-8 mb-4 text-primary" />,
      path: "/blog",
    },
    {
      title: "Eco Beauty Guide",
      description: "Discover sustainable beauty products",
      icon: <Leaf className="h-8 w-8 mb-4 text-green-600" />,
      path: "/eco-beauty-guide",
    },
    {
      title: "Skincare Planner",
      description: "Plan your skincare routine",
      icon: <Calendar className="h-8 w-8 mb-4 text-purple-600" />,
      path: "/skincare-planner",
    },
    {
      title: "Custom Planner",
      description: "Create a personalized routine",
      icon: <CalendarPlus className="h-8 w-8 mb-4 text-blue-600" />,
      path: "/custom-planner",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-10">
          Explore Our Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className="bg-white hover:bg-accent/10 border border-border rounded-xl p-6 text-center transition-all hover:shadow-md"
            >
              <div className="flex flex-col items-center justify-center">
                {feature.icon}
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureNavigation;
