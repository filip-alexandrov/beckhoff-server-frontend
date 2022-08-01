<script>
    import {
        prepareScene,
        loadObject,
        clearScene,
        resetCamera,
        goFullScreen,
        showGrid,
        hideGrid,
        enableCache,
        disableCache,
    } from 'js-3d-model-viewer'
    import { onMount } from 'svelte'
    onMount(() => {
        const viewerElement = document.getElementById('viewer')
        const opts = {
            /* grid: false,
            trackball: false, */
        }
        const scene = prepareScene(viewerElement, opts)
        loadObject(scene, '/src/assets/Part4.obj') // Urls are fine here.
    })
</script>

<div id="viewer" />

<style>
    #viewer {
        width: 20vw;
        height: 20vh;
    }
</style>