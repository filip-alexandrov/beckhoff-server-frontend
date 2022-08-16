<script context="module" lang="ts">
    declare namespace svelte.JSX {
        interface HTMLAttributes<T> {
            onclick_outside: () => void
        }
    }
</script>

<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte'
    import { clickOutside } from '../helpers/clickOutside.js'
    import Plotly from 'plotly.js-dist-min'

    const dispatch = createEventDispatcher()

    function handleClickOutisde() {
        dispatch('click-outside')
    }

    export let clickedSensor: string
    export let isVisible = false

    onMount(() => {
        function rand() {
            return Math.random()
        }

        var time = new Date()

        var data = [
            {
                x: [time],
                y: [rand()],
                mode: 'lines',
                line: { color: '#80CAF6' },
            },
        ]

        Plotly.newPlot('myDiv', data)

        var cnt = 0

        var interval = setInterval(function () {
            var time = new Date()

            var update = {
                x: [[time]],
                y: [[rand()]],
            }

            Plotly.extendTraces('myDiv', update, [0])

            /* if (++cnt === 100) clearInterval(interval) */
        }, 1)
    })
</script>

<div
    class:visible={isVisible}
    class="full-screen"
    use:clickOutside
    on:click_outside={handleClickOutisde}
>
    {clickedSensor}
    <div id="myDiv" />
</div>

<style>
    .full-screen {
        background-color: aqua;
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
</style>
