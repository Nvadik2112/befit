<template>
  <div v-if="postList.length" class="Befit">
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
    <div class="Befit__additional">
      <h4 class="Befit__additional_title">Понравилось</h4>
      <Transition>
        <div v-if="Object.keys(likedPosts).length" class="Befit__list">
          <TransitionGroup>
            <BefitItem v-for="post of likedPosts" :key="post.id" from-like-block :post="post" />
          </TransitionGroup>
        </div>
      </Transition>
    </div>
    <div class="Befit__additional">
      <h4 class="Befit__additional_title">Не понравилось</h4>
      <Transition>
        <div v-if="Object.keys(dislikedPosts).length" class="Befit__list">
          <TransitionGroup>
            <BefitItem v-for="post of dislikedPosts" :key="post.id" from-dislike-block :post="post" />
          </TransitionGroup>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BefitItem from "./BefitItem.vue";
  import { computed, ref, watch } from "vue";
  import { useBefitStore } from "@/store/useStore";
  import { storeToRefs } from "pinia";
  import type { BefitDto } from "@/types";

  const befitStore = useBefitStore();
  const { postList, likedPosts, dislikedPosts } = storeToRefs(befitStore);
  await befitStore.getPosts();

  const paginationPos = ref(0);
  const paginationLength = computed(() => {
    return Math.ceil(postList.value.length / 5);
  })

  const postsPerFive = computed<BefitDto[]>(() => {
    const startPos = paginationPos.value * 5;
    const endPos = startPos + 5;

    return postList.value.slice(startPos, endPos);
  })

  watch(postsPerFive, () => {
    if (!postsPerFive.value.length) {
      paginationPos.value = paginationPos.value - 1;
    }
  });

  function setPagination(index: number) {
    paginationPos.value = index
  }

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

    &__additional {
      overflow: auto;
      padding: 0 10px 10px 10px;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 2px rgba(0,0,0,0.3);
      }

      &::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 2px rgba(0,0,0,0.5);
      }
    }

    &__additional_title {
      margin: 0 0 10px 0;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: white;
    }
  }
</style>
<style lang="scss">
  .Befit {
    .v-enter-active,
    .v-leave-active {
      transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
  }
</style>