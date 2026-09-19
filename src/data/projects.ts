export type Project = {
  title: string;
  blurb: string;
  tech: string[];
  href?: string;      // omitted while private
  comingSoon: boolean;
};

export const projects: Project[] = [
  {
    title: 'humor-do-dia',
    blurb: 'A small thing I built for me. Public version pending my nerve.',
    tech: ['JavaScript'],
    comingSoon: true,
  },
  {
    title: 'isoca_spot',
    blurb: 'Another side project living in private for now. Coming out eventually.',
    tech: ['TypeScript'],
    comingSoon: true,
  },
];
