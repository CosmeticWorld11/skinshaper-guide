
import React from "react";
import { cn } from "@/lib/utils";

type PromptCategory = {
  name: string;
  prompts: string[];
};

const promptCategories: PromptCategory[] = [
  {
    name: "Skin Analysis",
    prompts: [
      "Analyze my skin for acne, dryness, or pigmentation",
      "What's my skin type?",
      "How can I improve my skin texture?",
      "Check for signs of aging on my face",
    ],
  },
  {
    name: "Treatment Recommendations",
    prompts: [
      "Suggest treatments for dark circles",
      "Best treatments for my skin type",
      "Step-by-step skincare routine",
      "Non-invasive anti-aging options",
    ],
  },
  {
    name: "Fashion & Style",
    prompts: [
      "What hairstyle suits my face shape?",
      "Suggest eyewear for my face",
      "Makeup shades for my skin tone",
      "Fashion trends for my body type",
    ],
  },
];

interface PromptSuggestionsProps {
  onPromptClick: (prompt: string) => void;
  showCategories?: boolean;
}

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ 
  onPromptClick, 
  showCategories = true 
}) => {
  const [activeCategory, setActiveCategory] = React.useState<string>(promptCategories[0].name);

  if (!showCategories) {
    const conversationStarters = [
      "Tell me about eco-friendly skincare options",
      "How do I build a daily skincare routine?",
      "What makeup trends are popular this season?",
      "Where can I find the skin analysis tool?",
      "What's the difference between serums and moisturizers?",
    ];

    return (
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Try asking about:</p>
        <div className="flex flex-wrap gap-2">
          {conversationStarters.map((starter, index) => (
            <button
              key={index}
              onClick={() => onPromptClick(starter)}
              className="text-xs py-1 px-3 bg-white border border-gray-200 hover:bg-gray-100 rounded-full text-gray-700 transition-colors whitespace-nowrap shadow-sm"
            >
              {starter}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 bg-white border-t border-gray-100">
      <div className="flex border-b pb-2 mb-2 overflow-x-auto">
        {promptCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={cn(
              "whitespace-nowrap px-3 py-1 mr-2 text-xs rounded-full transition-colors",
              activeCategory === category.name
                ? "bg-primary text-primary-foreground"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {promptCategories
          .find((cat) => cat.name === activeCategory)
          ?.prompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => onPromptClick(prompt)}
              className="text-xs py-1 px-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
