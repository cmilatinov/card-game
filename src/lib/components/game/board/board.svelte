<script lang="ts">
    import { onMount} from 'svelte';
    import panzoom from 'panzoom';
    import { PlayingCard, type PlayingCardInfo } from '$lib/components/game/playing-card';

    export let id: string;
    export let cards: PlayingCardInfo[];

    let board: HTMLDivElement;

    const boardX = 7;
    const boardY = 3;

    const cellX = 120;
    const cellY = 120;

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
        )
    });
</script>

<div
    id="{id}"
    class="board relative flex h-full items-center justify-center board"
    style={
        `width: ${boardX * cellX + 1}px; height: ${boardY * cellY + 1}px;`+
        `background-size: ${cellX}px ${cellY}px;`
    }
    bind:this={board}
>
    <span class="font-semibold">Board</span>
    {#each cards as card}
        <PlayingCard id={id} cardHeight={cellY} cardLength={cellY}/>
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
