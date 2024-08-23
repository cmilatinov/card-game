<script lang="ts">
    import {ResizableHandle, ResizablePaneGroup, ResizablePane} from '$lib/components/ui/resizable';
    import { Board } from '@/lib/components/game/board';
    import { PlayerHand } from '$lib/components/game/player-hand';
    import { gameState } from '@/stores/game';
</script>

<div class="w-screen h-screen">
    <ResizablePaneGroup direction="horizontal">

        <ResizablePane>
            <ResizablePaneGroup id="game-board" direction="vertical">
                {#each Object.keys($gameState.players) as id}
                    <ResizablePane>
                        <Board playerId={id} />
                    </ResizablePane>
                    <ResizableHandle />
                {/each}
                <ResizablePane>
                    <PlayerHand/>
                </ResizablePane>
            </ResizablePaneGroup>
        </ResizablePane>

        <ResizableHandle />

        <ResizablePane defaultSize={25}>
            <div class="relative flex h-full items-center justify-center">
                <span class="font-semibold">Card Info</span>
            </div>
        </ResizablePane>
    </ResizablePaneGroup>
</div>
