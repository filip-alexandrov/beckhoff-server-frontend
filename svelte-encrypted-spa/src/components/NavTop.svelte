<script lang="ts">
    import { path } from 'svelte-pathfinder'
    import visualization from '../assets/visualization.svg'
    import dashboard from '../assets/dashboard.svg'
    import start from '../assets/start.svg'
    import settings from '../assets/settings.svg'
    import controlPanel from '../assets/controlPanel.svg'
    import live from '../assets/live.svg'

    import connectionFailure from '../assets/connection-failure.svg'
    import connectionSuccess from '../assets/connection-success.svg'
    import { plcConnectionStatus } from '../store/apiStatusCom'
    import { connectToPlc, disconnectPlc } from '../store/requests'

    import { Modals, closeModal, openModal, modals } from 'svelte-modals'
    import { fade } from 'svelte/transition'
    import { circInOut, linear } from 'svelte/easing'

    import Modal from './Modal.svelte'
    import { fly } from 'svelte/transition'

    import { createEventDispatcher } from 'svelte/internal'
    import { goto } from 'svelte-pathfinder'
    import ControlPanel from './ControlPanel.svelte'

    function handleTabClick(clickedTab) {
        selected = clickedTab
        goto(`/${clickedTab}`)
    }

    let selected = 'live'
    switch ($path.toString()) {
        case '/explore':
            selected = 'explore'
            break
        case '/live':
            selected = 'live'
            break
        case '/visualization':
            selected = 'visualization'
            break

        default:
            selected = 'live'
            break
    }

    let displayMotorControl = false
    function handleDisplayMotorControl() {
        displayMotorControl = !displayMotorControl
    }

    console.log($path.toString())
</script>

<div class="top-nav">
    <div class="left">
        <button
            class:selected={selected == 'visualization'}
            on:click={() => handleTabClick('visualization')}
        >
            <img src={visualization} alt="" /> Visualization
        </button>
        <button
            class:selected={selected == 'live'}
            on:click={() => handleTabClick('live')}
            ><img src={live} alt="" /> Live</button
        >
        <button
            class:selected={selected == 'explore'}
            on:click={() => handleTabClick('explore')}
            ><img src={dashboard} alt="" /> Explore</button
        >
    </div>
    <div class="center">
        {#if $plcConnectionStatus.success == false}
            <button on:click={connectToPlc}>
                <img src={connectionFailure} alt="" /> Connect to PLC</button
            >
        {:else if $plcConnectionStatus.success == true}
            <button on:click={disconnectPlc}>
                <img src={connectionSuccess} alt="" /> PLC Connected</button
            >
        {/if}
    </div>
    <div class="right">
        {#if $plcConnectionStatus.success == false}
            <button> <img src={controlPanel} alt="" /> No connection</button>
        {:else if $plcConnectionStatus.success == true}
            <button
                class:selected={displayMotorControl}
                on:click={handleDisplayMotorControl}
                ><img src={controlPanel} alt="" /> Contol panel</button
            >
        {/if}
    </div>
</div>

<!-- TODO: remove ! -->
{#if !displayMotorControl}
    <div transition:fly={{ y: 0, x: 350, easing: linear }}>
        <ControlPanel />
    </div>
{/if}

<style>
    .top-nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #424242;
    }
    .top-nav div {
        flex-direction: row;
        display: flex;
    }
    .top-nav div button img {
        margin-right: 14px;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 18px;
        height: 40px;
        border: none;
        background-color: #424242;
        font-family: 'Oufit', sans-serif;
        font-size: 21px;
        font-weight: 500;
        color: white;
    }
    button:hover {
        background-color: #555555;
        cursor: pointer;
    }
    .selected {
        background-color: #212121;
        border-radius: 20 20 0 0;
    }
    .selected:hover {
        background-color: #212121;
    }
</style>
