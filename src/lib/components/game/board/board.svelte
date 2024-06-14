<script lang="ts">
    import { onMount, setContext } from 'svelte';
    import panzoom from 'panzoom';
    import { writable, readonly } from 'svelte/store';

    export let id: string;

    let board: HTMLDivElement;


    const boardX = writable(7);
    const boardY = writable(3);

    const cellX = writable(120);
    const cellY = writable(120);

    const context = {
        boardSize: {
            x: readonly(boardX),
            y: readonly(boardY),
        },
        gridSize: {
            cellX: readonly(cellX),
            cellY: readonly(cellY)
        }
    };

    setContext('board', context);

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
        `width: ${$boardX * $cellX + 1}px; height: ${$boardY * $cellY + 1}px;`+
        `background-size: ${$cellX}px ${$cellY}px;`
    }
    bind:this={board}
>
    <span class="font-semibold">Board</span>
    <slot />
</div>

<style lang="scss">
    .board {
        background-image:
                repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
                repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);

    }
</style>
