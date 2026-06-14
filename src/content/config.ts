import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(""),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().optional().default("Uncategorized"),
    tags: z.array(z.string()).optional().default([]),
    thumbnail: z.string().optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().optional().default(false),
    slug: z.string().optional(),
    refCount: z.number().optional(),
  }),
});

export const collections = { blog };