<script lang="ts">
    import type { AnnotationTrackItem } from "./Annotation.svelte";
    import Annotation from "./Annotation.svelte";

    export let annotationItems: AnnotationTrackItem[];
    export let pixelsPerSecond: number;


    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let track: HTMLDivElement;

    function notifyAnnotationClick(index: number) {
        dispatch("annotationClick", {
            index
        });
    }
</script>

<div class="annotation-track" bind:this={track}>
    {#each annotationItems as item, index}
    <Annotation
        {pixelsPerSecond}
        {item}
        on:click={() => notifyAnnotationClick(index)}
     />
    {/each}
</div>

<style>
    div {
        position: relative;
        min-height: 50px;
    }
</style>
