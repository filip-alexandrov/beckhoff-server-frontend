<script lang="ts">
    import Plotly from 'plotly.js-dist-min'
    import { onDestroy, onMount } from 'svelte'
    import chartSettingsSvg from '../assets/chartSettings.svg'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    export let gaugeId: string = 'gauge'
    export let selectedSensor = 'Temperature #1'
    export let minGaugeValue = 0
    export let maxGaugeValue = 400

    let data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: 0,
            title: { text: '' },
            type: 'indicator',
            mode: 'gauge+number',

            gauge: {
                bgcolor: 'rgba(0,0,0,0)',
                bordercolor: 'rgba(0,0,0,0)',
                borderwidth: 2,
                bar: {
                    line: {
                        color: '#e0ff2d',
                        width: 9,
                    },
                },
                axis: {
                    tickcolor: '#fff',
                    range: [minGaugeValue, maxGaugeValue],
                },
                steps: [
                    {
                        range: [minGaugeValue, maxGaugeValue],
                        color: '#2B2B36',
                    },
                ],
            },

            number: {
                font: {
                    size: 20,
                    color: '#fff',
                    family: 'Outfit',
                },
                suffix: ' °C',
            },
        },
    ]

    let interval
    onMount(() => {
        let layout = {
            width: 300,
            height: 120,

            margin: { t: 0, b: 0 },
            paper_bgcolor: 'rgba(0,0,0,0)',
            font: {
                color: '#fff',
                size: '20px',
                family: 'Outfit, Arial, sans-serif',
            },
        }
        Plotly.newPlot(gaugeId, data, layout)

        interval = setInterval(() => {
            Plotly.update(
                gaugeId,
                {
                    value: Math.random() * 400,
                },
                {},
            )
        }, 750)
    })

    onDestroy(() => {
        clearInterval(interval)
    })

    function handleChartSettings() {
        dispatch('show-settings')
    }
</script>

<div>
    <div class="gauge" id={gaugeId}>
        <div class="overlay">
            <div class="sensor-name">
                {selectedSensor} <img
                    on:click={handleChartSettings}
                    src={chartSettingsSvg}
                    alt=""
                />
            </div>
            <div class="link-3d">3D visualization -></div>
        </div>
    </div>
</div>

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
</style>
