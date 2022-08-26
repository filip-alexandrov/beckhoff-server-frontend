<script>
    import {
        fullSensorData,
        sensorUnits,
        otherSensors,
        temperatureSensors,
    } from '../store/sensors'
    import { createEventDispatcher } from 'svelte'

    export let clickedSensor

    const dispatch = createEventDispatcher()

    function handleSensorClick(sensor) {
        dispatch('sensor-click', { sensor })
    }
</script>

<div class="left-nav">
    <div class="category">
        <div class="header">OTHER</div>
        {#each otherSensors as otherSensor}
            <div
                class:selected={clickedSensor == otherSensor}
                on:click={() => handleSensorClick(otherSensor)}
                class="button"
            >
                <div class="description">
                    {otherSensor}
                </div>

                <div class="value">
                    {$fullSensorData[otherSensor]}
                    {$sensorUnits[otherSensor]}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .left-nav {
        background-color: #323232;
        position: relative;
        z-index: 1;
    }

    .category {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 22px;
    }
    .header {
        margin-left: 5px;
        font-size: 12px;
        font-weight: 400;
    }
    .button {
        background-color: #323232;
        border: none;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 5%;
        height: 32px;
        cursor: pointer;
        box-sizing: border-box;
    }
    .button:hover {
        background-color: var(--hover-color);
    }
    .selected {
        border-left: #fff solid 5px;
    }
</style>
