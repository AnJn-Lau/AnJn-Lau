<template>
  <div id="app">
    <headerCom></headerCom>
    <router-view/>
  </div>
</template>
<script>
import headerCom from '@/components/header'
export default {
  components: {
    headerCom
  }
}
</script>
<style lang="scss">
</style>
