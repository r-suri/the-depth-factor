// Common Strapi response types
export interface StrapiResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

export interface StrapiMeta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

// Blog types
export interface Blog {
  id: number;
  documentId: string;
  title: string;
  spotlight?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featured_img?: any;
  subniche?: {
    id: number;
    documentId: string;
    subniche: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  blog_content?: any[];
}

// Subniche types
export interface Subniche {
  id: number;
  documentId: string;
  subniche: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
} 