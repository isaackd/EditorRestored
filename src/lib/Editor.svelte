<!-- svelte-ignore a11y-media-has-caption -->

<script lang="ts">
    import { onMount } from "svelte";
    import Timeline from "./Timeline.svelte";
    import PropertiesPanel from "./PropertiesPanel.svelte";
    import VideoControls from "./VideoControls.svelte";
    import type { AnnotationTrackItem } from "./Annotation.svelte";

    import { parseFromXml } from "../annotationlib/parser";
    import AnnotationRenderer from "../annotationlib/renderer";
    import "../annotationlib/renderer/index.css";

    import videoSource from "../assets/video.mp4";

    export let annotationFile: string;

    let video: HTMLVideoElement;
    let videoContainer: HTMLDivElement;

    let paused: boolean;
    let videoDuration: number;
    let renderer: AnnotationRenderer;

    $: videoDuration = Math.ceil(videoDuration);
    let currentTime: number;

    const zoom = 1;
    const pixelsPerSecond = 20 * zoom;

    // const annotations = parseFromXml(annotationFile);
    const annotations = [];

    onMount(() => {
        renderer = new AnnotationRenderer(annotations, videoContainer, {
            getVideoTime: () => {
                return video.currentTime;
            },
            seekTo: (seconds: number) => {
                video.currentTime = seconds;
            },
            getOriginalVideoWidth: () => {
                return video.videoWidth;
            },
            getOriginalVideoHeight: () => {
                return video.videoHeight;
            }
        });
        renderer.start();
    });


    let annotationItems: AnnotationTrackItem[] = annotations.map(annotation => {
        return { annotation, selected: false, track: 0 }
    });
    console.log(annotationItems);

    function stopVideo() {
        video.pause();
        video.currentTime = 0;
    }

    function selectAnnotation(index: number): void {
        const currentSelected = annotationItems.findIndex((el) => {
            return el?.selected === true;
        });

        if (currentSelected !== -1) {
            annotationItems[currentSelected].selected = false;
        }

        annotationItems[index].selected = true;
    }

    function handleTimelineClick(target) {
        if (!target.closest(".annotation")) {
            const currentSelected = annotationItems.findIndex((el) => {
                return el?.selected === true;
            });

            if (currentSelected !== -1) {
                annotationItems[currentSelected].selected = false;
            }
        }
    }
</script>

<div id="editor">
    <!-- {annotationFile} -->
    <div id="top">
        <div id="container">
            <div id="video-container" bind:this={videoContainer}>
                <video
                    src={videoSource}
                    on:click={() => video.paused ? video.play() : video.pause()}
                    bind:this={video}
                    bind:paused={paused}
                    bind:duration={videoDuration}
                    bind:currentTime={currentTime}>
                </video>
            </div>
            <Timeline
                {pixelsPerSecond}
                bind:annotationItems
                videoDuration={videoDuration}
                currentTime={currentTime}
                timeStep={3}

                on:timelineClick={e => handleTimelineClick(e.detail.target)}
                on:annotationClick={e => selectAnnotation(e.detail.index)}
            />
        </div>
        <PropertiesPanel bind:annotationItems renderer={renderer} />
    </div>
    <VideoControls
        paused={paused}
        bind:currentTime={currentTime}
        videoDuration={videoDuration}
        on:play={() => video.play()}
        on:pause={() => video.pause()}
        on:stop={stopVideo} />
</div>

<style>
    #editor {
        display: flex;
		flex-flow: column nowrap;
		position: absolute;
		width: 100%;
		height: 100%;
    }
    #top {
        display: grid;

        width: 100%;
        height: 100%;

        grid-template-columns: 1fr auto;
        overflow: hidden;
        background-color: #512750;
    }

    #container {
        display: grid;

        width: 100%;
        overflow: hidden;

        --video-width: 700px;
        --video-height: calc(var(--video-width) * 0.5625)
    }

    #video-container {
        position: relative;
        overflow: hidden;
        display: flex;
        max-width: var(--video-width);
        min-width: var(--video-width);
        min-height: var(--video-height);
        max-height: var(--video-height);
        justify-self: center;
    }

    video {
        width: var(--video-width);
        height: var(--video-height);
    }

</style>
