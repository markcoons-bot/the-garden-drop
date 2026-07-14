import type { MetadataRoute } from 'next';
import siteConfig from '~/site.config';
import { getIssues, getPlants, getTechniques } from '@/lib/db';

/**
 * The sitemap is generated from the database, not from a hand-kept list, so a
 * published issue is discoverable the moment it goes live and a draft never is.
 * getIssues/getPlants/getTechniques already filter to `status: 'published'`.
 */

const BASE = siteConfig.url.replace(/\/$/, '');
const url = (path: string) => `${BASE}${path}`;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [issues, plants, techniques] = await Promise.all([
    getIssues(),
    getPlants(),
    getTechniques(),
  ]);

  const newest = (dates: string[]): Date => {
    const times = dates.map((d) => new Date(d).getTime()).filter((t) => Number.isFinite(t));
    return times.length ? new Date(Math.max(...times)) : new Date();
  };

  const latestIssue = newest(issues.map((i) => i.updatedAt));
  const latestPlant = newest(plants.map((p) => p.updatedAt));
  const latestTechnique = newest(techniques.map((t) => t.updatedAt));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: url('/'),
      lastModified: newest([...issues, ...plants, ...techniques].map((e) => e.updatedAt)),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: url('/issues'),
      lastModified: latestIssue,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: url('/plants'),
      lastModified: latestPlant,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: url('/techniques'),
      lastModified: latestTechnique,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: url('/about'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: url('/submit'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: url('/partner'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const issueRoutes: MetadataRoute.Sitemap = issues.map((issue) => ({
    url: url(`/issues/${issue.slug}`),
    lastModified: new Date(issue.updatedAt),
    // An issue is finished when it ships. It changes only for corrections.
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const plantRoutes: MetadataRoute.Sitemap = plants.map((plant) => ({
    url: url(`/plants/${plant.slug}`),
    lastModified: new Date(plant.updatedAt),
    // Plant pages are living records: availability, prices and verdicts move.
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const techniqueRoutes: MetadataRoute.Sitemap = techniques.map((technique) => ({
    url: url(`/techniques/${technique.slug}`),
    lastModified: new Date(technique.updatedAt),
    // Evidence accumulates; these are the pages most likely to be re-scored.
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...issueRoutes, ...plantRoutes, ...techniqueRoutes];
}
