import { defineCollection, z } from 'astro:content';

const listings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    city: z.string(),
    description: z.string(),
    website: z.string().url().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    featured: z.boolean().default(false),
    updated: z.coerce.date().optional()
  })
});

export const collections = { listings };
