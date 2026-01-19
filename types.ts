
export interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  category: string;
  materials?: string[];
  standards?: string[];
  specifications?: Record<string, string>;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface Achievement {
  id: string;
  stat: string;
  label: string;
  icon: string;
}

export interface Market {
  name: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

export interface Award {
  id: string;
  title: string;
  year: string;
  organization: string;
  description: string;
  icon: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}
