<script lang="ts">
    import type { FavoritePokemon } from "src/interfaces/favorite-pokemon";
    import { untrack } from "svelte";

    let { pokemon }: {pokemon: FavoritePokemon} = $props();
    let isVisible = $state(true);

    const imageSrc = untrack(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`)

    const deleteFavorite = () => {
        const favorites = JSON.parse(
            localStorage.getItem('favorites') ?? '[]'
        ) as FavoritePokemon[];

        const newFavorites = favorites.filter(p => p.id !== pokemon.id);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        
        isVisible = false;
    }
</script>

{#if isVisible}    
    <div class="flex flex-col justify-center items-center">
        <a href={`/pokemons/${pokemon.name}`}>
            <img src={imageSrc} alt={pokemon.name} width="96" height="96">

            <p>#{pokemon.id} {pokemon.name}</p>
        </a>

        <button onclick={deleteFavorite} class="bg-red-800 cursor-pointer p-2 rounded-2xl text-white">
            Borrar
        </button>
    </div>
{/if}