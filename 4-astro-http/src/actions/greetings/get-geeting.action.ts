import { defineAction } from "astro:actions";
import { z } from "astro:content";

export const myAction = defineAction({
    input: z.object({
        name: z.string()
    }),
    handler: async (input) => {
        return `Hello, ${input.name}!`;
    }
})