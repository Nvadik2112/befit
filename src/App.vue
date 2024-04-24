<template>
  <Suspense>
    <div id="main">
      <Befit />
    </div>
  </Suspense>
</template>

<script setup lang="ts">
  import Befit from "./components/Befit.vue";
</script>

<style scoped lang="scss">
  #main {
    width: 100%;
    height: 100%;

    * {
      box-sizing: border-box;
    }
  }
</style>
