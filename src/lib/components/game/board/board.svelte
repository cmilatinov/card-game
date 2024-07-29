<script lang="ts">
    import { onMount, setContext } from 'svelte';
    import panzoom from 'panzoom';
    import {
        PlayingCard,
    } from '$lib/components/game/playing-card';
    import { writable } from 'svelte/store';
    import { gameState } from '@/stores/game';
    import _ from 'lodash';

    export let playerId: string;

    let boardRef: HTMLDivElement;
    
    const board = writable([7, 3]);
    const grid = writable([120, 120]);
    setContext('grid', grid);

    onMount(() => {
        panzoom(
            boardRef,
            {
                minZoom: 1,
                maxZoom: 1,
                pinchSpeed: 0,
                beforeWheel(e) {
                    return true;
                }
            }
        );
    });
</script>

<div
    class="board relative flex h-full items-center justify-center board"
    style={
        `width: ${$board[0] * $grid[0] + 1}px; height: ${$board[1] * $grid[1] + 1}px;`+
        `background-size: ${$grid[0]}px ${$grid[1]}px;`
    }
    bind:this={boardRef}
>
    <span class="font-semibold">Board</span>
    {#each $gameState.players[playerId].board as card, idx}
        <PlayingCard 
            card={card}
            setCard={(value) => {               
                $gameState.players[playerId].board[idx] = _.merge(card, value);
            }}
        />
    {/each}
    <slot />
</div>

<style lang="scss">
    .board {
        background-image:
                repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
                repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);

    }
</style>
