<script>
    import { slide } from 'svelte/transition'
    export let modes = []
    export let subtitle = 'Op. mode'

    export let selected = modes[0]
    let isOpen = false

    function handleModeSelection(mode) {
        isOpen = !isOpen
        selected = mode
    }
</script>

<div class="input-subfield">
    <div class="subtitle">{subtitle}</div>
    <div
        on:click={() => {
            isOpen = !isOpen
        }}
        class="input-box"
    >
        <div class="op-mode">{selected}</div>
    </div>

    <!-- OpMode Dropdown selector -->
    {#if isOpen}
        <div transition:slide class="dropdown">
            {#each modes.filter((mode) => mode != selected) as mode}
                <div
                    on:click={() => {
                        handleModeSelection(mode)
                    }}
                    class="selection"
                >
                    {mode}
                </div>
                <hr />
            {/each}
        </div>
    {/if}
</div>

<style>
    .op-mode {
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 500;
        width: 60px;
        height: 30px;
        padding: 0px 5px;
        margin-right: 2px;
        color: #323232;
        background-color: #fff;
        border: 2px solid #fff;
        border-radius: 6px;

        overflow-x: scroll;
        white-space: nowrap;
        cursor: pointer;
    }
    .op-mode::-webkit-scrollbar {
        display: none;
    }

    .input-subfield {
        margin-top: 6px;
        z-index: 1;
        width: 100px;
    }
    .subtitle {
        font-size: 13px;
        color: #87888c;
        margin-top: 5px;
        margin-bottom: 3px;
        white-space: nowrap;
    }
    .input-box {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }
    .dropdown {
        cursor: pointer;
        position: relative;
        top: -5px;
        width: 64px;
        padding: 5px 5px;
        font-size: 20px;
        background-color: #fff;
        border-radius: 0px 0px 5px 5px;
        z-index: 2;
        color: #323232;
    }
    .selection {
        text-align: center;
        font-size: 15px;
        font-weight: 500;

        color: #323232;
        background-color: #fff;
        border: 2px solid #fff;
        border-radius: 6px;

        overflow-x: scroll;
        white-space: nowrap;
        cursor: pointer;
    }
    .selection::-webkit-scrollbar,
    .op-mode::-webkit-scrollbar {
        display: none;
    }
</style>
