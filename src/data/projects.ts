export type Project = {
  slug: string;
  title: string;
  tracks: string;       // one-line "what it tracks"
  blurb: string;        // a bit more, deadpan
  tech: string[];
  accent: 'pink' | 'lavender' | 'mint';
  thumb: string;        // path to pixel-art svg in /public
  href?: string;        // omitted while private
  comingSoon: boolean;
};

// Entries without an href ship as "coming soon" (their repos are private).
// To make one live: set comingSoon: false and add href — one-line edit.
export const projects: Project[] = [
  {
    slug: 'humor-do-dia',
    title: 'Humor do Dia',
    tracks: 'Tracks my daily humor.',
    blurb: 'A little log of my mood each day. Turns out I am mostly "fine". Deeply suspicious.',
    tech: ['JavaScript'],
    accent: 'pink',
    thumb: '/thumbs/humor-do-dia.svg',
    comingSoon: true,
  },
  {
    slug: 'isoca-spot',
    title: 'Isoca Spot',
    tracks: 'My Spotify stats: listening, genres, artists.',
    blurb: 'What I actually listen to, versus what I tell people I listen to.',
    tech: ['TypeScript'],
    accent: 'mint',
    thumb: '/thumbs/isoca-spot.svg',
    comingSoon: true,
  },
  {
    slug: 'isoca-radar',
    title: 'isoca-radar',
    tracks: 'Arbitrage on Polymarket, on paper.',
    blurb: 'A read-only lab that watched every order book for baskets priced under a dollar, and paper-traded them at six latencies. It never placed an order; it did teach me what a CPU limit is.',
    tech: ['Rust', 'TypeScript', 'WebAssembly'],
    accent: 'lavender',
    thumb: '/thumbs/isoca-radar.svg',
    href: 'https://radar.isoca.space',
    comingSoon: false,
  },
];
