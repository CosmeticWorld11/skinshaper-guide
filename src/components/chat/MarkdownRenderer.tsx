
import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
  // Simple markdown parsing for common elements
  const parseMarkdown = (text: string): string => {
    return text
      // Bold text **text** or __text__
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      
      // Italic text *text* or _text_
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="font-semibold text-sm mt-2 mb-1">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="font-semibold text-base mt-3 mb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="font-bold text-lg mt-3 mb-2">$1</h1>')
      
      // Links [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80">$1</a>')
      
      // Code blocks `code`
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
      
      // Bullet points
      .replace(/^• (.*$)/gm, '<li class="ml-2">$1</li>')
      
      // Line breaks
      .replace(/\n/g, '<br>');
  };

  const processedContent = parseMarkdown(content);

  // Wrap list items in ul tags
  const finalContent = processedContent
    .replace(/(<li.*?<\/li>)/g, (match, p1) => {
      if (!match.includes('<ul>')) {
        return `<ul class="list-disc list-inside space-y-1 my-2">${p1}</ul>`;
      }
      return p1;
    });

  return (
    <div 
      className={`prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: finalContent }}
    />
  );
};

export default MarkdownRenderer;
