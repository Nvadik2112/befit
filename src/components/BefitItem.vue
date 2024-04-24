<template>
  <div class="BefitItem" style="position: relative">
    <span class="BefitItem__id">{{ post.id }}</span>
    <h5 class="BefitItem__title">{{ post.title }}</h5>
    <div class="BefitItem__icons">
      <button type="button" class="BefitItem__button BefitItem__button--like" />
      <button type="button" class="BefitItem__button BefitItem__button--dislike" />
    </div>
    <p class="BefitItem__content">{{ post.body }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from "vue";

  const props = defineProps<{
    post: any
  }>()
</script>

<style lang="scss" scoped>
  .BefitItem {
    display: grid;
    grid-template-columns: 15px 1fr 50px;
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
      // padding-top: 5px;
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
      font-size: 14px;
      line-height: 21px;
      grid-column: 1 / 4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__button {
      border: none;
      width: 20px;
      height: 20px;
      mask-repeat: no-repeat;
      cursor: pointer;

      &--like {
        mask-image: url("../assets/like-button-icon.svg");
      }

      &--active:is(&--like) {
        background-color: green;
      }

      &--dislike {
        mask-image: url("../assets/dislike-button-icon.svg");
      }
    }
  }
</style>