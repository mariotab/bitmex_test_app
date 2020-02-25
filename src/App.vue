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
  .table-wrapper {
    min-width: 100%;
    min-height: 100vh;
  }
  @import'~bootstrap/dist/css/bootstrap.css'
</style>
