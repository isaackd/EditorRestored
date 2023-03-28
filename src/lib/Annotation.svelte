<script lang="ts" context="module">
    import type { Annotation } from "../annotationlib/parser";

    export interface AnnotationTrackItem {
        selected: boolean;
        annotation: Annotation;
        /**
         * Which track row the annotation will be displayed in.
         */
        track: number
    }
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import popupIcon from "../assets/popup.svg";
    import speechIcon from "../assets/speech.svg";

    export let pixelsPerSecond: number;
    export let item: AnnotationTrackItem;

    $: annotation = item.annotation;

    let element: HTMLDivElement;

    $: duration = annotation.timeEnd - annotation.timeStart;

    $: width = duration * pixelsPerSecond + "px";
    $: left = annotation.timeStart * pixelsPerSecond + "px";

    function getIcon() {
        if (annotation.style === "popup") {
            return popupIcon;
        }
        else if (annotation.style === "label") {
            return popupIcon;
        }
        else if (annotation.style === "speech") {
            return speechIcon;
        }
    }
	const dispatch = createEventDispatcher();

    function notifyClicked() {
        dispatch("click");
    }
</script>


<div
    id={annotation.id}
    class="annotation"
    class:selected={item.selected}
    style:width={width}
    style:left={left}
    style:gridRow={2}

    bind:this={element}
    on:click={notifyClicked}
    on:keyup={notifyClicked}
>
    <img width={24} src={getIcon()} alt="Annotation type icon">
    <span class:no-text={annotation.text ? false : true} >{annotation.text || "(no text)"}</span>
</div>

<style>
    .annotation {
        display: flex;
        position: relative;
        flex-flow: row nowrap;
        /* position: absolute; */
        align-items: center;

        width: 200px;
        height: 40px;

        gap: 0.5rem;
        /* background-color: #ff4d55; */
        background-color: #fb1a23;
        border-radius: 8px;
        margin: 0.5rem 0;
        padding: 0 0.5rem;

        color: black;

        /* resize: horizontal; */
        overflow: hidden;

        cursor: pointer;

        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 18px;
    }
    .annotation.selected {
        /* background-color: #fb1a23; */
        background-color: #ff4d55
    }

    img {
        user-select: none;
    }

    span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        user-select: none;;
    }

    span.no-text {
        opacity: 0.5;
    }
</style>
