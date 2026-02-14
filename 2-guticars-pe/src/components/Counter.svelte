<script lang="ts">
    import type { Snippet } from "@astrojs/svelte/svelte-shims.d.ts";

    
    let { initValue, children }: {initValue: number, children: Snippet } = $props();

    let contador = $derived(initValue);
</script>

<div>

    {@render children?.()}
    
    <h1>Contador</h1>
    <h3>Valor: {contador}</h3>

    <button class="btn" onclick={() => contador = contador + 1}>+1</button>
    <button class="btn" onclick={() => contador = contador - 1}>-1</button>
</div>