<script>
    import Gauge from './GaugeSettings.svelte'
</script>

<div class="container">

    <Gauge gaugeId="gauge-1"/>
    <Gauge gaugeId="gauge-2"/>
    <Gauge gaugeId="gauge-3"/>
    <Gauge gaugeId="gauge-4"/>
    <Gauge gaugeId="gauge-5"/>
    <Gauge gaugeId="gauge-6"/>
    <Gauge gaugeId="gauge-7"/>
</div>

<style>

    .container{
        width: 99%;
        justify-content: space-between;
        display: flex;
    }
</style>
