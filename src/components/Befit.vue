<template>
  <div v-if="posts.length" class="Befit">
    <div class="Befit__main">
      <div class="Befit__list">
        <BefitItem v-for="post in postsPerFive" :key="post.id" :post="post" />
      </div>
      <div class="Befit__pagination">
        <button v-for="(item, index) in paginationLength"
                :key="index"
                type="button"
                class="Befit__pagination_item"
                :class="{ 'Befit__pagination_item--active': paginationPos === index }"
                @click="setPagination(index)">
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BefitItem from "./BefitItem.vue";
  import { computed, ref } from "vue";

  const posts = ref([]);

  const paginationPos = ref(0);
  const paginationLength = computed(() => {
    return Math.ceil(posts.value.length / 5);
  })

  const postsPerFive = computed(() => {
    const startPos = paginationPos.value * 5;
    const endPos = startPos + 5;

    return [...posts.value].slice(startPos, endPos)
  })

  function setPagination(index) {
    paginationPos.value = index
  }

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
      justify-content: space-between;
      padding: 10px;
      gap: 10px;
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__pagination {
      display: flex;
      justify-content: center;
      gap: 10px;
    }

    &__pagination_item {
      padding: 0;
      border: none;
      background-color: transparent;
      cursor: pointer;
      transition: 0.2s ease-in-out color;

      &:hover {
        color: rgba(155, 44, 44, 0.98);
      }

      &--active {
        color: red !important;
      }
    }
  }
</style>