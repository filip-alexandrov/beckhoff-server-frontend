<script context="module" lang="ts">
    // Define custom on:click_outside event
    declare namespace svelte.JSX {
        interface HTMLProps<T> {
            onclick_outside?: (e: CustomEvent) => void
        }
    }
</script>

<script lang="ts">
    import dropdownSvg from '../assets/dropdown.svg'
    import { slide } from 'svelte/transition'
    import { clickOutside } from './../helpers/clickOutside.js'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    // highlightedSensor is the highlighted (white) sensor on the tabs, which determines the chart values
    // selectedSensor is the locally in tab selected sensor, which may or may not be highlighted

    function handleDropdownClick() {
        if (highlightedSensor != selectedSensor) {
            // Tab is not highlighted, switch to already selected in the tab sensor and highlight it
            dispatch('sensorSelection', { sensorName: selectedSensor })
            return
        }

        // Open dropdown if tab is already highlighed (selectedSensor is the chart sensor)
        isExpanded = !isExpanded
    }
    function handleClickOutside() {
        // Close the dropdown if the user clicks outside of it
        if (isExpanded) {
            isExpanded = false
        }
    }

    function handleSensorSelection(sensorName: string) {
        // Update the selected sensor after click in the dropdown menu
        selectedSensor = sensorName

        // New highlighted sensor
        dispatch('sensorSelection', { sensorName })
    }

    // Get the chart sensor from Parent (highlighted sensor)
    export let highlightedSensor: string

    // Get sensor data from parent
    export let sensorData: any

    export let dropdownLeftMargin: string = '15px'

    // Default (starting) value of the tab
    let selectedSensor = Object.entries(sensorData)[0][0]

    // Dropdown not expanded by default
    let isExpanded = false
</script>

<div
    class:active={highlightedSensor == selectedSensor}
    use:clickOutside
    on:click_outside={handleClickOutside}
    on:click={handleDropdownClick}
    class="option"
>
    {selectedSensor}
    <img src={dropdownSvg} alt="" />
</div>

{#if isExpanded}
    <div transition:slide class="dropdown" style="margin-left: {dropdownLeftMargin};">
        {#each Object.entries(sensorData) as [sensorName, sensorValue]}
            <div
                on:click={() => {
                    handleSensorSelection(sensorName)
                }}
                class="selection"
            >
                {sensorName}
            </div>
            <hr />
        {/each}
    </div>
{/if}

<style>
    .option {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-left: 20px;
    }
    .option img {
        margin-left: 8px;
        height: 30px;

        /* color grey of svg */
        filter: invert(60%) sepia(6%) saturate(173%) hue-rotate(191deg)
            brightness(89%) contrast(86%);
    }

    .active {
        color: #fff;
    }
    .active img {
        /* color white of svg */
        filter: none;
    }

    .dropdown {
        position: absolute;
        top: 35px;
        
        padding: 5px 15px;
        font-size: 16px;
        background-color: #323232;
        border-radius: 5px;
        z-index: 1;
        color: #fff;
    }

    .selection {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 0;
        cursor: pointer;
    }
   /*  .selection:hover + hr {
        border: 1px solid #f0f0f0;
    } */
    hr {
        width: 90%;
        border: 1px solid #424242;
        margin: auto;
        border-radius: 2px;
    }
    .dropdown hr:last-child {
        display: none;
    }
</style>
