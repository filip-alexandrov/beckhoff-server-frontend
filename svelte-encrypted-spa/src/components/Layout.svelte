<script lang="ts">
    import TopNav from './NavTop.svelte'
    import NavHeader from '../components/NavHeader.svelte'
    import NavTemp from '../components/NavTemp.svelte'
    import NavWeight from '../components/NavWeight.svelte'
    import NavDistance from '../components/NavDistance.svelte'
    import NavOrientation from '../components/NavOrientation.svelte'
</script>

<div class="full-screen">
    <div class="grid-container">
        <div class="main">
            <slot />
        </div>
        <div>
            <NavHeader />
        </div>
        <div>
            <TopNav />
        </div>

        <div class="right-nav">
            <NavTemp />
            <NavWeight />
            <NavDistance />
            <NavOrientation />
        </div>
    </div>
</div>

<style>

    .grid-container {
        height: 100vh;
        width: 1920px;

        display: grid;
        grid-template-columns: 221px auto;
        grid-template-rows: 40px auto;
        box-sizing: border-box;

        background-color: #212121;
        color: white;
    }
    .main {
        grid-area: 2 / 2 / span 1 / span 1;
    }
    .right-nav {
        background-color: #323232;
    }
</style>
