<script lang="ts">
    import * as Resizable from '$lib/components/ui/resizable';
    import { PlayingCard } from '$lib/components/game/playing-card';
    import { writable } from 'svelte/store';
    let tapped = writable(true);
</script>

<div class="w-screen h-screen">
    <Resizable.PaneGroup direction="horizontal">
        <Resizable.Pane defaultSize={75}>
            <div class="relative flex h-full items-center justify-center board">
                <span class="font-semibold">Board</span>
                <PlayingCard class="absolute border border-black" bind:tapped={$tapped} />
            </div>
        </Resizable.Pane>
        <Resizable.Handle />
        <Resizable.Pane defaultSize={25}>
            <div class="relative flex h-full items-center justify-center">
                <span class="font-semibold">Card Info</span>
            </div>
        </Resizable.Pane>
    </Resizable.PaneGroup>
</div>

<style lang="scss">
.board {
    background-image:
            repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
            repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
    background-size: 60px 60px;
}
</style>
