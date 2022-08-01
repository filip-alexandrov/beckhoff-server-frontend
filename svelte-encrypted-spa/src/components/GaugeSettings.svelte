<script lang="ts">
    import { temperature, baumer, hbm, idl } from '../store/sensors'
    import GaugeChart from './GaugeChart.svelte'
    import chartSettingsSvg from '../assets/chartSettings.svg'
    import gaugeCloseSvg from "../assets/checkmark.svg"

    let sensorData = { ...$temperature, ...$baumer, ...$hbm, ...$idl }

    let showSettings = false
    function handleChartSettings() {
        showSettings = !showSettings
    }

    let selectedSensor = 'Temperature #1'
    function handleSensorSelection(sensorName) {
        selectedSensor = sensorName
    }

    let minGaugeValue = 0
    let maxGaugeValue = 400
    function handleSetGaugeValues() {}

    export let gaugeId: string = 'gauge'
</script>

{#if !showSettings}
    <GaugeChart
        {gaugeId}
        {selectedSensor}
        {minGaugeValue}
        {maxGaugeValue}
        on:show-settings={handleChartSettings}
    />
{:else if showSettings}
    <div class="gauge">
        <div class="overlay">
            <div class="sensor-name">
                Settings <img
                    on:click={handleChartSettings}
                    src={gaugeCloseSvg}
                    alt=""
                />
            </div>
            <div class="link-3d">Select sensor:</div>
            <div class="selection">
                {#each Object.entries(sensorData) as [sensorName, sensorValue]}
                    <div
                        on:click={() => {
                            handleSensorSelection(sensorName)
                        }}
                        class="option"
                    >
                        {sensorName}
                    </div>
                    <hr />
                {/each}
            </div>
            <div class="min-max">
                <div>min/max: </div>
                <div class="user-input">
                    <input
                        type="number"
                        placeholder="Min value"
                        bind:value={minGaugeValue}
                    />
                    <input
                        type="number"
                        placeholder="Max value"
                        bind:value={maxGaugeValue}
                    />
                </div>
                
            </div>
        </div>
    </div>
{/if}

<style>
    .gauge {
        position: relative;
        top: 40px;
        left: -40px;
        width: fit-content;
        height: fit-content;
        width: 230px;
    }
    .overlay {
        position: absolute;
        top: -50px;
        left: 60px;
        display: flex;
        flex-direction: column;
        width: 190px;
        height: fit-content;
    }
    .sensor-name {
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .link-3d {
        font-size: 13px;
        color: #87888c;
        margin-top: 2px;
        margin-bottom: 5px;
        cursor: pointer;
    }
    img {
        cursor: pointer;
    }

    .selection {
        cursor: pointer;
        height: 80px;
        color: #ffffff;
        overflow-y: scroll;
    }

    /* dark mode scroll bar */
    .selection::-webkit-scrollbar {
        width: 5px;
    }
    .selection::-webkit-scrollbar-track {
        background: rgb(71, 71, 71);
    }

    /* Handle */
    .selection::-webkit-scrollbar-thumb {
        background: #f1f1f1;
    }

    /* Handle on hover */
    .selection::-webkit-scrollbar-thumb:hover {
        background: #f1f1f1;
    }
    hr{
        height:4px;
        border-bottom: #f1f1f1 1px;
    }
    .min-max {
        /* width: 100%; */
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
    }
    .min-max > div{
        color: #87888c;
    }
    .user-input {
        margin-left: 10px;
    }



    input {
        width: 40px;
        background-color: #555;
        color: #fff;
        border-radius: 3px;
        padding: 0 5px; 
    }
</style>
