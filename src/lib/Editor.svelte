<!-- svelte-ignore a11y-media-has-caption -->

<script lang="ts">
    import Timeline from "./Timeline.svelte";
    import PropertiesPanel from "./PropertiesPanel.svelte";
    import VideoControls from "./VideoControls.svelte";
    import { AnnotationType, type IAnnotation } from "./Annotation.svelte";

    import videoSource from "../assets/video.mp4";

    let video: HTMLVideoElement;

    let paused: boolean;
    let videoDuration: number;

    $: videoDuration = Math.ceil(videoDuration);
    let currentTime: number;

    const zoom = 1;
    const pixelsPerSecond = 80 * zoom;

    let annotations: IAnnotation[] = [
        {type: AnnotationType.Label, title: "First", selected: false, startTime: 0, endTime: 4},
        {type: AnnotationType.Speech, title: "Test speech", selected: false, startTime: 5, endTime: 7}
    ];

    $: console.log("Aannotations: " + annotations);

    function stopVideo() {
        video.pause();
        video.currentTime = 0;
    }

    function selectAnnotation(index: number): void {
        const currentSelected = annotations.findIndex((el) => {
            return el?.selected === true;
        });

        if (currentSelected !== -1) {
            annotations[currentSelected].selected = false;
        }

        annotations[index].selected = true;
        annotations = annotations;
    }

    function handleTimelineClick(target) {
        if (!target.closest(".annotation")) {
            const currentSelected = annotations.findIndex((el) => {
                return el?.selected === true;
            });

            if (currentSelected !== -1) {
                annotations[currentSelected].selected = false;
            }
        }
    }
</script>

<div id="editor">
    <div id="top">
        <div id="container">
            <div id="video-container">
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
                bind:annotations
                videoDuration={videoDuration}
                currentTime={currentTime}

                on:timelineClick={(e) => handleTimelineClick(e.detail.target)}
                on:annotationClick={(e) => selectAnnotation(e.detail.index)}
            />
        </div>
        <PropertiesPanel bind:annotations />
    </div>
    <VideoControls
        paused={paused}
        currentTime={currentTime}
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

        grid-template-rows: 1fr 0.5fr;
        width: 100%;
        overflow: hidden;
    }

    #video-container {
        overflow:hidden;
    }

    video {
        padding: 1rem;
        width: 100%;
        max-height: 100%;
    }

</style>
