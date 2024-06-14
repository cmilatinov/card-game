<script lang="ts">
    import * as Resizable from '$lib/components/ui/resizable';
    import { PlayingCard } from '$lib/components/game/playing-card';
    import { Board } from '@/lib/components/game/board';
    import { writable } from 'svelte/store';
    let tapped = writable(true);
    const players = [1, 2, 3];
</script>

<div class="w-screen h-screen">
    <Resizable.PaneGroup direction="horizontal">
        <Resizable.Pane defaultSize={75}>
            <Resizable.PaneGroup direction="vertical">
                {#each players as player}
                    <Resizable.Pane>
                        <Board id={`board-${player}`}>
                            <PlayingCard
                                class="absolute border border-black"
                                id={`card-${player}`}
                                bind:tapped={$tapped}
                            />
                        </Board>
                    </Resizable.Pane>
                    <Resizable.Handle />
                {/each}
            </Resizable.PaneGroup>
        </Resizable.Pane>
        <Resizable.Handle />
        <Resizable.Pane defaultSize={25}>
            <div class="relative flex h-full items-center justify-center">
                <span class="font-semibold">Card Info</span>
            </div>
        </Resizable.Pane>
    </Resizable.PaneGroup>
</div>
