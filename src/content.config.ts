import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const stories = defineCollection({
  // Load Markdown and MDX files in the `src/content/stories/` directory.
  loader: glob({ base: "./src/content/stories", pattern: "**/*.md" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      publishedDate: z.coerce.date(),
      // updatedDate: z.coerce.date().optional(),
      coverImage: image(),
    }),
});

export const collections = { stories };
