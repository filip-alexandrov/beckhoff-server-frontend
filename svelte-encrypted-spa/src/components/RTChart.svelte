<script lang="ts">
    import ApexCharts from 'apexcharts'
    import { onDestroy, onMount } from 'svelte'
    import RTTabs from './RTTabs.svelte'

    // array series
    let dataX = []
    let dataY = []

    dataX.push(Date.now())
    dataY.push(Math.random() * 100)

    let options = {
        colors: ['#DFE300', '#4576b5'],
        fill: {
            opacity: 1,
        },
        grid: {
            show: false,
            borderColor: '#fff',
        },
        series: [
            {
                data: dataY.slice(),
            },
        ],
        chart: {
            id: 'realtime',
            height: '90%',
            width: '100%',
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 750,
                },
            },
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        markers: {
            size: 0,
        },
        yaxis: {
            max: 100,
            axisBorder: {
                show: true,
                color: '#fff',
                width: '3px',
                offsetX: -5,
            },
            title: {
                text: 'Force',
                offsetX: 8,
                offsetY: 0,
                style: {
                    color: '#fff',
                    fontSize: '15px',
                    fontFamily: 'Outfit, Arial, sans-serif',
                    fontWeight: 500,
                },
            },
            labels: {
                style: {
                    colors: '#fff',
                    fontFamily: 'Outfit, Arial, sans-serif',
                    fontWeight: 400,
                },
                formatter: function (val) {
                    return val.toFixed(2)
                },
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                show: true,
                stroke: {
                    color: '#fff',
                    dashArray: 3,
                },
            },
            tooltip: {
                enabled: true,
                offsetX: -30,
            },
        },
        xaxis: {
            type: 'datetime',
            categories: dataX,
            decimalsInFloat: 2,
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: true,
                color: '#fff',
                height: '3px',
            },
            labels: {
                show: false,
                format: 'HH:mm:ss',
                style: {
                    colors: '#fff',
                    fontFamily: 'Outfit, Arial, sans-serif',
                    fontWeight: 400,
                },
                datetimeUTC: false
            },
            title: {
                text: 'Time',
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: '#fff',
                    fontSize: '15px',
                    fontFamily: 'Outfit, Arial, sans-serif',
                    fontWeight: 500,
                },
            },
            tooltip: {
                enabled: true,
                formatter: function (val, opts) {
                    let date = new Date(val); 
                    let formatted = date.toTimeString().split(' ')[0]
                    return `${formatted}`;
                },
                offsetY: 7,
                style: {
                    fontSize: '15px',
                    fontFamily: 'Outfit, Arial, sans-serif',
                },
            },
            range: 10000, // in milliseconds
        },
        legend: {
            show: false,
        },
        tooltip: {
            enabled: true,
            flowCursor: true,
            showOnMarkerHover: false,
            style: {
                fontSize: '12px',
                fontFamily: 'Outfit, Arial, sans-serif',
                fontWeight: 400,
            },
            marker: {
                show: false,
            },
            fixed: {
                enabled: true,
                offsetX: 2000,
                offsetY: 0,
            },
            theme: 'dark',
        },
    }

    let chart; 
    let interval:  any; 
    onMount(() => {
        chart = new ApexCharts(
            document.querySelector('#' + chartId),
            options,
        )

        chart.render()

        interval = setInterval(function () {
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
        }, 750)
    })

    onDestroy(() => {
        clearInterval(interval)
        chart.destroy()
    })

    let isPaused = false
    function handlePause(event) {
        // Pause the chart
        isPaused = event.detail.isPaused
    }

    let activeSensor = 'Temperature #1'
    let units = "Temperature (°C)"
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
    .chart {
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>
