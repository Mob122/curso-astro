import { actions } from "astro:actions";
import { defineAction } from "astro:actions";
import { db, eq, Posts } from "astro:db";
import { string, z } from 'astro:schema';

export const updatePostLikes = defineAction({
    accept: 'json',
    input: z.object({
        postId: z.string(),
        increment: z.number()
    }),
    handler: async ({ postId, increment }) => {
        const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
        const row = posts[0];
        const exists = Boolean(row);
        const likes = typeof row?.likes === "number" ? row.likes : 0;

        if (!exists) {
            const newPost = {
                id: postId,
                title: 'Post not found',
                likes: 0
            };

            await db.insert(Posts).values(newPost);
            // posts.push(newPost);
        }

        // const post = posts.at(0)!;
        // post.likes = post?.likes + increment;

        await db.update(Posts).set(
            { likes: likes + increment }
        ).where(eq(Posts.id, postId))

        return true;
    }
})