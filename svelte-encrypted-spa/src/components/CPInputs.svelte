<script lang="ts">
    import onOffSvg from '../assets/on-off.svg'
</script>

<div class="part-name">Start new test</div>
<div class="input-group">
    <div class="input-subfield">
        <div class="subtitle">Min air gap</div>
        <div class="input-box"><input type="number" />mm</div>
    </div>
    <div class="input-subfield">
        <div class="subtitle">Max air gap</div>
        <div class="input-box"><input type="number" />mm</div>
    </div>
    <div class="input-subfield">
        <div class="subtitle">Air gap step</div>
        <div class="input-box"><input type="number" />mm</div>
    </div>
</div>
<div class="input-group">
    <div class="input-subfield">
        <div class="subtitle">Min current</div>
        <div class="input-box"><input type="number" />A</div>
    </div>
    <div class="input-subfield">
        <div class="subtitle">Max current</div>
        <div class="input-box"><input type="number" />A</div>
    </div>
    <div class="input-subfield">
        <div class="subtitle">Current step</div>
        <div class="input-box"><input type="number" />A</div>
    </div>
</div>
<div class="input-group">
    <div class="input-subfield">
        <div class="subtitle">Wait before measurement</div>
        <div class="input-box"><input type="number" />ms</div>
    </div>

    <div class="input-subfield">
        <div class="subtitle">Op. mode</div>
        <div class="input-box"><div class="op-mode">A1</div></div>
    </div>
</div>
<div class="input-group">
    <div class="input-subfield">
        <div class="subtitle">CSV File name</div>
        <div class="input-box wide"><input class="wide" type="text" />.csv</div>
    </div>
</div>
<button><img src={onOffSvg} alt="" /> START</button>

<style>
     .part-name {
        margin-top: 60px;
        font-size: 23px;
    }
    .op-mode {
        display: flex;
        align-items: center;
        justify-content: center;
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
</style>
