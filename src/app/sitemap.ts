import type { MetadataRoute } from 'next';
import { getAllUseCases } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const usecases = getAllUseCases();

  const usecaseEntries: MetadataRoute.Sitemap = usecases.map((uc) => ({
    url: `${SITE_URL}/usecase/${uc.no}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...usecaseEntries,
  ];
}
