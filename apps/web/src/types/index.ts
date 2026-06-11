export interface Sermon {
  id: string;
  slug: string;
  title: string;
  description: string;
  series: string;
  seriesSlug: string;
  scripture?: string;
  speaker: string;
  date: string;
  videoUrl: string;
  audioUrl?: string;
  notesUrl?: string;
  thumbnail: string;
  duration?: string;
  tags: string[];
  published: boolean;
}

export interface SermonSeries {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  sermonCount: number;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: "service" | "special" | "outreach" | "training";
  registrationRequired: boolean;
  registrationUrl?: string;
  published: boolean;
  status: "upcoming" | "ongoing" | "past";
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  order: number;
  social?: {
    facebook?: string;
    instagram?: string;
  };
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role?: string;
  photo?: string;
}

export interface ServiceTime {
  name: string;
  day: string;
  time: string;
  platform: "physical" | "online";
  location?: string;
  link?: string;
  description?: string;
  image?: string;
}

export interface AcademyModule {
  id: string;
  title: string;
  description: string;
  instructor: string;
  lessonsCount: number;
  duration: string;
  order: number;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  scripture: string;
  description: string;
  address: {
    street: string;
    city: string;
    country: string;
    mapsUrl: string;
  };
  contact: {
    email: string;
    whatsapp?: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  giving: {
    mpesaTill: string;
    accountName: string;
  };
  academyUrl: string;
  theme2026: {
    title: string;
    scripture: string;
    scriptureText: string;
    image?: string;
  };
}

export interface Belief {
  id: string;
  title: string;
  description: string;
}

export interface Value {
  id: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface WhatToExpectItem {
  title: string;
  description: string;
  icon: string;
}
