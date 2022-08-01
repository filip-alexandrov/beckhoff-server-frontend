<script>
    import Plotly from 'plotly.js-dist-min'
    import { onMount } from 'svelte'
    import { fade } from 'svelte/transition'

    import arrowSvg from '../assets/arrow.svg'

    import mouseLeft from '../assets/mouseLeft.svg'
    import mouseRight from '../assets/mouseRight.svg'
    import mouseScroll from '../assets/mouseScroll.svg'

    /* import xData from './x.json'
    import yData from './y.json'
    import zData from './z.json' */
    let xData = []
    let yData = []
    let zData = []

    var trace1 = {
        x: xData,
        y: yData,
        z: zData,

        type: 'surface',
        colorscale: 'Blackbody',
        color: 'red',
        hovertemplate:
            'X: </b>: %{x:.0f}m<br>' +
            'Y: %{y:.0f}m<br>' +
            'Elevation: </b>: %{z:.0f}m<extra></extra>',

        showscale: false,
    }

    var data = [trace1]

    var my_template = {
        layout: {
            xaxis: {
                gridcolor: 'red',
            },
            yaxis: {
                gridcolor: 'red',
            },
            zaxis: {
                gridcolor: 'red',
            },
        },
    }

    var layout = {
        /* width: '100vw',
        height: '100vh', */
        marker: {
            colorbar: false,
        },
        template: my_template,
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
        },
        xaxis: {
            title: 'This',
        },

        zaxis: {
            title: 'where',
        },

        yaxis: {
            title: 'That',
        },
        font: {
            family: 'Outfit, Arial, sans-serif',
            size: 12,
        },
        paper_bgcolor: '#252525',
        plot_bgcolor: '#fff',
        colorscale: 'Viridis',
        coloraxis: {
            colorbar: {
                bgcolor: '#fff',
                bordercolor: '#fff',
                outlinecolor: '#fff',
                tickcolor: '#fff',
                tickfont: {
                    color: '#fff',
                },
            },
        },
        scene: {
            camera: {
                eye: {
                    x: 0,
                    y: 13,
                    z: 5,
                },
            },
            aspectmode: 'manual',
            aspectratio: {
                x: 20,
                y: 10,
                z: 1.3,
            },

            xaxis: {
                title: 'Longitudanal Distance (m)',
                color: '#fff',
                spikecolor: '#fff',
                /* tickcolor: '#fff', */
                /* zerolinecolor: '#fff', */
                spikesides: true,
                showgrid: false,
                showline: false,
                visible: false,
            },
            yaxis: {
                title: 'Latitudinal Distance (m)',
                color: '#fff',
                spikecolor: '#fff',
                /* tickcolor: '#fff', */
                /* zerolinecolor: '#fff', */
                spikesides: true,
                showgrid: false,
                showline: false,
                visible: false,
            },
            zaxis: {
                title: 'Elevation (m)',
                color: '#fff',
                spikecolor: '#fff',
                /* tickcolor: '#fff', */
                /* zerolinecolor: '#fff', */
                spikesides: true,
                showgrid: false,
                showline: false,
                visible: false,
            },
        },
    }

    var config = { responsive: true }

    onMount(() => {
        Plotly.newPlot('tester', data, layout, config) /* .then((graph) => {
            setTimeout(() => {
                // Init new array of slices
                let newZArray = []

                // loop through all slices
                for (let subArray of zData) {
                    // multiply each slice element by the slider value
                    newZArray.push(subArray.map((x) => x * sliderValue))
                }

                Plotly.restyle(graph, 'z', [newZArray])
            }, 2000)
        }) */
    })

    let sliderValue = 100
    function handleSliderChange() {
        // Init new array of slices
        /* let newZArray = []

        // loop through all slices
        for (let subArray of zData) {
            // multiply each slice element by the slider value
            newZArray.push(subArray.map((x) => (x * sliderValue) / 100))
        }

        // Update the plot with the new data
        Plotly.restyle('tester', 'z', [newZArray]) */

        layout.scene.aspectmode = 'manual'
        layout.scene.aspectratio.z = sliderValue / 100

        Plotly.relayout('tester', layout)
    }

    let hideInstruction = false
    function handleHideInstruction() {
        hideInstruction = true
    }
</script>

<svelte:window
    on:wheel={handleHideInstruction}
    on:mousedown={handleHideInstruction}
/>

<div id="tester">
    <div class="options">
        <a href="/mariana" class="switch">
            Switch to Mariana Trench
            <img src={arrowSvg} alt="" />
        </a>
        <div class="header">Mt. Everest</div>
        <div>
            <p>Change scaling: <span>{sliderValue}%</span></p>
        </div>
        <div class="slider">
            <span style="margin-right: 5px">0%</span>
            <input
                on:mouseup={handleSliderChange}
                type="range"
                min="1"
                max="1000"
                bind:value={sliderValue}
                style="background: linear-gradient(
                to right,
                #fff 0%,
                #fff {sliderValue / 10}%,
                #9e9e9e {sliderValue / 10}%,
                #9e9e9e 100%
            );"
            />
            <span style="margin-left: 5px">1000%</span>
        </div>
    </div>

    {#if !hideInstruction}
        <div
            transition:fade={{ delay: 250, duration: 300 }}
            class:hide={hideInstruction}
            class="instructions"
        >
            <div>
                <img src={mouseLeft} alt="" />
                <span>Rotate</span>
            </div>
            <div>
                <img src={mouseScroll} alt="" />
                <span>Zoom</span>
            </div>
            <div>
                <img src={mouseRight} alt="" />
                <span>Drag</span>
            </div>
        </div>
    {/if}
</div>

<style>
    #tester {
        height: 100%;
        width: 100%;
        position: relative;
    }
    .options {
        position: absolute;
        bottom: 5px;
        left: 10px;
        mix-blend-mode: exclusion;
        display: flex;
        align-items: start;
        font-weight: 400;
        flex-direction: column;

        -webkit-user-select: none;
        user-select: none;
    }

    .header {
        color: #fff;
        font-size: 30px;
        display: flex;
        align-items: center;
        mix-blend-mode: light;
    }
    /* .header:after{
        color: rgba(37,37,37,1);
       
    } */
    .switch {
        /* color: #9e9e9e; */
        display: flex;
        align-items: center;
        cursor: pointer;
        mix-blend-mode: exclusion;
    }
    .switch:hover {
        color: #fff;
    }
    img {
        height: 20px;
        color: #9e9e9e;
        margin-left: 10px;
    }
    .slider {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    input[type='range'] {
        color: white;
        border-radius: 8px;
        height: 7px;
        outline: none;
        -webkit-appearance: none;
    }

    input[type='range']::-webkit-slider-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        -webkit-appearance: none;
        cursor: ew-resize;
        background: #434343;
    }

    .instructions {
        position: absolute;
        top: 5vh;
        width: 50vw;
        color: white;
        display: flex;
        justify-content: space-between;
        font-weight: 400;
        flex-direction: row;
        left: 50%;
        transform: translateX(-50%);
    }
    .instructions div {
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 20px;
        font-weight: 400;
    }
    .instructions div img {
        height: 20vh;
        margin-bottom: 1vh;
    }
    /* .hide {
        display: none;
    } */
</style>
