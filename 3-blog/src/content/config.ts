import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        image: z.string(),

        // Relación.
        // author: z.string(),
        author: reference('author'),

        // Relación,
        tags: z.array(z.string()),

        // Boolean.
        isDraft: z.boolean().default(false)
    })
})

const authorCollection = defineCollection({
    type: 'data',
    schema: ({ image }) => z.object({
        name: z.string(),
        avatar: image(),
        twitter: z.string().optional(),
        linkedIn: z.string().optional(),
        github: z.string().optional(),
        bio: z.string().optional(),
        subtitle: z.string().optional()
    })
})

export const collections = {
    blog: blogCollection,
    author: authorCollection
}