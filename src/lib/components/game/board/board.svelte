<script lang="ts">
    import { onMount } from 'svelte';
    import {
        BoardCard,
        PlayingCard
    } from '$lib/components/game/playing-card';
    import { type PlayerState } from '@/stores/game';
    import { createSwapy } from 'swapy';
    import { range } from '$lib/utils';

    export let showHand: boolean = false;
    export let interactive: boolean = false;
    export let player: PlayerState;

    const rows = 2;
    const columns = 12;

    let element: HTMLDivElement;

    onMount(() => {
        if (element && interactive) {
            createSwapy(element);
        }
    });
</script>


<div
    id={`board-${player.id}`}
    class="grid h-full w-full px-12"
    style={`grid-template-columns: repeat(${columns}, 1fr); grid-template-rows: repeat(${ showHand ? rows + 1 : rows }, 1fr); grid-auto-rows: auto;`}
    bind:this={element}
>
    {#each range(rows * columns) as id}
        <div
            class="border border-dotted border-black flex items-center justify-center"
            data-swapy-slot={`player-${player.id}-grid-${id}`}
        >
            {#if player.board.has(id) }
                {@const card = player.board.get(id) }
                {#if card}
                    <BoardCard card={card} />
                {/if}
            {/if}
        </div>
    {/each}
    {#if showHand}
        <div class="flex flex-row gap-1 col-span-full p-2">
            {#each range(8) as index}
                <div data-swapy-slot={`player-${player.id}-hand-${index}`}>
                    {#if index in player.hand}
                        {@const card = player.hand[index]}
                        <div data-swapy-item={card.id}>
                            <PlayingCard info={card} />
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</div>