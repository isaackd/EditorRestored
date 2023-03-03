<script lang="ts">
    export let annotations: IAnnotation[];
    export let pixelsPerSecond: number;

    import Annotation from "./Annotation.svelte";
    import type { IAnnotation } from "./Annotation.svelte";

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function notifyAnnotationClick(index: number) {
        dispatch("annotationClick", {
            index
        });
    }
</script>

<div>
    {#each annotations as item, index}
    <Annotation
        {pixelsPerSecond}
        {...item}
        on:click={() => notifyAnnotationClick(index)}
     />
    {/each}
</div>

<style>
    div {
        position: relative;
    }
</style>
