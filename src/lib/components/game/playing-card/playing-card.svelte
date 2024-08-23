<script lang="ts">
    import type { GameCard } from '@/stores/game';

    export let card: GameCard;
</script>

<div
    tabindex="0"
    role="button"
    data-swapy-item={card.id}
    style={`${card.tapped ? ' rotate(90deg)' : ''}`}
>
    <img class="pointer-events-none" src="{card.img}" alt="{card.name}"/>
</div>

