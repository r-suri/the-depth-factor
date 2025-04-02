// API service for interacting with Strapi backend

// Replace with your actual Strapi API URL
const API_URL = 'https://your-strapi-instance.elestio.app/api';

/**
 * Search for content based on user query
 * @param query User's search query
 * @returns Promise containing blog posts and YouTube videos
 */
export async function searchContent(query: string) {
  try {
    // This is a placeholder implementation
    // You'll need to adapt this to your actual Strapi API structure
    const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching content:', error);
    throw error;
  }
}

/**
 * Fetch featured blog posts
 * @returns Promise containing featured blog posts
 */
export async function getFeaturedBlogPosts() {
  try {
    const response = await fetch(`${API_URL}/blog-posts?featured=true`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

/**
 * Fetch featured YouTube videos
 * @returns Promise containing featured YouTube videos
 */
export async function getFeaturedVideos() {
  try {
    const response = await fetch(`${API_URL}/youtube-videos?featured=true`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
}

/**
 * Interface for the action buttons in AI responses
 */
export interface ActionButton {
  id: string;
  label: string;
  action: string;
}

/**
 * Interface for the AI chat response
 */
export interface AIChatResponse {
  content: string;
  buttons: ActionButton[];
}

/**
 * Get AI response to user message
 * @param message User's message/concern
 * @returns Promise containing AI response with action buttons
 */
export async function getAIResponse(message: string): Promise<AIChatResponse> {
  try {
    // In production, this would call your AI service endpoint
    // This is a placeholder mock implementation
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock response
    // Replace this with actual API call in production
    const actionButtons: ActionButton[] = [
      { 
        id: 'content', 
        label: 'Explore Related Content', 
        action: 'content' 
      },
      { 
        id: 'understanding', 
        label: 'Deeper Understanding', 
        action: 'understanding' 
      },
      { 
        id: 'steps', 
        label: 'Steps to Take', 
        action: 'steps' 
      }
    ];
    
    return {
      content: `I understand that you're dealing with "${message}". This is a common challenge many people face. Let me help you navigate this situation from a depth psychology perspective.`,
      buttons: actionButtons
    };
    
    // Actual implementation would be like:
    // const response = await fetch(`${API_URL}/ai-chat`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ message }),
    // });
    // 
    // if (!response.ok) {
    //   throw new Error('Failed to get AI response');
    // }
    // 
    // return await response.json();
    
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw error;
  }
} 