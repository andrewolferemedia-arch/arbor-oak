import { SocialLink, PortfolioItem, Service } from './types';

export const COMPANY_NAME = "Arbor & Oak";
export const TAGLINE = "Agent Guided Tours • Cinematic Walkthroughs • Social Reels • HDR Photography";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/andre-wolfe-745948384/',
    handle: 'Andre Wolfe'
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/arboroakrealestatemedia/',
    handle: '@arboroakrealestatemedia'
  },
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61581291833905',
    handle: 'Arbor & Oak Media'
  },
  {
    platform: 'YouTube',
    url: 'https://www.youtube.com/@ArborOakREMedia',
    handle: 'Arbor & Oak Media'
  },
  {
    platform: 'Facebook', // Personal
    url: 'https://www.facebook.com/andre.wolfe.2025',
    handle: 'Andre Wolfe (Networking)'
  }
];

// HERO IMAGES - Place these files in public/images/
export const HERO_IMAGES = [
  { src: '/images/wacker-hero.jpg', alt: '363 E Wacker Dr High Rise' },
  { src: '/images/burr-ridge.jpg', alt: 'Burr Ridge Village Center' },
  { src: '/images/suburban-kitchen.jpg', alt: 'Luxury Kitchen Interior' }
];

export const PORTFOLIO_IMAGES: PortfolioItem[] = [
  // HIGH RISE / CITY (363 E Wacker)
  {
    id: 'wacker-1',
    src: '/images/wacker-hero.jpg',
    category: 'high-rise',
    title: '363 E Wacker Dr - Exterior'
  },
  {
    id: 'wacker-2',
    src: '/images/wacker-view.jpg',
    category: 'high-rise',
    title: 'Lake Michigan Views'
  },
  {
    id: 'wacker-3',
    src: '/images/wacker-living.jpg',
    category: 'high-rise',
    title: 'Open Concept Living'
  },
  {
    id: 'wacker-4',
    src: '/images/wacker-closet.jpg',
    category: 'high-rise',
    title: 'Custom Walk-In Closet'
  },
  {
    id: 'wacker-5',
    src: '/images/wacker-bath.jpg',
    category: 'high-rise',
    title: 'Marble Master Bath'
  },
  
  // COMMERCIAL (Burr Ridge & Retail)
  {
    id: 'comm-1',
    src: '/images/burr-ridge.jpg',
    category: 'commercial',
    title: 'Burr Ridge Village Center'
  },
  {
    id: 'comm-2',
    src: '/images/dental.jpg',
    category: 'commercial',
    title: '1st Family Dental'
  },
  {
    id: 'comm-3',
    src: '/images/qua.jpg',
    category: 'commercial',
    title: 'QUA Wellness'
  },

  // RESIDENTIAL / INTERIORS
  {
    id: 'res-1',
    src: '/images/suburban-ext.jpg',
    category: 'residential',
    title: 'Brick Ranch Estate'
  },
  {
    id: 'int-1',
    src: '/images/suburban-kitchen.jpg',
    category: 'interior',
    title: 'Modern White Kitchen'
  },
  {
    id: 'int-2',
    src: '/images/suburban-living.jpg',
    category: 'interior',
    title: 'Living Room Design'
  },
  {
    id: 'res-2',
    src: '/images/suburban-dining.jpg',
    category: 'residential',
    title: 'Formal Dining'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'photo',
    title: 'HDR Photography + Floor Plan',
    description: 'Crisp, bright, and perfectly composed interior/exterior shots. Includes a schematic 2D Floor Plan with room measurements. 12-24hr Turnaround.',
    icon: 'Camera',
    price: 'Starting at $150'
  },
  {
    id: 'longform',
    title: 'YouTube Walking Tour (20+ Min)',
    description: 'A detailed, immersive 20+ minute walkthrough. This is "Slow TV" for real estate, designed to capture the serious buyer watching on their living room TV.',
    icon: 'Youtube',
    price: 'Starting at $350'
  },
  {
    id: 'cinematic',
    title: 'Cinematic Highlight (1-2 Min)',
    description: 'A polished, music-driven highlight film. We capture the flow and emotion of the home. Perfect for Zillow, MLS, and rapid consumption.',
    icon: 'Film',
    price: 'Starting at $250'
  },
  {
    id: 'video',
    title: 'Social Reels (Vertical)',
    description: 'Fast-paced, trendy 30-60 second edits designed for Instagram and TikTok. We capture the hooks to stop the scroll.',
    icon: 'Video',
    price: 'Starting at $175'
  },
  {
    id: 'bundle',
    title: 'The Listing Launch Kit',
    description: 'Dominate the market. Includes HDR Photos + Floor Plan + Social Reels + The Long-Form YouTube Tour. The complete marketing partner package.',
    icon: 'Package',
    price: '$725 (Save $200+)'
  },
  {
    id: 'branding',
    title: 'Agent Branding',
    description: 'Professional headshots, lifestyle content, and "About Me" video intros to build your personal brand.',
    icon: 'User',
    price: 'Custom'
  }
];