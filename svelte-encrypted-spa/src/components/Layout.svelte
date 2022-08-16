<script lang="ts">
    import TopNav from './NavTop.svelte'
    import NavHeader from '../components/NavHeader.svelte'
    import NavTemp from '../components/NavTemp.svelte'
    import NavWeight from '../components/NavWeight.svelte'
    import NavDistance from '../components/NavDistance.svelte'
    import NavOrientation from './NavOther.svelte'
    import FastChart from '../components/FastChart.svelte'

    let clickedSensor = ''
    let chartVisible = false; 

    $: console.log(clickedSensor)

    function handleSensorClick(event) {
        clickedSensor = event.detail.sensor; 
        chartVisible = true
    }

    function handleClickOutside() {
        clickedSensor = ""
        chartVisible = false
    }
</script>

<div class="full-screen">
    <div class="grid-container">
        <div class="main">
            <slot />
            <FastChart {clickedSensor} isVisible={chartVisible} on:click-outside={handleClickOutside} />
        </div>
        <div>
            <NavHeader />
        </div>
        <div>
            <TopNav />
        </div>

        <div class="right-nav">
            <NavTemp {clickedSensor} on:sensor-click={handleSensorClick}/>
            <NavWeight />
            <NavDistance />
            <NavOrientation />
        </div>
    </div>
</div>

<style>

    .grid-container {
        height: 100vh;

        width: 100vw;
        min-width: 1920px;

        display: grid;
        grid-template-columns: 221px auto;
        grid-template-rows: 40px auto;
        box-sizing: border-box;

        background-color: #212121;
        color: white;
    }
    .main {
        grid-area: 2 / 2 / span 1 / span 1;
        position: relative; 
        z-index: 1; 
    }
    .right-nav {
        background-color: #323232;
        position: relative; 
        z-index: 2;
    }
</style>
