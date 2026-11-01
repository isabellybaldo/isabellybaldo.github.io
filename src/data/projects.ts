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
  {
    slug: 'isoca-play',
    title: 'isoca-play',
    tracks: 'Mahjong and sudoku, for one player on a phone.',
    blurb: 'Two pixel-art games behind a single password, with no ads, no trackers and no requests to anyone else. The tile art is original and lives in the repo; the tips name the sudoku move instead of just pointing at it, and only when asked.',
    tech: ['TypeScript', 'React', 'Python'],
    accent: 'mint',
    thumb: '/thumbs/isoca-play.svg',
    href: 'https://github.com/isabellybaldo/isoca-play',
    comingSoon: false,
  },
];
