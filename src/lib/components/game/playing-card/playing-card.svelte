<script lang="ts">
    import interact from 'interactjs';
    import { AspectRatio } from '$lib/components/ui/aspect-ratio';
    import { cn } from '$lib/utils';
    import { onMount } from 'svelte';
    interface $$Props {
        class: string;
        tapped?: boolean;
    }
    export let tapped = false;
    let x = 0, y = 0;
    let card: HTMLDivElement;
    onMount(() => {
        interact('.playing-card').draggable({
            onmove: (event) => {
                x += event.dx;
                y += event.dy;
            },
            modifiers: [
                interact.modifiers.snap({
                    origin: card.parentNode as HTMLElement,
                    endOnly: true,
                    offset: () => ({
                        top: tapped ? 10 : 2.5,
                        left: tapped ? 2.5 : 10,
                        bottom: tapped ? 10 : 2.5,
                        right: tapped ? 2.5 : 10,
                    }),
                    targets: [
                        interact.createSnapGrid({
                            x: 60,
                            y: 60
                        })
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
            ],
            inertia: true
        });
    });
</script>

<div
    tabindex="0"
    role="button"
    class={cn(
        'absolute top-0 left-0 w-10 mx-[8px] playing-card',
        'rounded-[3px] focus:ring-1 focus:ring-red-600',
        'active:ring-1 active:ring-green-500',
        'hover:ring-1 hover:ring-yellow-300'
    )}
    style={`transform: translate(${x}px, ${y}px)${tapped ? ' rotate(90deg)' : ''}`}
    bind:this={card}
    on:dblclick={() => tapped = !tapped}
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

