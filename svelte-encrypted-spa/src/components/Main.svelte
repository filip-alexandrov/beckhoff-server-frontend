<script>
    import ApexCharts from 'apexcharts'
    import { onMount } from 'svelte'

    // array series
    let dataX = []
    let dataY = []
    for (let i = 0; i < 10; i = i + 0.15) {
        dataX.push(i)
        dataY.push(Math.random() * 100)
    }

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
                data: dataY,
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
                    speed: 1000,
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
                show: true,
                color: '#fff',
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
            type: 'numeric',
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
                text: 'Distance',
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
            /* range: 20, */ 
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

            /*  custom: "<div />", */
        },
    }

    onMount(() => {
        let chart = new ApexCharts(document.querySelector('#chart'), options)

        chart.render()

       /*  setInterval(function () {
            dataX.push(Math.floor(Math.random() * 10))

            chart.updateSeries([
                {
                    data: dataX,
                },
            ])
        }, 1000) */
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

<div class="main">
    <div class="charts">
        <div class="tabs1">tabs1</div>
        <div class="tabs2">tabs2</div>
        <div class="chart1"><div on:click={handleClick} id="chart" /></div>
        <div class="chart2">chart2</div>
        <div class="tabs3">tabs3</div>
        <div class="tabs4">tabs4</div>
        <div class="chart3">chart3</div>
        <div class="chart4">chart4</div>
        <div class="gauges">gauges</div>
        <!-- <div class="gauges">gauges</div> -->
    </div>
</div>

<style>
    .main {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .charts {
        height: 100%;
        width: 99%;
        display: grid;

        grid-template-columns: 50% 50%;
        grid-template-rows: 35px 325px 35px 325px auto;
        box-sizing: border-box;
    }

    .chart1 {
        font-family: 'Outfit' sans-serif;
    }
    .chart2 {
        background-color: red;
    }
    .chart3 {
        background-color: blue;
    }
    .chart4 {
        background-color: yellow;
    }
    .gauges {
        background-color: aqua;
        width: 100%;
        grid-area: 5 / 1 / span 1 / span 2;
        background-color: green;
    }
</style>
