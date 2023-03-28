<script lang="ts">
    import Annotation, { type AnnotationTrackItem } from "./Annotation.svelte";
    import { createEventDispatcher } from 'svelte';

    export let pixelsPerSecond: number;
    export let annotationItems: AnnotationTrackItem[];

    const dispatch = createEventDispatcher();

    function notifyAnnotationClick(index: number) {
        dispatch("annotationClick", {
            index
        });
    }
</script>


<div id="annotation-tracks">
    {#each annotationItems as item, index}
    <Annotation
        {pixelsPerSecond}
        {item}
        on:click={() => notifyAnnotationClick(index)}
     />
    {/each}
</div>

<style>
    #annotation-tracks {
        display: grid;
        grid-template-rows: 50px;
    }
</style>
