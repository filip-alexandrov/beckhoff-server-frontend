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
    import chartSettingsSvg from '../assets/chartSettings.svg'
    import pauseSvg from '../assets/pause.svg'
    import chartResume from '../assets/chartResume.svg'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let highlightedSensor: string = 'Temperature #1'
    function handleSensorSelection(
        event: CustomEvent<{ sensorName: string }>,
        category: string,
    ) {
        // Update the selected sensor after click in the dropdown menu
        highlightedSensor = event.detail.sensorName

        // Switch chart plot sensor to the newly selected
        dispatch('sensorSelection', {
            sensorName: event.detail.sensorName,
            category,
        })
    }

    let isOpen = false
    setTimeout(() => {
        isOpen = true
    }, 10000)

    let isPaused = false
    function handlePause() {
        isPaused = !isPaused

        dispatch('pause', { isPaused })
    }
</script>

<div class="tab-holder">
    <div class="sensors">
        <RTTab
            {highlightedSensor}
            dropdownLeftMargin="30px"
            sensorData={$temperature}
            on:sensorSelection={(event) =>
                handleSensorSelection(event, 'temperature')}
        />
        <RTTab
            {highlightedSensor}
            dropdownLeftMargin="200px"
            sensorData={$baumer}
            on:sensorSelection={(event) =>
                handleSensorSelection(event, 'baumer')}
        />
        <RTTab
            {highlightedSensor}
            dropdownLeftMargin="340px"
            sensorData={$hbm}
            on:sensorSelection={(event) => handleSensorSelection(event, 'hbm')}
        />
        <RTTab
            {highlightedSensor}
            dropdownLeftMargin="450px"
            sensorData={$idl}
            on:sensorSelection={(event) => handleSensorSelection(event, 'idl')}
        />
    </div>

    <div class="options">
        <p on:click={handlePause} class:hide={isPaused}>
            <img src={pauseSvg} alt="" />Pause
        </p>

        <p on:click={handlePause} class:hide={!isPaused}>
            <img src={chartResume} alt="" />Resume
        </p>

        <p><img src={chartSettingsSvg} alt="" />Settings</p>
    </div>
</div>

<style>
    .tab-holder {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .sensors {
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
    .options {
        display: flex;
    }
    img {
        height: 25px;
        width: 30px;
        margin-right: 2px;
    }
    p {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-right: 20px;
    }
    .hide {
        display: none;
    }
</style>
