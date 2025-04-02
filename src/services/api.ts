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