<script context="module" lang="ts">
    declare namespace svelte.JSX {
        interface HTMLProps<T> {
            onclick_outside?: (e: CustomEvent) => void
        }
    }
</script>

<script lang="ts">
    import dropdownSvg from '../assets/dropdown.svg'
    import { slide } from 'svelte/transition'
    import { clickOutside } from './../helpers/clickOutside.js'
    import { temperature, baumer, hbm, idl } from '../store/sensors'
    import RTTab from './RTTab.svelte'

    let highlightedSensor: string = 'Temperature #1'
    function handleSensorSelection(event) {
        // Update the selected sensor after click in the dropdown menu
        highlightedSensor = event.detail.sensorName
    }

    let isOpen = false
    setTimeout(() => {
        isOpen = true
    }, 10000);
</script>

<div class="holder">
     <RTTab {highlightedSensor} dropdownLeftMargin="30px" sensorData={$temperature} on:sensorSelection={handleSensorSelection} />
     <RTTab {highlightedSensor} dropdownLeftMargin="200px" sensorData={$baumer} on:sensorSelection={handleSensorSelection} />
     <RTTab {highlightedSensor} dropdownLeftMargin="340px" sensorData={$hbm} on:sensorSelection={handleSensorSelection} />
     <RTTab {highlightedSensor} dropdownLeftMargin="450px" sensorData={$idl} on:sensorSelection={handleSensorSelection} />
    
</div>

<style>
    .holder {
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        background-color: transparent;
        color: #87888c;

        font-weight: 400;
        font-size: 17px;
    
    }
</style>
