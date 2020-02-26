<template>
  <div id="app">
     <Layout/>
  </div>
</template>

<script>
import Layout from './Layout/Layout'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style lang="scss">
  #app {
    background-color: #e0e0e0a8
  }
  .table-wrapper {
    min-width: 100%;
    height: fit-content;
  }
  .trader-table {
    margin-top: 12px;
    overflow: hidden;
    border-radius: 10px;
  }
  @import'~bootstrap/dist/css/bootstrap.css'
</style>
