<script lang="ts">
    import { PlayingCard, type PlayingCardInfo } from '$lib/components/game/playing-card';

    export let cards: PlayingCardInfo[];
</script>

<div class="player-hand">
    {#each cards as card}
        <div class="playing-card rounded-[3px]"/>
    {/each}
</div>

<style lang="scss">
    .player-hand {
        height: 300px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .playing-card {
        height: 260px;
        width: 260px;
        background: black;
    }
</style>