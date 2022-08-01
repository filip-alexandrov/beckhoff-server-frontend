<script lang="ts">
    import { path } from 'svelte-pathfinder'
    import visualization from '../assets/visualization.svg'
    import dashboard from '../assets/dashboard.svg'
    import start from '../assets/start.svg'
    import settings from '../assets/settings.svg'
    import controlPanel from '../assets/controlPanel.svg'
    import live from '../assets/live.svg'

    import { Modals, closeModal, openModal, modals } from 'svelte-modals'
    import { fade } from 'svelte/transition'
    import {circInOut, linear} from 'svelte/easing'

    import Modal from './Modal.svelte'
    import { fly } from 'svelte/transition'

    import { createEventDispatcher } from 'svelte/internal'
    import { goto } from 'svelte-pathfinder'
    import Motor from './ControlPanel.svelte'
    const dispatch = createEventDispatcher()

    function handleSettingsClick() {
        openModal(Modal, {
            title: 'Alert modal is opened',
        })
    }

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
        <button> <img src={start} alt="" /> Start</button>
        <button on:click={handleSettingsClick}
            ><img src={settings} alt="" /> Settings</button
        >
    </div>
    <div class="right">
        <button class:selected={displayMotorControl} on:click={handleDisplayMotorControl}
            ><img src={controlPanel} alt="" /> Contol panel</button
        >
    </div>
</div>

<!-- TODO: remove ! from display -->
{#if !displayMotorControl}
    <div transition:fly={{y: 0, x: 350, easing: linear}}>
        <Motor />
    </div>
{/if}

<Modals>
    <div
        slot="backdrop"
        class="backdrop"
        transition:fade
        on:click={closeModal}
    />
</Modals>

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
    .backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
    }
</style>
