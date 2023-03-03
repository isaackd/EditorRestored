<script lang="ts" context="module">
    export enum AnnotationType {
        Note,
        Label,
        Speech,
    }

    export interface IAnnotation {
        type: AnnotationType;
        title: string;
        selected: boolean;
        startTime: number;
        endTime: number;
    }
</script>

<script lang="ts">
    export let type: AnnotationType;
    export let title: string;
    export let selected: boolean = false;
    export let pixelsPerSecond: number;
    export let startTime: number;
    export let endTime: number;

    $: duration = endTime - startTime;

    $: width = duration * pixelsPerSecond + "px";
    $: left = startTime * pixelsPerSecond + "px";

    import { createEventDispatcher } from 'svelte';
    import popupIcon from "../assets/popup.svg";
    import speechIcon from "../assets/speech.svg";

    function getIcon() {
        if (type === AnnotationType.Note) {
            return popupIcon;
        }
        else if (type === AnnotationType.Label) {
            return popupIcon;
        }
        else if (type === AnnotationType.Speech) {
            return speechIcon;
        }
    }
	const dispatch = createEventDispatcher();

    function notifyClicked() {
        dispatch("click");
    }
</script>


<div
    class="annotation"
    class:selected={selected}
    style:width={width}
    style:left={left}
    on:click={notifyClicked}
    on:keyup={notifyClicked}
>
    <img width={24} src={getIcon()} alt="Annotation type icon">
    <span>{title}</span>
</div>

<style>
    .annotation {
        display: flex;
        flex-flow: row nowrap;
        position: absolute;
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

        resize: horizontal;
        overflow: hidden;

        cursor: pointer;
    }
    .annotation.selected {
        /* background-color: #fb1a23; */
        background-color: #ff4d55
    }

    span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
