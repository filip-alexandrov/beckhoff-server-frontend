<script>
    import {
        fullSensorData,
        sensorUnits,
        temperatureSensors,
    } from '../store/sensors'
</script>

<div class="left-nav">
    <div class="category">
        <div class="header">TEMPERATURE</div>
        {#each temperatureSensors as temperatureSensor}
            <button>
                <div class="description">
                    {temperatureSensor}
                </div>
                <div class="value">
                    {$fullSensorData[temperatureSensor]}
                    {$sensorUnits[temperatureSensor]}
                </div>
            </button>
        {/each}
    </div>
</div>

<style>
    .left-nav {
        background-color: #323232;
    }

    .category {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 22px;
    }
    .header {
        margin-left: 5px;
        font-size: 12px;
        font-weight: 400;
    }
    button {
        background-color: #323232;
        border: none;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 5%;
        height: 32px;
        cursor: pointer;
    }
    button:hover {
        background-color: var(--hover-color);
    }
</style>
