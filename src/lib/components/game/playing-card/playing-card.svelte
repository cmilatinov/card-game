<script lang="ts">
    import type { BoardCard } from '@/stores/game';

    export let card: BoardCard;
</script>

<div
    tabindex="0"
    role="button"
    data-swapy-item={card.id}
    style={`${card.tapped ? ' rotate(90deg)' : ''}`}
>
    <img class="playing-card" src="{card.info.image_uris?.normal}" alt="{card.info.name}"/>
</div>

