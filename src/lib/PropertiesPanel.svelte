<script lang="ts">
    import type { AnnotationTrackItem } from "./Annotation.svelte";
    import { formatSeconds } from "./common";

    export let annotationItems: Array<AnnotationTrackItem>;

    $: selectedAnnotationItem = annotationItems.find(el => {
        return el.selected === true;
    });
</script>

{#if selectedAnnotationItem}
<div id="properties-panel">
    <div id="content">
        <h2>Properties</h2>

        <!-- {#if selectedAnnotationItem} -->
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
                    min=0
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

        <span>Annotation Text</span>
        <textarea
            name="annotation-text"
            id=""
            rows=6
            bind:value={selectedAnnotationItem.annotation.text} />
        <!-- {:else}
        <span class="placeholder">Select an annotation...</span> -->
        <!-- {/if} -->
    </div>
    <!-- <div id="footer">
        <button>Save</button>
    </div> -->
</div>
{/if}

<style>
    #properties-panel {
        display: grid;

        grid-template-rows: 1fr auto;
        width: 350px;
        background-color: #3d0c3b;
    }

    .placeholder {
        opacity: 0.60;
    }

    #content {
        padding: 0rem 2rem;
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
