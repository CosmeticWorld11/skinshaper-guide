
export interface ShareableContent {
  type: 'routine' | 'product' | 'chat' | 'look';
  title: string;
  description: string;
  imageUrl?: string;
  content: any;
  createdAt: Date;
  tags: string[];
}

export interface ShareOptions {
  platform: 'copy' | 'twitter' | 'facebook' | 'pinterest' | 'instagram';
  includeImage?: boolean;
  customMessage?: string;
}

class SocialSharingService {
  async shareContent(content: ShareableContent, options: ShareOptions): Promise<boolean> {
    const shareText = this.generateShareText(content, options.customMessage);
    const shareUrl = this.generateShareUrl(content);

    try {
      switch (options.platform) {
        case 'copy':
          await this.copyToClipboard(`${shareText}\n\n${shareUrl}`);
          return true;
        
        case 'twitter':
          this.openSocialWindow(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
          );
          return true;
        
        case 'facebook':
          this.openSocialWindow(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
          );
          return true;
        
        case 'pinterest':
          if (content.imageUrl) {
            this.openSocialWindow(
              `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(content.imageUrl)}&description=${encodeURIComponent(shareText)}`
            );
          }
          return true;
        
        case 'instagram':
          // Instagram doesn't support direct web sharing, so copy to clipboard
          await this.copyToClipboard(`${shareText}\n\n${shareUrl}\n\n#EcoSkinBeauty #SkinCare`);
          return true;
        
        default:
          return false;
      }
    } catch (error) {
      console.error('Error sharing content:', error);
      return false;
    }
  }

  private generateShareText(content: ShareableContent, customMessage?: string): string {
    if (customMessage) {
      return customMessage;
    }

    switch (content.type) {
      case 'routine':
        return `Check out this amazing ${content.title} from ECO Skin! 🌿✨ ${content.description}`;
      
      case 'product':
        return `Found this great eco-friendly beauty product: ${content.title} 💚 ${content.description}`;
      
      case 'chat':
        return `Got some amazing beauty advice from ECO Skin's AI assistant! 🤖💄`;
      
      case 'look':
        return `Loving this sustainable beauty look! 🌱💋 ${content.title}`;
      
      default:
        return `Check out this beauty tip from ECO Skin! 🌿`;
    }
  }

  private generateShareUrl(content: ShareableContent): string {
    const baseUrl = window.location.origin;
    
    switch (content.type) {
      case 'routine':
        return `${baseUrl}/skincare-planner?shared=${content.content.id}`;
      case 'product':
        return `${baseUrl}/recommendations?product=${content.content.id}`;
      default:
        return baseUrl;
    }
  }

  private async copyToClipboard(text: string): Promise<void> {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }

  private openSocialWindow(url: string): void {
    window.open(
      url,
      'social-share',
      'width=600,height=400,resizable=yes,scrollbars=yes'
    );
  }

  // Generate shareable content from different sources
  createShareableRoutine(routine: any): ShareableContent {
    return {
      type: 'routine',
      title: routine.name,
      description: `${routine.steps.length} step ${routine.timeOfDay} routine for ${routine.suitableFor.join(', ')} skin`,
      content: routine,
      createdAt: new Date(),
      tags: ['skincare', 'routine', ...routine.suitableFor]
    };
  }

  createShareableProduct(product: any): ShareableContent {
    return {
      type: 'product',
      title: `${product.brand} ${product.name}`,
      description: product.description,
      imageUrl: product.imageUrl,
      content: product,
      createdAt: new Date(),
      tags: ['beauty', 'product', product.category]
    };
  }

  createShareableChat(messages: any[]): ShareableContent {
    const lastBotMessage = messages.filter(m => !m.isUser).pop();
    
    return {
      type: 'chat',
      title: 'Beauty AI Consultation',
      description: lastBotMessage?.content.substring(0, 150) + '...' || 'Got amazing beauty advice!',
      content: { messages: messages.slice(-4) }, // Share last 4 messages
      createdAt: new Date(),
      tags: ['AI', 'beauty', 'consultation']
    };
  }
}

export const socialSharingService = new SocialSharingService();
