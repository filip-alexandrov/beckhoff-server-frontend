<script lang="ts">
    import onOffSvg from '../assets/on-off.svg'

    import { Modals, closeModal, openModal, modals } from 'svelte-modals'
    import { fade, fly } from 'svelte/transition'
    import { circInOut, linear } from 'svelte/easing'
    import Modal from './Modal.svelte'
    import { allPlcVariables } from '../store/apiReadingCom'

    let newTestObj = {
        'GVL_InputHMI.e_OperationMode': 'A1',
        'GVL_InputHMI.bEmergencyStop': false,

        'GVL_InputHMI.rMinAirgap': null,
        'GVL_InputHMI.rMaxAirgap': null,
        'GVL_InputHMI.rAirgapStep': null,
        'GVL_InputHMI.rMinCurrent': null,
        'GVL_InputHMI.rMaxCurrent': null,
        'GVL_InputHMI.rCurrentStep': null,
        'GVL_InputHMI.tWaitBeforeMeasurement': null,
        'GVL_InputHMI.sCSVName': null,
    }

    let configurationMessage = 'CONFIGURATOR'
    function handleConfigureTest() {
        if (
            newTestObj['GVL_InputHMI.rMinAirgap'] != null &&
            newTestObj['GVL_InputHMI.rMaxAirgap'] != null &&
            newTestObj['GVL_InputHMI.rAirgapStep'] != null &&
            newTestObj['GVL_InputHMI.rMinCurrent'] != null &&
            newTestObj['GVL_InputHMI.rMaxCurrent'] != null &&
            newTestObj['GVL_InputHMI.rCurrentStep'] != null &&
            newTestObj['GVL_InputHMI.tWaitBeforeMeasurement'] != null &&
            newTestObj['GVL_InputHMI.sCSVName'] != null
        ) {
            openModal(Modal, { newTestObj: newTestObj })
        } else {
            configurationMessage = 'Please fill all fields'

            console.log(configurationMessage)

            setTimeout(() => {
                configurationMessage = 'CONFIGURE'
            }, 2000)
        }
    }

    function generateDateString() {
        // generate date in format dd.mm.yy
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let dateString = `${day}.${month}.${year}`
        return dateString
    }

    function objectsArePopulated() {
        if (
            newTestObj['GVL_InputHMI.rMinAirgap'] != null &&
            newTestObj['GVL_InputHMI.rMaxAirgap'] != null &&
            newTestObj['GVL_InputHMI.rAirgapStep'] != null &&
            newTestObj['GVL_InputHMI.rMinCurrent'] != null &&
            newTestObj['GVL_InputHMI.rMaxCurrent'] != null &&
            newTestObj['GVL_InputHMI.rCurrentStep'] != null &&
            newTestObj['GVL_InputHMI.tWaitBeforeMeasurement'] != null &&
            namingConvention.opMode != null &&
            namingConvention.versionNumber != null &&
            namingConvention.coilName != null
        ) {
            return true
        } else {
            return false
        }
    }

    let namingConvention = {
        opMode: 'A1',
        versionNumber: null,
        coilName: null,
        date: generateDateString(),
    }

    $: newTestObj['GVL_InputHMI.sCSVName'] = objectsArePopulated()
        ? `${namingConvention.opMode}\
_V${namingConvention.versionNumber}\
_C${namingConvention.coilName}\
_${namingConvention.date}\
_${newTestObj['GVL_InputHMI.rMinCurrent']}\
_${newTestObj['GVL_InputHMI.rCurrentStep']}\
_${newTestObj['GVL_InputHMI.rMaxCurrent']}\
_${newTestObj['GVL_InputHMI.rMinAirgap']}\
_${newTestObj['GVL_InputHMI.rAirgapStep']}\
_${newTestObj['GVL_InputHMI.rMaxAirgap']}`
        : ''
</script>

{#if $allPlcVariables['GVL_OutputHMI.uiOverallMeasurements'] == 0}
    <div class="part-name">Start new test</div>

    <div class="input-group">
        <div class="input-subfield">
            <div class="subtitle">Min current</div>
            <div class="input-box">
                <input
                    type="number"
                    bind:value={newTestObj['GVL_InputHMI.rMinCurrent']}
                />A
            </div>
        </div>
        <div class="input-subfield">
            <div class="subtitle">Current step</div>
            <div class="input-box">
                <input
                    type="number"
                    bind:value={newTestObj['GVL_InputHMI.rCurrentStep']}
                />A
            </div>
        </div>
        <div class="input-subfield">
            <div class="subtitle">Max current</div>
            <div class="input-box">
                <input
                    type="number"
                    bind:value={newTestObj['GVL_InputHMI.rMaxCurrent']}
                />A
            </div>
        </div>
    </div>

    <div class="input-group">
        <div class="input-subfield">
            <div class="subtitle">Min air gap</div>
            <div class="input-box">
                <input
                    type="number"
                    bind:value={newTestObj['GVL_InputHMI.rMinAirgap']}
                />mm
            </div>
        </div>
        <div class="input-subfield">
            <div class="subtitle">Air gap step</div>
            <div class="input-box">
                <input
                    type="number"
                    bind:value={newTestObj['GVL_InputHMI.rAirgapStep']}
                />mm
            </div>
        </div>
        <div class="input-subfield">
            <div class="subtitle">Max air gap</div>
            <div class="input-box">
                <input
                    type="number"
                    bind:value={newTestObj['GVL_InputHMI.rMaxAirgap']}
                />mm
            </div>
        </div>
    </div>

    <div class="input-group">
        <div class="input-subfield">
            <div class="subtitle">Wait before measurement</div>
            <div class="input-box">
                <input
                    type="number"
                    bind:value={newTestObj[
                        'GVL_InputHMI.tWaitBeforeMeasurement'
                    ]}
                />ms
            </div>
        </div>
    </div>

    <div class="input-group">
        <div class="input-subfield">
            <div class="subtitle">Op. mode</div>
            <div class="input-box"><div class="op-mode center">A1</div></div>
        </div>
        <div class="input-subfield">
            <div class="subtitle">Version number</div>
            <div class="input-box">
                <input
                    type="number"
                    bind:value={namingConvention.versionNumber}
                />
            </div>
        </div>
        <div class="input-subfield">
            <div class="subtitle">Coil number</div>
            <div class="input-box">
                <input type="number" bind:value={namingConvention.coilName} />
            </div>
        </div>
    </div>

    <div class="input-group">
        <div class="input-subfield">
            <div class="subtitle">CSV File name</div>
            <div class="input-box wide">
                <div class="op-mode wide">
                    {newTestObj['GVL_InputHMI.sCSVName']}
                </div>
                .csv
            </div>
        </div>
    </div>

    <button on:click={handleConfigureTest}
        ><img src={onOffSvg} alt="" /> {configurationMessage}</button
    >
{/if}

<!-- "Before test" configuration window -->
<Modals>
    <div
        slot="backdrop"
        class="backdrop"
        transition:fade
        on:click={closeModal}
    />
</Modals>

<style>
    .part-name {
        margin-top: 60px;
        font-size: 23px;
    }
    .op-mode {
        display: flex;
        align-items: center;
        font-size: 22px;
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
        scrollbar-width: none;
        white-space: nowrap;
    }
    .op-mode::-webkit-scrollbar {
        display: none;
    }
    .center {
        justify-content: center;
    }
    .input-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
    .wide {
        width: 340px;
    }

    input {
        background-color: #323232;
        width: 60px;
        height: 30px;
        border: 2px solid #fff;
        border-radius: 6px;
        padding: 0px 5px;
        margin-right: 2px;
    }
    input:focus {
        border: 2px solid #fff !important;
    }

    button {
        background-color: transparent;
        float: right;
        margin-top: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    button img {
        margin-right: 5px;
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
