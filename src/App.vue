<template>
  <div id="app">
    <header class="header">剪切板</header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body, ul, li {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0 20px;
}
.header {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  margin-top: 30px;
  padding: 0 25px;
}
</style>
