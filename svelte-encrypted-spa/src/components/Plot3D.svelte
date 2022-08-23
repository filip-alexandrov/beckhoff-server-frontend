<script>
    import Plotly from 'plotly.js-dist-min'
    import { onMount } from 'svelte'

    onMount(async () => {

        let dbString = await fetch("http://localhost/api/database");
        let db = await dbString.json();

        let distanceX = [];
        let currentY = [];
        let forceZ = []; 

        for(let element of db) {
            distanceX.push(Math.abs(element.D));
            currentY.push(Math.abs(element.I));
            forceZ.push(Math.abs(element.F));
        }

        var trace1 = {
            marker: {
                /* cmax: 14,
                cmin: 20,
                color: [
                    0, 100
                ], */
                autocolorscale: false,
                colorscale: 'Viridis',
                cauto: true,
                color: forceZ,
            },
            hovertemplate:
                'Distance: </b>: %{x:.1f} mm<br>' +
                'Current: %{y:.1f} A<br>' +
                'Force: </b>: %{z:.1f} N<extra></extra>',
            mode: 'markers',
            x: distanceX,
            y: currentY,
            z: forceZ,
            type: 'scatter3d',
            showlegend: false,
            showscale: false,
        }

        var data = [trace1]
        var layout = {
            margin: {
                l: 0,
                r: 0,
                b: 0,
                t: 0,
            },
            showscale: true,
            paper_bgcolor: '#252525',
            plot_bgcolor: '#fff',
            scene: {
                xaxis: {
                    title: 'Distance (mm)',
                    color: '#fff',
                    backgroundcolor: '#fff',
                },
                yaxis: {
                    title: 'Current (A)',
                    color: '#fff',
                    backgroundcolor: '#fff',
                },
                zaxis: {
                    title: 'Force (N)',
                    color: '#fff',
                    backgroundcolor: '#fffs',
                },
                bgcolor: '#252525',
            },
        }
        Plotly.newPlot('my-3d-plot', data, layout)
    })
</script>

<div id="my-3d-plot" />

<style>
    #my-3d-plot {
        width: 100%;
        height: 100%;
    }
</style>
