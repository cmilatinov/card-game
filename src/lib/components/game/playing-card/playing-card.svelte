<script lang="ts">
    import interact from 'interactjs';
    import { AspectRatio } from '$lib/components/ui/aspect-ratio';
    import { cn } from '$lib/utils';
    import { getContext, onMount, tick } from 'svelte';
    import type { BoardContext } from '$lib/components/game/board';
    interface $$Props {
        class: string;
        id: string;
        tapped?: boolean;
    }
    export let id = '';
    export let tapped = false;
    let x = 0, y = 0;
    let card: HTMLDivElement;
    const { gridSize: { cellX, cellY } } = getContext<BoardContext>('board');
    $: sizeY = $cellY - 20;
    $: sizeX = sizeY * 5 / 7;
    $: offsetX = ($cellX - sizeX) / 2;
    $: offsetY = ($cellY - sizeY) / 2;

    onMount(() => {
        interact(`#${id}`).draggable({
            onmove: (event) => {
                x += event.dx;
                y += event.dy;
            },
            modifiers: [
                interact.modifiers.snap({
                    origin: card.parentNode as HTMLElement,
                    endOnly: true,
                    offset: () => ({
                        top: tapped ? offsetX : offsetY,
                        left: tapped ? offsetY : offsetX,
                        bottom: tapped ? offsetX : offsetY,
                        right: tapped ? offsetY : offsetX,
                    }),
                    targets: [
                        interact.createSnapGrid({ x: $cellX, y: $cellY })
                    ],
                    range: Infinity,
                    relativePoints: [
                        {
                            x: 0,
                            y: 0
                        }
                    ]
                }),
                interact.modifiers.restrict({
                    restriction: card.parentNode as HTMLElement,
                    endOnly: true,
                    elementRect: {
                        top: 0,
                        left: 0,
                        bottom: 1,
                        right: 1,
                    }
                })
            ]
        });
    });
</script>

<div
    id={id}
    tabindex="0"
    role="button"
    class={cn(
        'absolute top-0 left-0 playing-card',
        'rounded-[3px] focus:ring-1 focus:ring-red-600',
        'active:ring-1 active:ring-green-500',
        'hover:ring-1 hover:ring-yellow-300'
    )}
    style={
        `width: ${sizeX}px;` +
        `margin: ${offsetY}px ${offsetX}px;` +
        `transform: translate(${x}px, ${y}px)${tapped ? ' rotate(90deg)' : ''}`
    }
    bind:this={card}
    on:dblclick={() => tapped = !tapped}
    on:mousedown={(e) => e.stopPropagation()}
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

