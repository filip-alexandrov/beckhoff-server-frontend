<script lang="ts">
    import ApexCharts from 'apexcharts'
    import { onDestroy, onMount } from 'svelte'
    import RTTabs from './RTTabs.svelte'
    import Plotly from 'plotly.js-dist-min'

    function rand() {
        return Math.random()
    }

    var time = new Date()

    var data = [
        {
            x: [time],
            y: [rand],
            mode: 'lines',
            line: { color: '#80CAF6' },
        },
    ]

    var layout = {
        /* xaxis: {
            type: 'date',
            domain: [0, 1],
            showticklabels: false,
        },
        yaxis: { domain: [0.6, 1] },
        xaxis2: {
            type: 'date',
            anchor: 'y2',
            domain: [0, 1],
        },
        yaxis2: {
            anchor: 'x2',
            domain: [0, 0.4],
        }, */
        paper_bgcolor: '#212121',
        plot_bgcolor: '#212121',
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 100,
            pad: 0,
        },

        font: {
            color: '#FFFFFF',
            family: 'Outfit',
            size: 12,
        }
    }

    let interval: any
    onMount(() => {
        Plotly.newPlot(chartId, data, layout)

        var cnt = 0

        var interval = setInterval(function () {
            var time = new Date()

            var update = {
                x: [[time]],
                y: [[rand()]],
            }

            var olderTime = time.setMinutes(time.getMinutes() - 1)
            var futureTime = time.setMinutes(time.getMinutes() + 1)

            var minuteView = {
                xaxis: {
                    type: 'date',
                    range: [olderTime, futureTime],
                },
            }

            Plotly.relayout(chartId, minuteView)
            Plotly.extendTraces(chartId, update, [0])
        }, 750)

        /* interval = setInterval(function () {
            let toAppend = 0
            if (activeSensor in temperature && !isPaused) {
                toAppend =
                    temperature[activeSensor][
                        temperature[activeSensor].length - 1
                    ]
            } else if (activeSensor in baumer && !isPaused) {
                toAppend = baumer[activeSensor][baumer[activeSensor].length - 1]
            } else if (activeSensor in hbm && !isPaused) {
                toAppend = hbm[activeSensor][hbm[activeSensor].length - 1]
            } else if (activeSensor in idl && !isPaused) {
                toAppend = idl[activeSensor][idl[activeSensor].length - 1]
            }

            if (isPaused) {
                return
            }

            dataX.push(Date.now())
            chart.appendData([
                {
                    data: [toAppend],
                },
            ])
        }, 750) */
    })

    onDestroy(() => {
        clearInterval(interval)
    })

    let isPaused = false
    function handlePause(event) {
        // Pause the chart
        isPaused = event.detail.isPaused
    }

    let activeSensor = 'Temperature #1'
    let units = 'Temperature (°C)'
    function handleSensorSelection(event) {
        activeSensor = event.detail.sensorName
    }

    export let chartId: string
</script>

<div class="container">
    <div class="tabs">
        <RTTabs
            on:sensorSelection={handleSensorSelection}
            on:pause={handlePause}
        />
    </div>
    <div id={chartId} class="chart" />
</div>

<style>
    .container {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .tabs{
        position: relative;
    }
    .chart {
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>
