<script lang="ts">
    import { draggable } from '@neodrag/svelte';
    import { AspectRatio } from '$lib/components/ui/aspect-ratio';
    import { cn } from '$lib/utils';
    import { getContext } from 'svelte';
    import type { Readable } from 'svelte/store';
    interface $$Props {
        class?: string;
        style?: string;
        tapped?: boolean;
        cardLength: number;
        cardHeight: number;
    }
    const grid = getContext<Readable<[number, number]>>('grid');
    let x = 0, y = 0;
    $: sizeY = $$props.cardHeight - 20;
    $: sizeX = sizeY * 5 / 7;
    $: offsetX = ($$props.cardLength - sizeX) / 2;
    $: offsetY = ($$props.cardHeight - sizeY) / 2;
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
        `transform: translate(${x}px, ${y}px)${$$props.tapped ? ' rotate(90deg)' : ''}`
    }
    data-card-id={$$props.id}
    data-card-tapped={$$props.tapped}
    data-card-x="0"
    data-card-y="0"
    on:dblclick
    on:mousedown={(e) => e.stopPropagation()}
    use:draggable={{ grid: $grid }}
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

