import { defineCollection, z } from 'astro:content';

const listings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    category: z.string(),
    city: z.string(),
    description: z.string(),
    website: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    hours: z.string().optional(),
    rating: z.coerce.number().optional(),
    priceRange: z.enum(['$', '$$', '$$$']).optional(),
    bestFor: z.array(z.string()).default([]),
    outsideFoodPolicy: z.string().optional(),
    outsideFoodCost: z.string().optional(),
    maps: z.string().optional(),
    mapsPlaceUrl: z.string().optional(),
    googlePlaceId: z.string().optional(),
    lastVerified: z.string().optional(),
    status: z.enum(['active', 'closed']).default('active'),
    source: z.string().optional(),
    featured: z.boolean().default(false),
    updated: z.coerce.date().optional()
  })
});

export const collections = { listings };
