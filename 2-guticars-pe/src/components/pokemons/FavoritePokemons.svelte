<script lang="ts">
    import type { FavoritePokemon } from "src/interfaces/favorite-pokemon";
    import FavoritePokemonCard from "./FavoritePokemonCard.svelte";

    const getLocalStoragePokemons = (): FavoritePokemon[] => {
        const favoritePokemons = JSON.parse(localStorage.getItem('favorites') ?? '')

        return favoritePokemons
    }

    let pokemons = $state(getLocalStoragePokemons());
</script>

<div class="grid grid-cols-2 sm:grid-cols-4">
    {#each pokemons as pokemon}
        <FavoritePokemonCard pokemon={pokemon} />
    {/each}
</div>