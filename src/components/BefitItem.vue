<template>
  <div class="BefitItem">
    <span class="BefitItem__id">{{ post.id }}</span>
    <h5 class="BefitItem__title">{{ post.title }}</h5>
    <div class="BefitItem__icons">
      <button v-if="!fromDislikeBlock" type="button"
              class="BefitItem__button BefitItem__button--like"
              :class="[{ 'BefitItem__button--active': fromLikeBlock }]"
              @click="befitStore.toggleLikePost(post.id)"
      />
      <button v-if="!fromLikeBlock" type="button"
              class="BefitItem__button BefitItem__button--dislike"
              :class="[{ 'BefitItem__button--active': fromDislikeBlock }]"
              @click="befitStore.toggleDislikePost(post.id)"
      />
    </div>
    <p class="BefitItem__content">{{ post.body }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, withDefaults } from "vue";
  import { useBefitStore } from "@/store/useStore";
  import type { BefitDto } from "@/types";

  withDefaults(defineProps<{
    post: BefitDto,
    fromLikeBlock?: boolean,
    fromDislikeBlock?: boolean,
  }>(), {
    fromLikeBlock: false,
    fromDislikeBlock: false,
  });

  const befitStore = useBefitStore();
  
</script>

<style lang="scss" scoped>
  .BefitItem {
    display: grid;
    grid-template-columns: 20px 1fr fit-content(100%);
    gap: 10px;
    height: fit-content;
    width: 100%;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 4px;

    * {
      padding: 0;
      margin: 0;
    }

    &__id {
      font-size: 14px;
      line-height: 18px;
    }

    &__title {
      margin: 0;
      text-align: left;
      font-size: 18px;
      line-height: 24px;
    }

    &__icons {
      display: flex;
      gap: 5px;
      width: inherit;
      height: 20px;
    }

    &__content {
      text-align: left;
      grid-column: 1 / 4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      line-height: 21px;
    }

    &__button {
      border: none;
      width: 20px;
      height: 20px;
      mask-repeat: no-repeat;
      cursor: pointer;
      transition: 0.3s ease-in-out background-color;

      &--like {
        mask-image: url("../assets/like-button-icon.svg");
      }

      &--active {
        transition: none;
      }

      &--like:hover,
      &--active:is(&--like) {
        background-color: green;
      }

      &--dislike {
        mask-image: url("../assets/dislike-button-icon.svg");
      }

      &--dislike:hover,
      &--active:is(&--dislike) {
        background-color: red;
      }
    }
  }
</style>