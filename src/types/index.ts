export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  thumbnail: string;
  link: string;
  linkLabel: string;
  featured: boolean;
  year: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  period: string;
  description: string;
  highlights: string[];
  logo?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export interface NavigationItem {
  href: string;
  label: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  source: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface RawArticle {
  rowId: string;
  rawText: string;
  status: 'pending' | 'processed';
  processedAt?: string;
}

export interface PublishedArticle {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  readTime: string;
  publishedAt: string;
}

export interface OllamaResponse {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  readTime: string;
}
