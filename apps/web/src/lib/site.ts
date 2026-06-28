import siteData from "../../content/site.json";

export const site = {
  name: siteData.name,
  shortName: siteData.shortName,
  tagline: siteData.tagline,
  scripture: siteData.scripture,
  description: siteData.description,
  address: siteData.address,
  contact: siteData.contact,
  social: siteData.social,
  giving: siteData.giving,
  academyUrl: siteData.academyUrl,
  theme2026: siteData.theme2026,
} as const;

export const navLinks = {
  primary: [
    { label: "About", href: "/about" },
    { label: "Sermons", href: "/sermons" },
    { label: "Visit", href: "/visit" },
    { label: "Events", href: "/events" },
    { label: "Academy", href: "/academy" },
    { label: "Partner", href: "/give" },
  ],
  media: [
    { label: "Sermons", href: "/sermons" },
  ],
  connect: [
    { label: "Contact", href: "/contact" },
    { label: "Prayer Request", href: "/prayer" },
  ],
} as const;
