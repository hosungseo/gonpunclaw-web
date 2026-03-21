import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { getAllUseCases } from '@/lib/data';

const BASE_URL = 'https://gonpunclaw.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const usecases = getAllUseCases();

  const usecaseEntries: MetadataRoute.Sitemap = usecases.map((uc) => ({
    url: `${BASE_URL}/usecase/${uc.no}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...usecaseEntries,
  ];
}
