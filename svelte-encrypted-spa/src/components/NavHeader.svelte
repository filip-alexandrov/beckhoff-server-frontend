<script lang="ts">
import { goto } from 'svelte-pathfinder';

    import logo from '../assets/logo.svg'

    function handleDoubleClick(){
        goto("/mariana");
    }

    function handleClick(){
        goto("/");
    }
</script>

<div on:click={handleClick} on:dblclick={handleDoubleClick} class="header">
    <img src={logo} alt="" />
    <div>Levitation</div>
</div>

<style>
    .header {
        background-color: #424242;
        height: 100%;
        width: 100%;

        font-size: 21px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;

        cursor: pointer;
        user-select: none;
    }
    .header img {
        height: 30px;
    }
</style>
