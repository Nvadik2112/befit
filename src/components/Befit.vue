<template>
  <div v-if="posts.length" class="Befit">
    <div class="Befit__main">
      <BefitItem v-for="post in postsPerFive" :key="post.id" :post="post" />
    </div>
    <div class="Befit__pagination">
      //
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BefitItem from "./BefitItem.vue";
  import { computed, ref } from "vue";

  const posts = ref([]);
  const postsPerFive = computed(() => {
    return [...posts.value].slice(0, 5)
  })

  fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
    .then((res) => posts.value = res);

</script>

<style scoped lang="scss">
  .Befit {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    &__main {
      display: flex;
      flex-direction: column;
      padding: 10px;
      gap: 10px;
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }
  }
</style>