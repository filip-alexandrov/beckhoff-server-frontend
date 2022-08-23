<script lang="ts">
    import CpInputs from './CPInputs.svelte'
    import CpMotor from './CPMotor.svelte'
    import CpOutputs from './CPOutputs.svelte'
</script>

<div class="holder">
    <CpMotor gaugeId="motor-position" />

    <CpInputs />

    <CpOutputs />

    <div class="distancer" />
</div>

<style>
    .holder {
        position: absolute;
        left: 1530px;
        height: calc(100% - 65px);
        width: 350px;
        background-color: #323232;
        padding: 20px;
        overflow: auto;
        z-index: 2;
    }

    .holder::-webkit-scrollbar {
        width: 10px;
    }
    .holder::-webkit-scrollbar-track {
        background: #323232;
    }

    /* Handle */
    .holder::-webkit-scrollbar-thumb {
        background: #555555;
    }

    /* Handle on hover */
    .holder::-webkit-scrollbar-thumb:hover {
        background: #f1f1f1;
    }

    .distancer {
        margin-bottom: 50px;
    }
    @media screen and (min-width: 1800px) {
        .holder {
            left: auto; 
            right: 0px; 
        }
    }
        
    
</style>
