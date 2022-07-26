<script>
    import ApexCharts from 'apexcharts'
    import { onMount } from 'svelte'
    import RTChart from './RTChart.svelte'

    import RTTabs from './RTTabs.svelte'
</script>

<div class="main">
    <div class="charts">
        <div class="chart1"><RTChart chartId="chart-1" /></div>
        <div class="chart2"><!-- <RTChart chartId= "chart-2" /> --></div>
        <div class="chart3"><!-- <RTChart chartId= "chart-3" /> --></div>
        <div class="chart4"><!-- <RTChart chartId= "chart-4" /> --></div>
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
        grid-template-rows: 360px 360px auto;
        box-sizing: border-box;
        font-family: 'Outfit' sans-serif;
    }
    .gauges {
        background-color: aqua;
        width: 100%;
        grid-area: 5 / 1 / span 1 / span 2;
        background-color: green;
    }
</style>
