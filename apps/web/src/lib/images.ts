/**
 * Canonical image paths — maps rpweb source assets to website usage.
 * Source: github.com/ken-muritu/rpacademy/assets/images/
 */
export const images = {
  // Homepage hero (rpweb mobile: Kingdom Formation 1.JPG)
  hero: "/images/services/kingdom-formation-1.jpg",

  // 2026 theme — The Latter Rain (rpweb mobile: theme-2026-latter-rain.jpeg)
  theme2026: "/images/posters/theme-2026-latter-rain.jpeg",
  theme2026Gallery: [
    "/images/services/rain-of-mercy-1.jpg",
    "/images/services/rain-of-mercy-2.jpg",
    "/images/services/rain-of-mercy-3.jpg",
    "/images/services/rain-of-mercy-4.jpg",
    "/images/services/rain-of-mercy-5.jpg",
    "/images/services/rain-of-mercy-7.jpg",
  ] as const,

  // Service posters (rpweb mobile HomeScreen MEETINGS)
  sundayOnlinePoster: "/images/events/sunday-online-service-poster-1.jpeg",
  sundayOnlinePosterAlt: "/images/events/sunday-online-service-poster-2.jpeg",
  kingdomFormationPoster: "/images/events/kingdom-formation-poster.jpeg",

  // In-person worship photography (services gallery)
  sundayMainWorship: "/images/services/kingdom-formation-2.jpg",
  youthWorship: "/images/services/kingdom-formation-4.jpg",
  communityFellowship: "/images/services/kingdom-formation-6.jpg",
  visitWelcome: "/images/services/kingdom-formation-3.jpg",

  // Event posters (rpweb packages/shared/src/data/events.ts)
  events: {
    evangelism: "/images/events/evangelism-poster-2026.jpeg",
    praiseOutburst: "/images/events/praise-outburst-2026-poster.jpeg",
    bethelExperience: "/images/events/bethel-experience-2026.jpeg",
    cookout: "/images/events/cookout-poster-2026.jpeg",
    movieNight: "/images/events/movie-night-2026.jpeg",
  },

  // Academy / Kingdom Formation marketing
  academyHero: "/images/events/kingdom-formation-poster.jpeg",

  // Series artwork (ministry photography matched to series themes)
  series: {
    "fruit-of-spirit": "/images/services/kingdom-formation-12.jpg",
    foundations: "/images/services/kingdom-formation-6.jpg",
    "nature-of-priesthood": "/images/services/kingdom-formation-8.jpg",
    "finished-work": "/images/services/kingdom-formation-10.jpg",
    "sonship-identity": "/images/services/kingdom-formation-1.jpg",
    "morning-devotionals": "/images/services/rain-of-mercy-3.jpg",
    "gift-series": "/images/services/kingdom-formation-14-.jpg",
    "worship-devotion": "/images/services/kingdom-formation-15.jpg",
  } as Record<string, string>,

  // Leadership headshots (rpweb apps/web/public/images/team/, commit d7aa67d)
  team: {
    "charles-muchemi": "/images/team/charles-muchemi.jpg",
    "mark-mwangi": "/images/team/mark-mwangi.jpg",
    "salome-waruguru": "/images/team/salome-waruguru.jpg",
    "lucy-auma": "/images/team/lucy-auma.jpg",
    "mercy-zawadi": "/images/team/mercy-zawadi.jpg",
    "mary-wamuyu": "/images/team/mary-wamuyu.jpg",
    "gloria-kimaru": "/images/team/gloria-kimaru.jpg",
  } as const,
} as const;
