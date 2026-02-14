import type { Project, FeaturedItem, Category } from '../backend';
import { Category as CategoryEnum } from '../backend';

export const placeholderProjects: Project[] = [
  {
    id: BigInt(1),
    title: 'Neon Dreams Campaign',
    description: 'A futuristic social media campaign featuring holographic elements and cyberpunk aesthetics.',
    imageUrl: '/assets/generated/portfolio-thumb-01.dim_1200x900.png',
    category: CategoryEnum.SocialMedia,
    isFeatured: true,
  },
  {
    id: BigInt(2),
    title: 'Cyber Concert Poster',
    description: 'High-energy poster design with neon typography and 3D depth effects.',
    imageUrl: '/assets/generated/portfolio-thumb-02.dim_1200x900.png',
    category: CategoryEnum.Posters,
    isFeatured: false,
  },
  {
    id: BigInt(3),
    title: 'Tech Channel Thumbnails',
    description: 'Eye-catching YouTube thumbnails with sci-fi UI elements and bold text.',
    imageUrl: '/assets/generated/portfolio-thumb-03.dim_1200x900.png',
    category: CategoryEnum.Thumbnails,
    isFeatured: false,
  },
  {
    id: BigInt(4),
    title: 'Quantum Tech Logo',
    description: 'Modern tech logo with holographic gradient and geometric precision.',
    imageUrl: '/assets/generated/portfolio-thumb-04.dim_1200x900.png',
    category: CategoryEnum.Logos,
    isFeatured: true,
  },
  {
    id: BigInt(5),
    title: 'Future Print Magazine',
    description: 'Editorial design for a tech magazine with bold layouts and neon accents.',
    imageUrl: '/assets/generated/portfolio-thumb-05.dim_1200x900.png',
    category: CategoryEnum.Print,
    isFeatured: false,
  },
  {
    id: BigInt(6),
    title: 'Holographic Packaging',
    description: 'Premium product packaging with iridescent finishes and modern typography.',
    imageUrl: '/assets/generated/portfolio-thumb-06.dim_1200x900.png',
    category: CategoryEnum.Packaging,
    isFeatured: false,
  },
  {
    id: BigInt(7),
    title: 'Social Grid Series',
    description: 'Cohesive Instagram grid with cyberpunk themes and neon color palette.',
    imageUrl: '/assets/generated/portfolio-thumb-07.dim_1200x900.png',
    category: CategoryEnum.SocialMedia,
    isFeatured: false,
  },
  {
    id: BigInt(8),
    title: 'Electric Festival Poster',
    description: 'Dynamic event poster with glowing elements and motion blur effects.',
    imageUrl: '/assets/generated/portfolio-thumb-08.dim_1200x900.png',
    category: CategoryEnum.Posters,
    isFeatured: true,
  },
  {
    id: BigInt(9),
    title: 'Gaming Thumbnails Pack',
    description: 'High-impact gaming thumbnails with 3D text and energy effects.',
    imageUrl: '/assets/generated/portfolio-thumb-09.dim_1200x900.png',
    category: CategoryEnum.Thumbnails,
    isFeatured: false,
  },
  {
    id: BigInt(10),
    title: 'Nexus Brand Identity',
    description: 'Complete brand identity system with futuristic logo and color system.',
    imageUrl: '/assets/generated/portfolio-thumb-10.dim_1200x900.png',
    category: CategoryEnum.Logos,
    isFeatured: false,
  },
  {
    id: BigInt(11),
    title: 'Tech Brochure Design',
    description: 'Corporate brochure with clean layouts and holographic accents.',
    imageUrl: '/assets/generated/portfolio-thumb-11.dim_1200x900.png',
    category: CategoryEnum.Print,
    isFeatured: false,
  },
];

export const placeholderFeaturedItems: FeaturedItem[] = [
  {
    id: BigInt(1),
    projectId: BigInt(1),
    title: 'Neon Dreams Campaign',
    description: 'Award-winning social media campaign that redefined cyberpunk aesthetics for modern brands.',
    imageUrl: '/assets/generated/featured-mockup-01.dim_1600x1000.png',
  },
  {
    id: BigInt(2),
    projectId: BigInt(4),
    title: 'Quantum Tech Branding',
    description: 'Complete brand identity for a cutting-edge AI startup, featuring holographic elements.',
    imageUrl: '/assets/generated/featured-mockup-02.dim_1600x1000.png',
  },
  {
    id: BigInt(3),
    projectId: BigInt(8),
    title: 'Electric Festival Experience',
    description: 'Immersive visual campaign for a major electronic music festival with 3D motion graphics.',
    imageUrl: '/assets/generated/featured-mockup-03.dim_1600x1000.png',
  },
];

export function getCategoryFromString(categoryStr: string): Category {
  const normalized = categoryStr.toLowerCase().replace(/\s+/g, '');
  switch (normalized) {
    case 'socialmedia':
      return CategoryEnum.SocialMedia;
    case 'posters':
      return CategoryEnum.Posters;
    case 'thumbnails':
      return CategoryEnum.Thumbnails;
    case 'logos':
      return CategoryEnum.Logos;
    case 'print':
      return CategoryEnum.Print;
    case 'packaging':
      return CategoryEnum.Packaging;
    default:
      return CategoryEnum.SocialMedia;
  }
}
