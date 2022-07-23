<script>
    import ApexCharts from 'apexcharts'
    import { onMount } from 'svelte'

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
            height: '100%',
            width: '100%',
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 500,
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
            axisBorder: {
                show: true,
                color: '#fff',
                height: '3px',
            },
            labels: {
                style: {
                    colors: '#fff',
                    fontFamily: 'Outfit, Arial, sans-serif',
                    fontWeight: 400,
                },
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
                formatter: undefined,
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

    onMount(() => {
        let chart = new ApexCharts(document.querySelector('#chart'), options)

        chart.render()

        setInterval(function () {
            if (dataY.length < 50) {
                dataY.push(Math.floor(Math.random() * 100))
                dataX.push(Date.now())

                chart.updateSeries([
                    {
                        data: dataY,
                    },
                ])
            }
        }, 500)
    })

    let chartClicked = false
    function handleClick() {
        if (chartClicked == false) {
            // open tooltip with detailed info
            ApexCharts.exec(
                'realtime',
                'updateOptions',
                {
                    tooltip: {
                        fixed: {
                            enabled: false,
                        },
                    },
                },
                false,
                true,
            )
        } else {
            // close tooltip with detailed info
            ApexCharts.exec(
                'realtime',
                'updateOptions',
                {
                    tooltip: {
                        fixed: {
                            enabled: true,
                            offsetX: 2000,
                            offsetY: 0,
                        },
                    },
                },
                false,
                true,
            )
        }

        chartClicked = !chartClicked
    }
</script>

<div on:click={handleClick} id="chart" />

<style>
    #chart {
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>
