<script lang="ts">
    import { onMount, setContext } from 'svelte';
    import panzoom from 'panzoom';
    import {
        PlayingCard,
    } from '$lib/components/game/playing-card';
    import { derived, writable } from 'svelte/store';
    import { gameState } from '@/stores/game';

    export let playerId: string;

    const playerState = derived(gameState, $s => $s.players[playerId])

    let board: HTMLDivElement;


    const boardX = 7;
    const boardY = 3;

    const cellX = 120;
    const cellY = 120;

    const grid = writable([cellX, cellY]);
    setContext('grid', grid);

    $: sizeY = $$props.cardHeight - 20;
    $: sizeX = sizeY * 5 / 7;
    $: offsetX = ($$props.cardLength - sizeX) / 2;
    $: offsetY = ($$props.cardHeight - sizeY) / 2;

    onMount(() => {
        panzoom(
            board,
            {
                minZoom: 1,
                maxZoom: 1,
                pinchSpeed: 0,
                beforeWheel(e) {
                    return true;
                }
            }
        );
    //     interact(`.playing-card`).draggable({
    //         // TODO: Think about tracking cards
    //         onmove: (interactable) => {
    //             let card = interactable.target as HTMLDivElement;
    //             card.dataset['card-x'] = Number(card.dataset['card-x']) + interactable.dx;
    //             card.dataset['card-y'] = Number(card.dataset['card-y']) + interactable.dy;
    //         },
    //         modifiers: [
    //             interact.modifiers.snap({
    //                 origin: board,
    //                 endOnly: true,
    //                 offset: (interactable) => {
    //                     const card = interactable.element as HTMLDivElement;
    //                     const tapped = card.dataset['card-tapped'] === 'true';
    //                     return {
    //                         top: tapped ? offsetX : offsetY,
    //                         left: tapped ? offsetY : offsetX,
    //                         bottom: tapped ? offsetX : offsetY,
    //                         right: tapped ? offsetY : offsetX,
    //                     }
    //                 },
    //                 targets: [
    //                     interact.createSnapGrid({ x: cellX, y: cellY })
    //                 ],
    //                 range: Infinity,
    //                 relativePoints: [
    //                     {
    //                         x: 0,
    //                         y: 0
    //                     }
    //                 ]
    //             }),
    //             interact.modifiers.restrict({
    //                 restriction: board,
    //                 endOnly: true,
    //                 elementRect: {
    //                     top: 0,
    //                     left: 0,
    //                     bottom: 1,
    //                     right: 1,
    //                 }
    //             })
    //         ]
    //     });
    });
</script>

<div
    class="board relative flex h-full items-center justify-center board"
    style={
        `width: ${boardX * cellX + 1}px; height: ${boardY * cellY + 1}px;`+
        `background-size: ${cellX}px ${cellY}px;`
    }
    bind:this={board}
>
    <span class="font-semibold">Board</span>
    {#each $playerState.board as card}
        <PlayingCard
            cardHeight={cellY}
            cardLength={cellY}
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
