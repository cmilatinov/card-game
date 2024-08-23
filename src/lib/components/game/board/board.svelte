<script lang="ts">
    import { onMount } from 'svelte';
    import {
        PlayingCard,
    } from '$lib/components/game/playing-card';
    import { derived } from 'svelte/store';
    import { gameState } from '@/stores/game';
    import { createSwapy } from 'swapy';

    export let playerId: string;

    const playerState = derived(gameState, $s => $s.players[playerId])

    let board: HTMLDivElement;

    const rows = 2;
    const columns = 3;

    $: gridItems = Array.from({ length: rows * columns }, (_, i) => i + 1);

    onMount(() => {
        createSwapy(board)
        // panzoom(
        //     board,
        //     {
        //         minZoom: 1,
        //         maxZoom: 1,
        //         pinchSpeed: 0,
        //         beforeWheel(e) {
        //             return true;
        //         }
        //     }
        // );
    });
</script>

<div
    class="grid h-full w-full"
    style={`grid-template-columns: repeat(${columns}, 1fr); grid-template-rows: repeat(${rows}, 1fr)`}
    bind:this={board}
>
    {#each gridItems as id}
        <div class="border border-black flex items-center justify-center" data-swapy-slot={`player-${playerId}-grid-${id}`}>
            {#if id in $playerState.board }
                <PlayingCard
                    card={$playerState.board[id]}
                />
            {/if}
        </div>
    {/each}
    <slot />
</div>