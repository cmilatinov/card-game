<script lang="ts">
    import type { BoardCard } from '@/stores/game';
    import { PlayingCard } from '$lib/components/game/playing-card/index.js';

    export let card: BoardCard;
</script>

<div
    tabindex="0"
    role="button"
    data-swapy-item={card.id}
    style={`${card.tapped ? ' rotate(90deg)' : ''}`}
>
    <PlayingCard info={card.info}/>
</div>

