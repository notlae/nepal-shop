import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: 'daily' },
    { url: `${baseUrl}/products`, priority: 0.8, changeFrequency: 'daily' },
    { url: `${baseUrl}/product-detail`, priority: 0.8, changeFrequency: 'weekly' },
  ];
}