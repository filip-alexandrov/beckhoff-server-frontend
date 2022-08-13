<script lang="ts">
    import {
        closeModal,
        closeAllModals,
        openModal,
        modals,
    } from 'svelte-modals'
    import { fly } from 'svelte/transition'

    import { writeValues } from '../store/requests'

    export let newTestObj
    export let isOpen

    let errorMessage = ''

    let step0 = false
    let step1 = false
    let step2 = false
    let step3 = false

    async function handleConfirmationClick(stepNumber) {
        switch (stepNumber) {
            case 0:
                // should write future test parameters before init
                await writeValues(newTestObj)

                await writeValues({
                    'GVL_InputHMI.bInitialize': true,
                })
                step0 = true
                break
            case 1:
                await writeValues({
                    'GVL_InputHMI.bDistanceSensorNulling': true,
                })
                step1 = true
                break
            case 2:
                await writeValues({
                    'GVL_InputHMI.bDistanceSensorNullingPlateRemoved': true,
                })
                step2 = true
                break

            default:
                break
        }
    }

    async function handleStartButton() {
        if (step0 && step1 && step2) {
            // Only starts the test, since params are written in init
            let tcRes = await writeValues({
                'GVL_InputHMI.bStartButton': true,
            })

            if (tcRes.success == true) {
                step3 = true
            } else {
                errorMessage = JSON.stringify(tcRes.errorMessage)
            }
        } else {
            errorMessage = 'Please complete all steps'
        }
    }
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal"
        transition:fly={{ y: 50 }}
        on:introstart
        on:outroend
    >
        <div class="contents">
            <h2>Nullify distance sensors</h2>
            <p>Click to confirm each action</p>
            <div class="actions">
                <div class="action">
                    <p>Initialize system and test parameters</p>
                    <button
                        class:pressed={step0}
                        on:click={() => handleConfirmationClick(0)}
                        >Initialize</button
                    >
                </div>
                <div class="action">
                    <p>The nullifying plate is placed on the sensor</p>
                    <button
                        class:pressed={step1}
                        on:click={() => handleConfirmationClick(1)}
                        >Confirm</button
                    >
                </div>
                <div class="action">
                    <p>The nullifying plate is removed</p>
                    <button
                        class:pressed={step2}
                        on:click={() => handleConfirmationClick(2)}
                        >Confirm</button
                    >
                </div>
                <div class="action">
                    <p>Press to start the test</p>
                    <button
                        class:pressed={step3}
                        on:click={() => handleStartButton()}>START</button
                    >
                </div>
            </div>
            <p>{errorMessage}</p>
            <button class="close" on:click={closeModal}
                >Close configuration</button
            >
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        /* allow click-through to backdrop */
        pointer-events: none;
        z-index: 1;
    }

    .contents {
        min-width: 240px;
        border-radius: 6px;
        padding: 16px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: left;
        pointer-events: auto;
        color: #323232;
    }
    .actions {
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
    }
    .action {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .action button {
        width: 90px;
        background-color: #323232;
        color: #fff;
        cursor: pointer;
        height: 30px;
        border-radius: 3px;
        margin-bottom: 4px;
        margin-left: 20px;
    }
    .action .pressed {
        background-color: #3d7d00;
    }
    .close {
        background-color: #323232;
        color: #fff;
        cursor: pointer;
        height: 30px;
        border-radius: 3px;
        width: 100%;
    }

    h2 {
        font-size: 24px;
    }
</style>
