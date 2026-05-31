import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.digimationflight.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/portal-dashboard/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
