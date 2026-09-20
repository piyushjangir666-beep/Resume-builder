export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  plan: 'free' | 'pro' | 'career';
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin';
  plan: 'free' | 'pro' | 'career';
}
