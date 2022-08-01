<script lang="ts">
    import pause from '../assets/pause.svg'
</script>

<h1>Monitor test</h1>
<div class="upper">
    <p>Progress</p>
    <p>40%</p>
</div>
<div class="trace"><div class="loader" /></div>
<div class="lower">
    <p>Completed 365/700</p>
    <p>ETA: 2h</p>
</div>

<div class="test-pause"><img src={pause} alt="" />PAUSE</div>

<div class="input-group">
    <div class="input-subfield">
        <div class="subtitle">Min air gap</div>
        <div class="input-box">
            <div class="op-mode">0.21</div>
            mm
        </div>
    </div>
    <div class="input-subfield">
        <div class="subtitle">Max air gap</div>
        <div class="input-box">
            <div class="op-mode">21</div>
            mm
        </div>
    </div>
    <div class="input-subfield">
        <div class="subtitle">Air gap step</div>
        <div class="input-box">
            <div class="op-mode">32</div>
            mm
        </div>
    </div>
</div>
<div class="input-group">
    <div class="input-subfield">
        <div class="subtitle">Min current</div>
        <div class="input-box">
            <div class="op-mode">32.32</div>
            A
        </div>
    </div>
    <div class="input-subfield">
        <div class="subtitle">Max current</div>
        <div class="input-box">
            <div class="op-mode">12.32</div>
            A
        </div>
    </div>
    <div class="input-subfield">
        <div class="subtitle">Current step</div>
        <div class="input-box">
            <div class="op-mode">13.32</div>
            A
        </div>
    </div>
</div>
<div class="input-group">
    <div class="input-subfield">
        <div class="subtitle">Wait before measurement</div>
        <div class="input-box">
            <div class="op-mode">432</div>
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
            <div class="op-mode wide">test_2022_sept22</div>
            .csv
        </div>
    </div>
</div>

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
        width: 30%;
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
        justify-content: right;
        align-items: center;
        position: relative;
        margin-top: 10px;
        margin-bottom: 20px;

        cursor: pointer;
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
