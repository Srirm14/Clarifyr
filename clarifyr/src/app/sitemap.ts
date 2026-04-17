import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog/posts'

const BASE_URL = 'https://clarifyr.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = BLOG_POSTS.map(post => ({
    url:          `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority:     0.7,
  }))

  return [
    {
      url:             BASE_URL,
      lastModified:    new Date(),
      changeFrequency: 'weekly',
      priority:        1,
    },
    {
      url:             `${BASE_URL}/blog`,
      lastModified:    new Date(),
      changeFrequency: 'weekly',
      priority:        0.8,
    },
    {
      url:             `${BASE_URL}/privacy`,
      lastModified:    new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority:        0.3,
    },
    {
      url:             `${BASE_URL}/terms`,
      lastModified:    new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority:        0.3,
    },
    ...blogUrls,
  ]
}
