<script lang="ts">
    import { currentPlayer } from '@/stores/game';
    import { onMount } from 'svelte';
    import { createSwapy } from 'swapy';

    let hand: HTMLDivElement;

    onMount(() => {
        createSwapy(hand)
    })
</script>

<div class="w-full flex items-center justify-center" bind:this={hand}>
    {#each $currentPlayer.hand as card, index}
        <div data-swapy-slot={`hand-${index}`}>
            <div data-swapy-item={card.id}>
                <img class="pointer-events-none" src="{card.img}" alt="{card.name}"/>
            </div>
        </div>
    {/each}
</div>