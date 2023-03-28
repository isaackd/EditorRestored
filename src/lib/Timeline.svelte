<script lang="ts">
    import type { AnnotationTrackItem } from "./Annotation.svelte";
    import AnnotationTracks from "./AnnotationTracks.svelte";

    export let videoDuration: number;
    export let pixelsPerSecond: number;
    export let timeStep: number = 1;
    export let currentTime: number = 0;
    export let annotationItems: AnnotationTrackItem[];

    import TimeDisplay from "./TimeDisplay.svelte";

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    $: currentTimeTickX = `${currentTime * pixelsPerSecond}px`;

    const annotationTracks = fitAnnotationsIntoTracks(annotationItems);
    console.log(annotationTracks);

    function handleClick(e) {
        if (e.target.closest("#time-display")) {
            return;
        }

        dispatch("timelineClick", {
            target: e.target
        });
    }

    function fitAnnotationsIntoTracks(
        items: AnnotationTrackItem[]
    ): [AnnotationTrackItem[]?] {
        const result: [AnnotationTrackItem[]?] = [];

        for (const item of items) {
            fitAnnotationIntoTrack(item, result, 0);
        }

        return result;
    }

    function fitAnnotationIntoTrack(
        item: AnnotationTrackItem,
        tracks: [AnnotationTrackItem[]?],
        startTrackIndex: number
    ) {
        // If the row doesn't have an annotation in it yet, create
		// a row at the starting index
		if (!tracks[startTrackIndex]) {
			tracks[startTrackIndex] = [];
		}
		// Compare the annotation to the last column in the current row
        const previousTrack = tracks[startTrackIndex];
		const prev = previousTrack.at(-1);

		if (!prev) {
			tracks[startTrackIndex].push(item);
            item.track = startTrackIndex;
		}
		else if (item.annotation.timeStart <= prev.annotation.timeEnd) {
			fitAnnotationIntoTrack(item, tracks, startTrackIndex + 1)
		}
		else if (item.annotation.timeStart > prev.annotation.timeEnd) {
			tracks[startTrackIndex].push(item)
            item.track = startTrackIndex;
		}
    }
</script>


<div id="timeline" on:click={handleClick} on:keyup={handleClick}>
    <div id="current-time" style:left={currentTimeTickX}></div>
    <TimeDisplay {pixelsPerSecond} {videoDuration} step={timeStep} />

    <AnnotationTracks
        {pixelsPerSecond}
        annotationItems={annotationItems}
        on:annotationClick
        on:annotationSizeChange />
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
