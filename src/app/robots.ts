import type { MetadataRoute } from 'next';
import siteConfig from '~/site.config';

/** Everything editorial is public. The admin screens and the API are not. */

const BASE = siteConfig.url.replace(/\/$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api', '/api/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
