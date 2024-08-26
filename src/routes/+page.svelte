<script lang="ts">
    import { ResizableHandle, ResizablePaneGroup, ResizablePane } from '$lib/components/ui/resizable';
    import { Board } from '@/lib/components/game/board';
    import {
        otherPlayers,
        currentPlayer,
        addCurrentPlayer,
        setCardOnBoard,
        addPlayer,
        addCardToHand
    } from '@/stores/game';
    import * as Scry from 'scryfall-sdk';
    import { Button } from '$lib/components/ui/button';
</script>

<div class="h-screen">
    <Button on:click={async () => {
        addCurrentPlayer({ id: crypto.randomUUID(), hp: 100, hand: [], board: new Map() });
        addPlayer({ id: crypto.randomUUID(), hp: 100, hand: [], board: new Map() });

        if (!$currentPlayer) {
            return;
        }
        setCardOnBoard(
            $currentPlayer.id, 1,
            { id: crypto.randomUUID(), tapped: false, info: (await Scry.Cards.byName('Angelic Aberration')) }
        );
        setCardOnBoard(
            $currentPlayer.id, 2,
            { id: crypto.randomUUID(), tapped: false, info: (await Scry.Cards.byName('Young Blue Dragon')) }
        );
        addCardToHand($currentPlayer.id, (await Scry.Cards.byName('Benalish Knight')));
        addCardToHand($currentPlayer.id, (await Scry.Cards.byName('Young Blue Dragon')));
    }}>Load Test Data</Button>
    <ResizablePaneGroup direction="horizontal">
        <ResizablePane>
            <ResizablePaneGroup id="game-board" direction="vertical">
                {#each $otherPlayers as player}
                    <div>Player {player.id}</div>
                    <ResizablePane>
                        <Board player={player} />
                    </ResizablePane>
                    <ResizableHandle />
                {/each}
                {#if $currentPlayer}
                    <div>Your Board</div>
                    <ResizablePane defaultSize={75}>
                        <Board player={$currentPlayer} showHand interactive />
                    </ResizablePane>
                {/if}
            </ResizablePaneGroup>
        </ResizablePane>
        <ResizableHandle withHandle />
        <ResizablePane id="card-info" defaultSize={5}>
            <div class="relative flex h-full items-center justify-center">
                <span class="font-semibold">Card Info</span>
            </div>
        </ResizablePane>
    </ResizablePaneGroup>
</div>
