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

// Real repos are private for now, so these ship as "coming soon".
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
];
