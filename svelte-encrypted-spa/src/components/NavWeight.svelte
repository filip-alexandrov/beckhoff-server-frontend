<script>
    let values = [14, 43, 32, 53]
    let weightHigh = 23
</script>

<div class="left-nav">
    <div class="category">
        <div class="header">WEIGHT</div>
        {#each values as value, index}
            <button>
                <div class="description">
                    Weight #{index + 1}
                </div>
                <div class="value">{value}N</div>
            </button>
        {/each}

        <button>
            <div class="description">
                Weight #5
            </div>
            <div class="value">{weightHigh}kN</div>
        </button>
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
