<script lang="ts">
    import logo from '../assets/logo.svg'
</script>

<div class="header">
    <img src={logo} alt="" />
    <h1>Levitation</h1>
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
    }
    .header img {
        height: 30px;
    }
</style>
