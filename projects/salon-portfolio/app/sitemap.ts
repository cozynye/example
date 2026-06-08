import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, '');
  const staticRoutes = ['', '/hair/portfolio'];
  const demoRoutes = Array.from({ length: 15 }, (_, i) => `/hair/portfolio/${i + 1}`);

  return [...staticRoutes, ...demoRoutes].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : path === '/hair/portfolio' ? 0.9 : 0.7,
  }));
}
