<template>
  <div id="app">
    <time-pickers :showCheckDate="true"></time-pickers>
  </div>
</template>

<script>
  import timePickers from "./components/timePickers";
  export default {
    name: 'App',
    components: {
      timePickers
    },
    data() {
      return {}
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/

  }

</style>
