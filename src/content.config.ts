import { defineCollection, z } from "astro:content";

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
  }),
});

export const collections = {
  notes,
};
