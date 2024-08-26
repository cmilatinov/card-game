<script lang="ts">
    import type { Card } from 'scryfall-sdk';

    export let info: Card;
</script>


<img class="playing-card max-h-[311px] max-w-[223px]" src="{info.image_uris?.normal}" alt="{info.name}" />