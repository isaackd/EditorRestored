<script lang="ts">
    import { formatSeconds } from "./common";

    export let videoDuration: number;
    export let pixelsPerSecond: number;

    $: width = `${videoDuration * pixelsPerSecond}px`;
</script>

<div id="time-display">
    <div id="markers" style:transform={`translateX(-${pixelsPerSecond / 2 - 0.5}px)`}>
        {#each { length: videoDuration + 1 } as _, i}
        <div class="marker" style:width={`${pixelsPerSecond}px`}>
            <p style:left={`${i * pixelsPerSecond}px`}>{formatSeconds(i)}</p>
            <div class="tick"></div>
        </div>
        {/each}
    </div>
</div>

<style>
    #time-display {
        display: flex;
        flex-flow: row nowrap;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 0.5rem;
    }
    #markers {
        display: flex;
        position: relative;
    }
    p {
        margin: 0;
        font-size: 13px;
    }
    .marker {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }
    .tick {
        width: 1px;
        height: 10px;
        background-color: rgba(255, 255, 255, 0.6);
    }
</style>
