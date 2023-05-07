<script lang="ts">
    import type { AnnotationTrackItem } from "./Annotation.svelte";
    // import { formatSeconds } from "./common";
    import type AnnotationRenderer from "../annotationlib/renderer";

    import { afterUpdate } from 'svelte';

    export let annotationItems: Array<AnnotationTrackItem>;
    export let renderer: AnnotationRenderer;

    $: selectedAnnotationItem = annotationItems.find(el => {
        return el.selected === true;
    });

    afterUpdate(() => {
        let annotationData = annotationItems.map(item => {
            return item.annotation;
        });
        renderer.changeAnnotationData(annotationData);
		if (selectedAnnotationItem) {
            document.querySelector(".selected").scrollIntoView();
        }
	});

    function exportAnnotations() {
        console.log(annotationItems.map(item => {
            return item.annotation;
        }));
    }

    function addAnnotation() {
        const defaultAnnotation = {
            "annotation": {
                "id": "annotation_12785543",
                "type": "text",
                "x": 24.881,
                "y": 75.042,
                "width": 25.246,
                "height": 24.958,
                "timeStart": 15,
                "timeEnd": 20,
                "style": "popup",
                "action": {
                    "type": "time",
                    "seconds": 24
                },
                "appearance": {
                    "backgroundOpacity": 0.25,
                    "backgroundColor": 0,
                    "foregroundColor": 16777215,
                    "textSize": 3.911599999999999
                },
            },
            "selected": true,
            "track": 0
        }

        if (selectedAnnotationItem) {
            selectedAnnotationItem.selected = false;
        }
        annotationItems.push(defaultAnnotation);
        annotationItems = annotationItems;
        renderer.changeAnnotationData(annotationItems.map(el => el.annotation));
    }

</script>

<!-- {#if selectedAnnotationItem} -->
<div id="properties-panel">
    <button id="add-annotation" on:click={addAnnotation}>Add Annotation</button>
    <button id="export" on:click={exportAnnotations}>Export</button>
    <div id="content">
        <h2>Properties</h2>

        {#if selectedAnnotationItem}
        <span>Annotation Type</span>
        <select name="annotation-type" id="">
            <option value="text">Text</option>
            <option value="note">Note</option>
            <option value="speech">Speech</option>
            <option value="title">Title</option>
            <option value="spotlight">Spotlight</option>
            <option value="label">Label</option>
        </select>

        <div class="times">
            <div>
                <span>Start Time</span>
                <input
                    type="number"
                    min={0}
                    max={selectedAnnotationItem.annotation.timeEnd - 1}
                    bind:value={selectedAnnotationItem.annotation.timeStart}>
            </div>
            <div>
                <span class="end-time">End Time</span>
                <input
                    type="number"
                    bind:value={selectedAnnotationItem.annotation.timeEnd}>
            </div>
        </div>

        <div class="times">
            <div>
                <span>X</span>
                <input
                    type="number"
                    min={0}
                    max={100}
                    bind:value={selectedAnnotationItem.annotation.x}>
            </div>
            <div>
                <span class="end-time">Y</span>
                <input
                    type="number"
                    min={0}
                    max={100}
                    bind:value={selectedAnnotationItem.annotation.y}>
            </div>
        </div>

        <div class="times">
            <div>
                <span>Width</span>
                <input
                    type="number"
                    min={0}
                    max={100}
                    bind:value={selectedAnnotationItem.annotation.width}>
            </div>
            <div>
                <span class="end-time">Height</span>
                <input
                    type="number"
                    min={0}
                    max={100}
                    bind:value={selectedAnnotationItem.annotation.height}>
            </div>
        </div>

        <span>Annotation Text</span>
        <textarea
            name="annotation-text"
            id=""
            rows=6
            bind:value={selectedAnnotationItem.annotation.text} />
        {:else}
        <span class="placeholder">Select an annotation to edit its properties...</span>
        {/if}
    </div>
    <!-- <div id="footer">
        <button>Save</button>
    </div> -->
</div>
<!-- {/if} -->

<style>
    #properties-panel {
        /* display: grid; */

        grid-template-rows: 1fr auto;
        width: 350px;
        background-color: #3d0c3b;

        padding: 0rem 2rem;
    }

    #add-annotation {
        margin-bottom: 0;
    }

    #content {
        /* padding: 0rem 2rem; */
        overflow-y: auto;
    }

    #footer {
        padding: 0rem 2rem;
        /* border-top: 1px solid rgba(255, 255, 255, 0.3); */
    }


    .times {
        display: flex;

        gap: 1.25rem;
    }

    .times div {
        width: 100%;
    }

    .end-time {
        display: block;
        text-align: right;
    }

    select,
    textarea,
    input,
    button {
        width: 100%;
        padding: 0.5rem;
        background-color: #512750;
        border: 1px solid rgba(255, 255, 255, 0.2);
        margin-bottom: 1rem;
        margin-top: 0.5rem;
        border-radius: 4px;
    }

    select {
        padding: 0.5rem;
    }

    textarea {
        resize: none;
    }

    button {
        background-color: #ff4d55;
        cursor: pointer;
        color: black;
        font-weight: bold;
        font-size: 1rem;
        border: none;
    }

    button:hover {
        filter: brightness(110%);
    }
</style>
