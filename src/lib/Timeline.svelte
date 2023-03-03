<script lang="ts">
    import type { IAnnotation } from "./Annotation.svelte";

    export let videoDuration: number;
    export let pixelsPerSecond: number;
    export let currentTime: number = 0;
    export let annotations: Array<IAnnotation>;

    import AnnotationTrack from "./AnnotationTrack.svelte";
    import TimeDisplay from "./TimeDisplay.svelte";

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    $: currentTimeTickX = `${currentTime * pixelsPerSecond}px`;

    function handleClick(e) {
        dispatch("timelineClick", {
            target: e.target
        });
    }

    // setInterval(() => {
    //     currentTime += 1;
    // }, 1000);
</script>


<div id="timeline" on:click={handleClick} on:keyup={handleClick}>
    <div id="current-time" style:left={currentTimeTickX}></div>
    <TimeDisplay {pixelsPerSecond} {videoDuration} />
    <AnnotationTrack {pixelsPerSecond} {annotations} on:annotationClick />
</div>

<style>
    #timeline {
        position: relative;
        padding: 1rem 0 0 2rem;
        overflow-x: auto;
        /* scrollbar-width: none; */

        border-top: 1px solid rgba(255, 255, 255, 0.2);
        min-height: 250px;
    }
/*
    #timeline::-webkit-scrollbar {
        width: 0;
        height: 0;
    } */

    #current-time {
        position: absolute;
        top: 0px;
        margin-left: 2rem;

        width: 2px;
        height: 100%;
        background-color: red;

        z-index: 1;
    }
</style>
