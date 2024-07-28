<script lang="ts">
    import { draggable } from '@neodrag/svelte';
    import { AspectRatio } from '$lib/components/ui/aspect-ratio';
    import { cn, type DeepPartial } from '$lib/utils';
    import { getContext } from 'svelte';
    import { type Readable } from 'svelte/store';
    import { type GameCard, gameState, type Placed } from '@/stores/game';
    export let playerId: string;
    export let cardIdx: number;
    export let setCard: (value?: DeepPartial<Placed<GameCard>>) => void;
    $: card = $gameState.players[playerId].board[cardIdx];
    const grid = getContext<Readable<[number, number]>>('grid');
    $: sizeY = $grid[1] - 20;
    $: sizeX = sizeY * 5 / 7;
    $: offsetX = ($grid[0] - sizeX) / 2;
    $: offsetY = ($grid[1] - sizeY) / 2;
    let position = { x: 0, y: 0 };
</script>

<div
    tabindex="0"
    role="button"
    class={cn(
        'playing-card',
        'absolute top-0 left-0 playing-card',
        'rounded-[3px] focus:ring-1 focus:ring-red-600',
        'ring-1 ring-black',
        'active:ring-green-500',
        'hover:ring-yellow-300',
    )}
    style={
        `width: ${sizeX}px;` +
        `margin: ${offsetY}px ${offsetX}px;` +
        (card.card.tapped ? 'transform: rotate(90deg)' : '')
    }
    on:dblclick={() => setCard({ card: { tapped: !card.card.tapped } })}
    on:mousedown={(e) => e.stopPropagation()}
    use:draggable={{
        position,
        transform: ({ offsetX, offsetY }) => `translate(${offsetX}px, ${offsetY}px)${
            card.card.tapped ? ' rotate(90deg)' : ''
        }`,
        onDrag: ({ offsetX, offsetY }) => {
            position = { x: offsetX, y: offsetY };
        },
        onDragEnd: ({ offsetX, offsetY }) => {
            const x = Math.round(offsetX / $grid[0]);
            const y = Math.round(offsetY / $grid[1]);
            position = { 
                x: x * $grid[0], 
                y: y * $grid[1]  
            };
            setCard({ position: { x, y } });
        }
    }}
>
    <AspectRatio
        ratio={5 / 7}
        class={cn(
            'flex justify-center items-center',
            'bg-white select-none rounded-[3px]',
            '',
            $$props.class
        )}
    >
        <div>card</div>
    </AspectRatio>
</div>

