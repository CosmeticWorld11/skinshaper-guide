import { toast } from "@/hooks/use-toast";

export interface NewsArticle {
  title: string;
  description: string;
  content: string;
  image_url: string;
  link: string;
  pubDate: string;
  source_id: string;
  creator?: string[];
  category: string[];
  country: string[];
  language: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  results: NewsArticle[];
  nextPage: string;
}

const API_KEY = "pub_74637c04d6d0d570547ee7ecead27e73201d5";
const BASE_URL = "https://newsdata.io/api/1/news";

export const fetchNewsArticles = async (page?: string): Promise<NewsResponse> => {
  try {
    const queryParams = new URLSearchParams({
      apikey: API_KEY,
      q: "Fashion cosmetics",
      language: "en,hi,kn,ta,te",
      category: "health,lifestyle,science,technology,world",
    });
    
    if (page) {
      queryParams.append("page", page);
    }
    
    const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch news articles: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news articles:", error);
    toast({
      title: "Error fetching articles",
      description: "Unable to load news articles. Please try again later.",
      variant: "destructive",
    });
    throw error;
  }
};
