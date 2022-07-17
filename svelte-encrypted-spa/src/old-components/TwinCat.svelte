<script context="module" lang="ts">
    interface CreateClientFunction {
        /**
         * This is the description of the interface
         *
         * @interface CreateClientFunction
         * @member {string} label is used for whatever reason
         * @field {string} prop is used for other reason
         * @field {string} serviceUrl is the twincat ip address (ie. 169.240.74.12)
         */
        (obj: {
            serviceUrl: String
            amsNetId: String
            useHandles: Boolean
            onReady: Function
            amsPort?: String
            alignment?: String
            configFileUrl?: String
            language?: String
        }): void
    }

    declare const TAME: {
        // Some doc
        WebServiceClient: { createClient: CreateClientFunction }
    }

    declare var countUp: boolean
    declare var counter: number

    declare function writeBoolValue(name: string, value: boolean): void
</script>

<script lang="ts">
    let sCountUp: boolean = false
    let sCounter: number = 0

    setInterval(() => {
        sCountUp = countUp
        sCounter = counter

        console.log('counter from svelte: ', counter)
    }, 100)

    function startStopCounter() {
        writeBoolValue('MAIN.countUp', !sCountUp)
    }

    $: console.log('countUp form svelte: ', sCountUp)
    $: console.log('counter from svelte: ', sCounter)
</script>

<h1>Counter activated: {sCountUp}</h1>
<h1>Counter value: {sCounter}</h1>

<button on:click={startStopCounter}>Start / Stop</button>

<input type="text" placeholder="Enter number to start counting from..." />

<style>
    h1 {
        color: #f8f8f8;
    }
</style>
