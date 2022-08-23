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
    import { sensorUnits } from '../store/sensors'
    import { io } from 'socket.io-client'

    export let clickedSensor: string
    export let isVisible = false

    // Socket.io setup
    let received = ''
    let status = ''

    // connect
    const socket = io('http://localhost')

    // set variable to follow
    socket.emit('subscribe:variable', {
        variable: 'MAIN.counter',
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
        function rand() {
            return Math.random()
        }

        var time = new Date()

        var data = [
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
            console.log("Socket received data")

            console.log(data.timestamps)
            console.log(data.values)

            let update = {
                x: [data.timestamps],
                y: [data.values],
            }

            // 1 minute chart range
            let olderTime = time.setMinutes(time.getMinutes() - 1)
            let futureTime = time.setMinutes(time.getMinutes() + 1)

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
        socket.emit("disconnect:system"); 
        socket.disconnect(); 
    })
</script>

<div
    class:visible={isVisible}
    class="full-screen"
    use:clickOutside
    on:click_outside={handleClickOutisde}
>
    <div id="myDiv"><div class="sensor-name">{clickedSensor}</div></div>
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
        position: relative;
        font-size: 200px;
    }
</style>
