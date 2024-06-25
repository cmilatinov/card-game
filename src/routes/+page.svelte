<script lang="ts">
    import * as Resizable from '$lib/components/ui/resizable';
    import { PlayingCard, type PlayingCardInfo } from '$lib/components/game/playing-card';
    import { Board } from '@/lib/components/game/board';
    import { writable } from 'svelte/store';
    let tapped = writable(true);

    type Player = {
        id: number;
        cards: PlayingCardInfo[]
    }

    const players: Player[] = [
        {
            id: 1,
            cards: [ {id: "1", name: 'test'} ]
        },
        {
            id: 1,
            cards: [ {id: "1", name: 'test'} ]
        },
        {
            id: 1,
            cards: [ {id: "1", name: 'test'} ]
        }
    ];
</script>

<div class="w-screen h-screen">
    <Resizable.PaneGroup direction="horizontal">
        <Resizable.Pane defaultSize={75}>
            <Resizable.PaneGroup direction="vertical">
                {#each players as player}
                    <Resizable.Pane>
                        <Board id={`board-${player.id}`} cards={player.cards} />
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
