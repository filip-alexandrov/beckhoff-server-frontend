<script lang="ts">
    import Plotly from 'plotly.js-dist-min'
    import { onDestroy, onMount } from 'svelte'
    import chartSettingsSvg from '../assets/chartSettings.svg'
    import { createEventDispatcher } from 'svelte'
    import onOffSvg from '../assets/on-off.svg'
    import { allPlcVariables } from '../store/apiReadingCom'
    import { writeValues } from '../store/requests'

    const dispatch = createEventDispatcher()

    export let gaugeId: string = 'gauge'

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
                        color: '#DFE300',
                        width: 9,
                    },
                },
                axis: {
                    tickcolor: '#fff',
                    range: [0, 40],
                },
                steps: [
                    {
                        range: [0, 40],
                        color: '#2B2B36',
                    },
                ],
            },

            number: {
                font: {
                    size: 18,
                    color: '#fff',
                    family: 'Outfit',
                },
                suffix: ' mm',
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
                    value: $allPlcVariables['GVL_OutputHMI.rMotorPosition'],
                },
                {},
            )
        }, 750)
    })

    onDestroy(() => {
        clearInterval(interval)
    })

    let errorMessage = ''

    let newMotorMoveObj = {
        'GVL_InputHMI.bManualMoveMotor': true,
        'GVL_InputHMI.rManualMotorPosition': null,
        'GVL_InputHMI.rManualMotorVelocity': null,
    }

    async function handleManualMotorStart() {
        if (
            newMotorMoveObj['GVL_InputHMI.rManualMotorPosition'] == null ||
            newMotorMoveObj['GVL_InputHMI.rManualMotorVelocity'] == null
        ) {
            errorMessage = 'Please fill in all fields'
            return
        }

        let tcRes = await writeValues(newMotorMoveObj)

        if (tcRes.success == false) {
            errorMessage = 'Error starting manual motor control'
            return
        }
        errorMessage = ''
    }

    async function handleManualMotorStop() {
        let tcRes = await writeValues({
            'GVL_InputHMI.bManualMoveMotor': false,
        })

        if (tcRes.success == false) {
            errorMessage = 'Error stopping manual motor control'
            return
        }
        errorMessage = ''
    }
</script>

<div class="motor-control">
    <div class="gauge" id={gaugeId}>
        <div class="overlay">
            <div class="part-name">Motor control</div>
            <div class="speed-title">Live speed</div>
            <div class="speed-live">
                {$allPlcVariables['GVL_OutputHMI.rMotorVelocity']}<span
                    >&nbsp;mm/s</span
                >
            </div>
        </div>
    </div>

    <div class="motor-input">
        <div class="subtitle">Desired position</div>
        <div class="position">
            <input
                type="number"
                bind:value={newMotorMoveObj[
                    'GVL_InputHMI.rManualMotorPosition'
                ]}
            />mm
        </div>

        <div class="subtitle">Velocity</div>
        <div class="speed">
            <input
                type="number"
                bind:value={newMotorMoveObj[
                    'GVL_InputHMI.rManualMotorVelocity'
                ]}
            />mm/s
        </div>

        {#if $allPlcVariables['GVL_InputHMI.bManualMoveMotor']}
            <button on:click={handleManualMotorStop}
                ><img src={onOffSvg} alt="" /> STOP</button
            >
        {:else}
            <button on:click={handleManualMotorStart}
                ><img src={onOffSvg} alt="" /> START</button
            >
        {/if}
    </div>
</div>
<p>{errorMessage}</p>

<style>
    .motor-control {
        display: flex;
        flex-direction: row;
    }

    .gauge {
        position: relative;
        top: 70px;
        left: -60px;
        width: fit-content;
        height: fit-content;
        width: 230px;
    }
    .overlay {
        position: absolute;
        top: -70px;
        left: 60px;
        width: 190px;
        height: fit-content;
    }
    .part-name {
        font-size: 23px;
    }
    .speed-live {
        font-size: 23px;
        position: relative;
        top: -8px;
    }
    .speed-live span {
        font-size: 15px;
    }
    .speed-title {
        font-size: 13px;
        color: #87888c;
        margin-top: 2px;
        margin-bottom: 5px;
    }
    .motor-input {
        margin-top: 26px;
        z-index: 1;
    }
    .subtitle {
        font-size: 13px;
        color: #87888c;
        margin-top: 5px;
        margin-bottom: 3px;
    }
    .position,
    .speed {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }
    input {
        background-color: #323232;
        width: 60px;
        height: 30px;
        border: 2px solid #fff;
        border-radius: 6px;
        padding: 0px 5px;
        margin-right: 2px;
    }
    input:focus {
        border: 2px solid #fff !important;
    }

    button {
        background-color: transparent;
        float: right;
        margin-top: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    button img {
        margin-right: 5px;
    }
    p {
        margin-top: 10px;
        width: 100%;
        text-align: right;
    }
</style>
