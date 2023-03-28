<script lang="ts">
    import { formatSeconds } from "./common";
    import { createEventDispatcher } from "svelte";

    export let videoDuration: number;
    export let pixelsPerSecond: number;
    export let step: number = 1;

    let markers: HTMLDivElement;

    $: width = `${videoDuration * pixelsPerSecond}px`;

    const dispatch = createEventDispatcher();

    function handleClick(e) {
        const firstMarker = markers.firstElementChild;
        const pos = firstMarker.getBoundingClientRect();
        console.log(pos, e);


        dispatch("timelineSeek");
    }
</script>

<div id="time-display" on:click={handleClick} on:keyup={handleClick}>
    <div id="markers" bind:this={markers} style:transform={`translateX(-${pixelsPerSecond * step / 2 - 0.5}px)`}>
        {#each { length: Math.ceil(videoDuration / step) + 1 } as _, i}
        <div class="marker" style:width={`${pixelsPerSecond * step}px`}>
            <p>{formatSeconds(i * step)}</p>
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
        user-select: none;
    }
    #markers {
        display: flex;
        position: relative;
        cursor: pointer;
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
