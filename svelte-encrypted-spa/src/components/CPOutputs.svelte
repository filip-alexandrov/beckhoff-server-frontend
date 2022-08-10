<script lang="ts">
    import pause from '../assets/pause.svg'
    import { allPlcVariables } from '../store/apiReadingCom'
    import onOff from '../assets/on-off.svg'
    import chartResume from '../assets/chartResume.svg'
    import { writeValues } from '../store/requests'

    let measurementsFinished = 0
    let overallMeasurements = 0

    $: measurementsFinished = $allPlcVariables[
        'GVL_OutputHMI.uiMeasurementsFinished'
    ]
        ? $allPlcVariables['GVL_OutputHMI.uiMeasurementsFinished']
        : 0
    $: overallMeasurements = $allPlcVariables[
        'GVL_OutputHMI.uiOverallMeasurements'
    ]
        ? $allPlcVariables['GVL_OutputHMI.uiOverallMeasurements']
        : 0

    function handlePauseClick() {
        writeValues({
            'GVL_InputHMI.bPause': true,
        })
    }
    function handleResumeClick() {
        writeValues({
            'GVL_InputHMI.bPause': false,
        })
    }
    function handleStopClick() {
        writeValues({
            'GVL_InputHMI.bStartButton': false,
        })
    }
</script>

{#if overallMeasurements > 0}
    <h1>Monitor test</h1>
    <div class="upper">
        <p>Progress</p>
        <p>
            {((measurementsFinished / overallMeasurements) * 100).toFixed(2)}%
        </p>
    </div>

    <div class="trace">
        <div
            class="loader"
            style="width: {(measurementsFinished / overallMeasurements) *
                100}%;"
        />
    </div>
    <div class="lower">
        <p>Completed {measurementsFinished}/{overallMeasurements}</p>
        <p>ETA: -/- h</p>
    </div>

    <div class="test-pause">
        {#if $allPlcVariables['GVL_InputHMI.bPause']}
            <div on:click={handleResumeClick}>
                <img src={chartResume} alt="" />RESUME
            </div>
        {:else}
            <div on:click={handlePauseClick}>
                <img src={pause} alt="" />PAUSE
            </div>
        {/if}
        <div on:click={handleStopClick}><img src={onOff} alt="" />STOP</div>
    </div>

    <div class="input-group">
        <div class="input-subfield">
            <div class="subtitle">Min air gap</div>
            <div class="input-box">
                <div class="op-mode">
                    {$allPlcVariables['GVL_InputHMI.rMinAirgap']}
                </div>
                mm
            </div>
        </div>
        <div class="input-subfield">
            <div class="subtitle">Max air gap</div>
            <div class="input-box">
                <div class="op-mode">
                    {$allPlcVariables['GVL_InputHMI.rMaxAirgap']}
                </div>
                mm
            </div>
        </div>
        <div class="input-subfield">
            <div class="subtitle">Air gap step</div>
            <div class="input-box">
                <div class="op-mode">
                    {$allPlcVariables['GVL_InputHMI.rAirgapStep']}
                </div>
                mm
            </div>
        </div>
    </div>
    <div class="input-group">
        <div class="input-subfield">
            <div class="subtitle">Min current</div>
            <div class="input-box">
                <div class="op-mode">
                    {$allPlcVariables['GVL_InputHMI.rMinCurrent']}
                </div>
                A
            </div>
        </div>
        <div class="input-subfield">
            <div class="subtitle">Max current</div>
            <div class="input-box">
                <div class="op-mode">
                    {$allPlcVariables['GVL_InputHMI.rMaxCurrent']}
                </div>
                A
            </div>
        </div>
        <div class="input-subfield">
            <div class="subtitle">Current step</div>
            <div class="input-box">
                <div class="op-mode">
                    {$allPlcVariables['GVL_InputHMI.rCurrentStep']}
                </div>
                A
            </div>
        </div>
    </div>
    <div class="input-group">
        <div class="input-subfield">
            <div class="subtitle">Wait before measurement</div>
            <div class="input-box">
                <div class="op-mode">
                    {$allPlcVariables['GVL_InputHMI.tWaitBeforeMeasurement']}
                </div>
                ms
            </div>
        </div>

        <div class="input-subfield">
            <div class="subtitle">Op. mode</div>
            <div class="input-box"><div class="op-mode">A1</div></div>
        </div>
    </div>
    <div class="input-group">
        <div class="input-subfield">
            <div class="subtitle">CSV File name</div>
            <div class="input-box wide">
                <div class="op-mode wide">
                    {$allPlcVariables['GVL_InputHMI.sCSVName']}
                </div>
                .csv
            </div>
        </div>
    </div>
{/if}

<style>
    h1 {
        margin-top: 60px;
        margin-bottom: 10px;
        font-size: 23px;
    }

    .trace {
        position: relative;
        width: 100%;
        height: 35px;
        border-radius: 6px;
        background-color: #2b2b36;
    }
    .loader {
        position: absolute;
        top: 0;
        height: 35px;
        border-radius: 6px;
        background-color: #dfe300;
    }

    .upper,
    .lower {
        display: flex;
        flex-direction: row;
        font-size: 15px;
        justify-content: space-between;
    }
    .test-pause {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        margin-top: 10px;
        margin-bottom: 20px;

        cursor: pointer;
    }
    .test-pause div {
        display: flex;
        align-items: center;
    }

    .test-pause img {
        margin-right: 6px;
    }

    .op-mode {
        display: flex;
        align-items: center;
        /* justify-content: center; */
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
</style>
