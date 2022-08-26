<script context="module" lang="ts">
    declare namespace svelte.JSX {
        interface HTMLAttributes<T> {
            onclick_outside: () => void
        }
    }
</script>

<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from 'svelte'
    import { clickOutside } from '../helpers/clickOutside.js'
    import Plotly from 'plotly.js-dist-min'
    import { sensorUnits, otherSensorMappings } from '../store/sensors'
    import { io } from 'socket.io-client'

    import { values, timestamps } from '../assets/massiveObj'

    export let clickedSensor: string
    export let isVisible = false

    // Socket.io setup
    let received = ''
    let status = ''

    // connect
    const socket = io('http://localhost')

    // set variable to follow
    socket.emit('subscribe:variable', {
        variable: otherSensorMappings[clickedSensor],
    })

    // check if connected to runtime
    socket.on('subscription:status', (data) => {
        status = data.success
    })

    const dispatch = createEventDispatcher()

    function handleClickOutisde() {
        dispatch('click-outside')
    }

    onMount(() => {
        let data = [
            {
                x: [null],
                y: [null],
                mode: 'lines',
                marker: { color: '#DFE300' },
            },
        ]

        let layout = {
            title: 'Live Feed',
            paper_bgcolor: '#212121',
            plot_bgcolor: '#212121',
            font: {
                color: '#fff',
                family: 'Outfit',
            },
            yaxis: {
                color: '#fff',
                zerolinecolor: '#fff',

                zeroline: true,
                showline: true,
            },
            hoverlabel: {
                bgcolor: '#212121',
                font: {
                    color: '#fff',
                    family: 'Outfit',
                },
            },
        }

        Plotly.newPlot('myDiv', data, layout)

        // receive data from runtime
        socket.on('data', (data) => {
            let timestamps = data.timestamps.map((date) => new Date(date))

            let update = {
                x: [timestamps],
                y: [data.values],
            }

            let time = new Date()

            // 1 second chart range
            let olderTime = time.setSeconds(time.getSeconds() - 1)
            let futureTime = time.setSeconds(time.getSeconds() + 1)

            // update chart specific viewport to fit 1 min
            let minuteView = {
                xaxis: {
                    type: 'date',
                    range: [olderTime, futureTime],
                },
            }

            Plotly.relayout('myDiv', minuteView)

            Plotly.extendTraces('myDiv', update, [0])
        })
    })

    onDestroy(() => {
        socket.emit('disconnect:system')
        socket.disconnect()
    })
</script>

<div
    class:visible={isVisible}
    class="full-screen"
    use:clickOutside
    on:click_outside={handleClickOutisde}
>
    <div
        class="sensor-name"
        on:click={() => {
            socket.disconnect()
        }}
    >
        Disconnect & Stop
    </div>
    <div id="myDiv" />
</div>

<style>
    .full-screen {
        position: absolute;

        width: 1000px;
        top: 0px;
        left: -1000px;
        height: 100%;
        z-index: 0;

        transition: all 0.5s ease-in-out;
    }
    .visible {
        left: 0px;
        transition: all 0.5s ease-in-out;
    }
    #myDiv {
        width: 100%;
        height: 100%;
    }
    .sensor-name {
        color: #fff;
        position: absolute;
        font-size: 20px;
        z-index: 1;
        top: 10px;
        left: 10px;
        cursor: pointer;
    }
</style>
