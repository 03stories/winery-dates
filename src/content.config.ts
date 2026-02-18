import { defineCollection, z } from 'astro:content';

const listings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    city: z.string(),
    description: z.string(),
    website: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    hours: z.string().optional(),
    rating: z.coerce.number().optional(),
    outsideFoodPolicy: z.string().optional(),
    outsideFoodCost: z.string().optional(),
    maps: z.string().optional(),
    featured: z.boolean().default(false),
    updated: z.coerce.date().optional()
  })
});

export const collections = { listings };
