<script lang="ts">
    import { actions } from 'astro:actions';
    import confetti from 'canvas-confetti';

    let { postId }: {postId: string} = $props();

    let likeCount = $state(0);
    let likeClicks = $state(0);
    let isLoading = $state(true);
    
    async function likePost() {
        likeCount += 1
        likeClicks += 1;
        
        const action = await actions.myAction({ name: 'Martin Reyes' })
        console.log(action);
        

        confetti({
            particleCount: 100,
            spread: 70,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        })
    }

    const getCurrentLikes = async () => {
        const { data, error } = await actions.getPostLikes( postId );

        if ( error ) {
            return alert(error)
        }        
        
        likeCount = data.likes;
        isLoading = false;
    }
    
    getCurrentLikes()

    
    $effect(() => {
        if (likeClicks === 0) return;

        (async () => {
            await actions.updatePostLikes({ postId: postId, increment: likeClicks })

            likeClicks = 0;
        })()

    });
</script>

{#if isLoading}
    <div>
        Loading...
    </div>

{:else}
    {#if likeCount === 0}
        <button onclick={likePost}>
            Like this post
        </button>    
    {:else}
        <button onclick={likePost}>
            Likes { likeCount }
        </button>
    {/if}
{/if}

{ likeClicks }

<style scoped>
    button {
        background-color: #5e51bc;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius:  4px;
        cursor: pointer;
        transition: all 0.3s;
    }

    button:hover {
        background-color: #4a3f9a;
    }
</style>