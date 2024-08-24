<script lang="ts">
    import { onMount } from 'svelte';
    import {
        PlayingCard
    } from '$lib/components/game/playing-card';
    import { derived } from 'svelte/store';
    import { gameState } from '@/stores/game';
    import { createSwapy } from 'swapy';

    export let playerId: string;
    export let showHand: boolean = false;
    export let interactive: boolean = false;

    const player = derived(gameState, $s => $s.players.get(playerId));

    const rows = 2;
    const columns = 3;

    $: gridItems = Array.from({ length: rows * columns }, (_, i) => i + 1);

    let el: HTMLDivElement;

    onMount(() => {
        if (el && interactive) {
            createSwapy(el);
        }
    });
</script>


<div
    id={`board-${playerId}`}
    class="grid h-full w-full"
    style={`grid-template-columns: repeat(${columns}, 1fr); grid-template-rows: repeat(${ showHand ? rows + 1 : rows }, 1fr)`}
    bind:this={el}
>
    {#each gridItems as id}
        <div
            class="border border-dotted border-black flex items-center justify-center"
            data-swapy-slot={`player-${playerId}-grid-${id}`}
        >
            {#if $player?.board.has(id) }
                {@const card = $player?.board.get(id) }
                {#if card}
                    <PlayingCard
                        card={card}
                    />
                {/if}
            {/if}
        </div>
    {/each}
    {#if showHand}
        <div
            class="flex flex-row gap-1 col-span-full p-2"
        >
            {#each { length: 8 } as _, index}
                {#if $player}
                    <div
                        class="h-1/2 w-1/2"
                        data-swapy-slot={`player-${playerId}-hand-${index}`}
                    >
                        {#if index in $player.hand}
                            {@const card = $player.hand[index]}
                            <div data-swapy-item={card.id}>
                                <img class="playing-card" src="{card.image_uris?.normal}" alt="{card.name}" />
                            </div>
                        {/if}
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</div>