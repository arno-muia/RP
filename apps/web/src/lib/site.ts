export const site = {
  name: "Royal Priesthood Embassy",
  shortName: "Royal Priesthood",
  tagline: "In Nairobi As It Is In Heaven",
  description:
    "We are a life-giving church in Nairobi, Kenya. We want to see people love God, love people, and change the world.",
  address: {
    street: "Embassy Gardens, Nairobi",
    city: "Nairobi",
    country: "Kenya",
  },
  serviceTimes: ["8:30 AM", "10:00 AM", "11:30 AM"],
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
} as const;

export const navLinks = {
  primary: [
    { label: "New Here?", href: "/visit" },
    { label: "About", href: "/about" },
    { label: "Sermons", href: "/sermons" },
    { label: "Events", href: "/events" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Give", href: "/giving" },
  ],
  ministries: [
    { label: "Royal Kids", href: "/kids" },
    { label: "Royal Youth", href: "/youth" },
    { label: "Young Adults", href: "/young-adults" },
    { label: "Royal Women", href: "/women" },
    { label: "Royal Men", href: "/men" },
  ],
  connect: [
    { label: "Small Groups", href: "/groups" },
    { label: "Next Steps", href: "/next-steps" },
    { label: "Care", href: "/care" },
  ],
} as const;

export const events = [
  {
    title: "Baptism Sunday",
    date: "April 12, 2026",
    location: site.name,
    href: "/events/baptism-sunday",
    image:
      "https://images.unsplash.com/photo-1507692049790-ef8ecb2d88a0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Crew Nights",
    date: "April 17, 2026",
    location: site.name,
    href: "/events/crew-nights",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Community Outreach",
    date: "April 18, 2026",
    location: "Nairobi",
    href: "/events/outreach",
    image:
      "https://images.unsplash.com/photo-1469571488312-7edb45a3da69?auto=format&fit=crop&w=800&q=80",
  },
] as const;

export const ministries = [
  {
    title: "Next Gen",
    href: "/next-gen",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Young Adults",
    href: "/young-adults",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Women",
    href: "/women",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Men",
    href: "/men",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
] as const;

export const latestSermon = {
  title: "Walking in Royal Identity",
  speaker: "Pastor Kennedy",
  date: "June 8, 2026",
  href: "/sermons/walking-in-royal-identity",
  image:
    "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80",
} as const;
