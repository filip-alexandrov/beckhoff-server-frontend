<script lang="ts">
    import visualization from '../assets/visualization.svg'
    import dashboard from '../assets/dashboard.svg'
    import start from '../assets/start.svg'
    import settings from '../assets/settings.svg'
    import warning from '../assets/warning.svg'

    import { Modals, closeModal, openModal, modals } from 'svelte-modals'
    import { fade } from 'svelte/transition'

    import Modal from './Modal.svelte'

    function handleOpen() {
        openModal(Modal, {
            title: 'Alert modal is opened',
        })
    }

    let selected = 'dashboard'
</script>

<div class="top-nav">
    <div class="left">
        <button class:selected={selected == 'visualization'}>
            <img src={visualization} alt="" /> Visualization
        </button>
        <button class:selected={selected == 'dashboard'}
            ><img src={dashboard} alt="" /> Live</button
        >
        <button class:selected={selected == 'explore'}
            >Explore</button
        >
    </div>
    <div class="center">
        <button> <img src={start} alt="" /> Start</button>
        <button on:click={handleOpen}
            ><img src={settings} alt="" /> Settings</button
        >
    </div>
    <div class="right">
        <button><img src={warning} alt="" /> Emergency Stop</button>
    </div>
</div>

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
