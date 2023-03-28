<script lang="ts">
    export let paused: boolean = true;
    export let videoDuration: number = 0;
    export let currentTime: number = 0;

    import { createEventDispatcher } from 'svelte';
    import { formatSeconds } from './common';

    import playIcon from "../assets/play.svg";
    import pauseIcon from "../assets/pause.svg";
    import stopIcon from "../assets/stop.svg";

    const dispatch = createEventDispatcher();

    const togglePause = () => {
        if (paused) {
            dispatch("play");
        }
        else {
            dispatch("pause");
        }
    }
</script>

<div id="video-controls">
    <div id="buttons">
        <img src={paused ? playIcon : pauseIcon} on:click={togglePause} alt="Play Icon">
        <img src={stopIcon} on:click={() => dispatch("stop")} alt="Stop Icon">
    </div>

    <span id="current-time">{formatSeconds(currentTime)}</span>
    <div id="slider-container">
        <input
            id="time-slider"
            type="range"
            bind:value={currentTime}
            max={videoDuration - 1}
            step={0.000001}
        >
    </div>
    <span id="video-duration">{formatSeconds(videoDuration)}</span>
</div>

<style>
    #video-controls {
        display: flex;
        width: 100%;
        background-color: #3d0c3b;
        gap: 2rem;

        padding: 0.5rem 1rem;
    }

    #buttons {
        display: flex;
        border-right: 1px solid rgba(255, 255, 255, 0.5);
        padding: 0 1rem 0 0;
        gap: 1rem;
    }

    img {
        width: 38px;
        padding: 4px;
        filter: invert();
        user-select: none;
        cursor: pointer;
    }

    img:hover {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.1);
    }

    #slider-container {
        display: flex;
        width: 100%;
        padding-right: 1rem;
    }

    #current-time,
    #video-duration {
        align-self: center;
    }

    #time-slider {
        width: 100%;
    }
</style>
