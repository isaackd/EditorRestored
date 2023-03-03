<script lang="ts">
	import svelteLogo from './assets/svelte.svg'
  	import VideoControls from './lib/VideoControls.svelte';
	import Editor from './lib/Editor.svelte';
</script>

<main>
	<Editor />
	<!-- <VideoControls /> -->
</main>

<style>
	main {
		display: flex;
		flex-flow: column nowrap;
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
