<script>
    import ApexCharts from 'apexcharts'
    import { onMount } from 'svelte'
    import RTChart from './RTChart.svelte'

    import RTTabs from './RTTabs.svelte'
</script>

<div class="main">
    <div class="charts">
        <div class="tabs1"><RTTabs /></div>
        <div class="tabs2">tabs2</div>
        <div class="chart1"><RTChart /></div>
        <div class="chart2">chart2</div>
        <div class="tabs3">tabs3</div>
        <div class="tabs4">tabs4</div>
        <div class="chart3">chart3</div>
        <div class="chart4">chart4</div>
        <div class="gauges">gauges</div>
        <!-- <div class="gauges">gauges</div> -->
    </div>
</div>

<style>
    .main {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        user-select: none;
        -webkit-user-select: none;
    }
    .charts {
        height: 100%;
        width: 99%;
        display: grid;

        grid-template-columns: 50% 50%;
        grid-template-rows: 35px 325px 35px 325px auto;
        box-sizing: border-box;
    }

    .chart1 {
        font-family: 'Outfit' sans-serif;
    }
    .chart2 {
        background-color: red;
    }
    .chart3 {
        background-color: blue;
    }
    .chart4 {
        background-color: yellow;
    }
    .gauges {
        background-color: aqua;
        width: 100%;
        grid-area: 5 / 1 / span 1 / span 2;
        background-color: green;
    }
</style>
