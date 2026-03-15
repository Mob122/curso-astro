import { myAction } from "./greetings/get-geeting.action";
import { getPostLikes } from "./posts/get-post-likes.action";
import { updatePostLikes } from "./posts/update-kies.action";

export const server = {
    myAction,
    getPostLikes,
    updatePostLikes
}