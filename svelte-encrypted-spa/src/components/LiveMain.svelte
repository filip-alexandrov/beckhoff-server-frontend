<script>
    import ApexCharts from 'apexcharts'
    import { onMount } from 'svelte'
import GaugesList from './GaugesList.svelte'
    import RTChartNew from './RTChartNew.svelte'
    import RTChart from './RTChart.svelte'

    import RTTabs from './RTTabs.svelte'
</script>

<div class="main">
    <div class="charts">
        <div class="chart"><RTChart chartId="chart-1" /></div>
        <div class="chart"><RTChart chartId= "chart-2" /></div>
        <div class="chart"><RTChart chartId= "chart-3" /></div>
        <div class="chart"><RTChart chartId= "chart-4" /></div>
        <div class="gauges"><GaugesList/></div>
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
    .chart{
        /* background-color: aqua; */
    }
    .gauges {
        width: 100%;
        grid-area: 3 / 1 / span 1 / span 2;

    }
</style>
