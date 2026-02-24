import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

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

const partners = defineCollection({
  loader: glob({ base: "./src/content/partners", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      website: z.string().url().optional(),
      logo: image().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      status: z.enum(["ongoing", "completed", "planned"]).default("ongoing"),
      donor: reference("partners").optional(),
      location: z.string().optional(),
      coverImage: image().optional(),
    }),
});

export const collections = { stories, partners, projects };
