<script lang="ts">
    import * as Resizable from '$lib/components/ui/resizable';
    import { Board } from '@/lib/components/game/board';
    import { PlayerHand } from '$lib/components/game/player-hand';
    import { gameState } from '@/stores/game';

</script>

<div class="w-screen h-screen">
    <Resizable.PaneGroup direction="horizontal">
        <Resizable.Pane defaultSize={75}>
            <Resizable.PaneGroup direction="vertical">
                {#each Object.keys($gameState.players) as id}
                    <Resizable.Pane>
                        <Board playerId={id} />
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
