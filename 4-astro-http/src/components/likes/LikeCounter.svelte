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
        const resp = await fetch(`/api/posts/likes/${ postId }`);
        if ( !resp.ok ) return;

        const data = await resp.json();
        
        likeCount = data.likes;
        isLoading = false;
    }
    
    getCurrentLikes()

    
    $effect(() => {
        if (likeClicks === 0) return;

        fetch(`/api/posts/likes/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ likes: likeClicks })
        });

        likeClicks = 0;
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